import { Request, Response } from 'express';
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { ErrorMessages } from '../error/errorMessages.error.js';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const { id: receiverID } = req.params; //req.params.id this way to take the id from the url
        //extends property from types, and (tsconfig.json settings)
        const senderID = req.user?._id;

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
            message,
        });

        if (newMessagge) {
            conversation.messages.push(newMessagge._id);
        }

        //Socket functionality will go here

        //this will run in parallel
        await Promise.all([conversation.save(), newMessagge.save()]);
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
        const messages = conversation?.messages;
        return res.status(200).json(messages); 

    } catch (error) {
        return res.status(500).json({
            error: ErrorMessages.INTERNAL_SERVER_ERROR
        });
    }
};