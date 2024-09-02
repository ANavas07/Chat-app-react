export type User={
    _id:string,
    fullName:string,
    userName:string,
    password:string,
    gender:string,
    profilePic:string
}

export type UserSignUp=Omit<User, '_id'|'profilePic'> &{
    confirmPassword:string
};
export type UserLoginT=Pick<User, 'userName'|'password'>

export type UserLocalStorage=Pick<User, 'fullName'|'_id'|'profilePic'|'userName'>

export type UserConversation=Omit<User, 'password'|'username'>;

export type Message={
    _id:string,
    senderID:string,
    receiverID:string,
    message:string,
    createdAt:string
}

export type sendMessage=Pick<Message, 'senderID'|'receiverID'|'message'>;

export type ConversationsStateZustand={
    selectedConversation:UserConversation | null,
    setSelectedConversation:(selectedConversation:UserConversation | null)=>void,
    messages:Message[],
    setMessages:(messages:Message[])=>void,
}
