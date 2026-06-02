import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDeviceConfig {
  name: string;
  commands: string;
}

export interface IVideo extends Document {
  title: string;
  description: string;
  category: string;
  tags: string[];
  videoUrl: string;
  command?: string;
  codeSnippet?: string;
  thumbnailUrl?: string;
  content?: string;
  configurations?: IDeviceConfig[];
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema: Schema<IVideo> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: "Uncategorized",
    },
    tags: {
      type: [String],
      default: [],
    },
    videoUrl: {
      type: String,
      required: true,
    },
    command: {
      type: String,
      default: "",
    },
    codeSnippet: {
      type: String,
      default: "",
    },
    thumbnailUrl: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    configurations: {
      type: [
        {
          name: { type: String, required: true },
          commands: { type: String, default: "" }
        }
      ],
      default: []
    }
  },
  {
    timestamps: true,
  }
);

const Video: Model<IVideo> = mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);

export default Video;
