import { ObjectId } from "mongoose";

export type socketMap={
    [key:string]:string,
}

export interface MessagePopulated {
    _id: ObjectId;
    senderID: ObjectId;
    receiverID: ObjectId;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}
