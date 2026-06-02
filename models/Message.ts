import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  content: string;
  read: boolean;
  createdAt: Date;
}

const MessageSchema: Schema<IMessage> = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
