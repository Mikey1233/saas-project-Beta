import { db } from "@/firebase";
import { LanguagesSupported } from "@/store/store";
// import { Subscription } from "@/types/Subscription";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
   limit,
  query,
  orderBy
} from "firebase/firestore";

export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
}
export interface Message {
  id?: string;
  input: string;
  timestamp: Date;
  user: User;
  translated? : {
    [k in LanguagesSupported]? : string
  }
}

const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore: function (message: Message): DocumentData {
    return {
     input : message.input,
     timestamp : message.timestamp,
     user : message.user
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message {
    const data = snapshot.data(options);
    return {
     id : snapshot.id,
     input : data.input,
     timestamp : data.timestamp?.toDate(),
     translated: data.translated,
     user : data.user
    };
  },
};

export const messagesRef = (chatId:string) => 
  collection(db,"chats",chatId,"messages").withConverter(messageConverter)

export const limitedMessageRef = (chatId: string) => 
  query(messagesRef(chatId),limit(25))

export const sortedMessagesRef = (chatId : string) =>
  query(messagesRef(chatId),orderBy('timestamp','asc'))

export const limitedSortedMessagesRef = (chatId : string) =>
  query(query(messagesRef(chatId),limit(1)),orderBy("timestamp",'desc'))