import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "user" | "root";
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ["user", "root"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from recreating the model if it already exists
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
