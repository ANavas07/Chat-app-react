import { Request, Response } from 'express';
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { ErrorMessages } from '../error/errorMessages.error.js';
import SocketServer from '../socket/socket.socket.js';
import { aesEncrypt, createState, createStates, formatEncryptedMessage, generateRoundKeys } from '../services/encrypt.services.js';
import KeyManager from '../services/keyManager.services.js';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const { id: receiverID } = req.params; //req.params.id this way to take the id from the url
        //extends property from types, and (tsconfig.json settings)
        const senderID = req.user?._id;

        const aesKey = process.env.AES_KEY!;
        if (aesKey.length < 16 || !aesKey) {
            throw new Error(ErrorMessages.INVALID_AES_KEY);
        };

        // Encriptar el mensaje
        const roundKeys = KeyManager.getInstance().getKey(); // Obtener las claves de ronda
        const messageState = createStates(message); // Dividir en bloques
        const encryptedMessageBlocks = aesEncrypt(messageState, roundKeys); // Cifrar el mensaje
        const encryptedMessage = formatEncryptedMessage(encryptedMessageBlocks); // Formatear el mensaje cifrado

        let conversation = await Conversation.findOne({
            participants: { $all: [senderID, receiverID] },
        })

        if (!conversation) {
            conversation = await Conversation.create({
                //if conversation is new it creates an empty array because i set it in the model
                participants: [senderID, receiverID],
            });
        }

        const newMessagge = new Message({
            senderID,
            receiverID,
            message: encryptedMessage,
        });

        if (newMessagge) {
            conversation.messages.push(newMessagge._id);
        }
        //this will run in parallel 
        await Promise.all([conversation.save(), newMessagge.save()]);
        //Socket functionality will go here
        SocketServer.getInstance().sendMessageToUser(receiverID, newMessagge);
        res.status(201).json(newMessagge);

    } catch (error) {
        res.status(500).json({
            error: ErrorMessages.INTERNAL_SERVER_ERROR
        });
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        //return added to handle an error in frontend in each response********
        const { id: userToChatID } = req.params;
        const senderID = req.user?._id;
        //form to upload the messages from the conversation (populate)
        const conversation = await Conversation.findOne({
            participants: { $all: [senderID, userToChatID] },
        }).populate("messages"); //Not reference for actual messages

        if (!conversation) return res.status(200).json([]);

        //desencriptar cada mensaje
        
        const decryptMessages = conversation.messages.map((messageIterator)=>{
            // const encryptedMessage= messageIterator.message;
            console.log(messageIterator);
            //Dividir el mensaje en bloques de estado    
            const encryptedBlocks = [];
        });

        const messages = conversation?.messages;
        return res.status(200).json(messages);

    } catch (error) {
        return res.status(500).json({
            error: ErrorMessages.INTERNAL_SERVER_ERROR
        });
    }
};
