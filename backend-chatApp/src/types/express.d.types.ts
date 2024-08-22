import {Request} from 'express';

interface UserRequest{
    _id:Types.ObjectId;
}

declare module 'express-serve-static-core'{
    interface Request{
        user?:UserRequest;
    }
}