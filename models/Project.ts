import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDeviceConfig {
  name: string;
  commands: string;
}

export interface IProject extends Document {
  title: string;
  description: string;
  category: string;
  tags: string[];
  command?: string;
  codeSnippet?: string;
  imageUrl?: string;
  content?: string;
  projectUrl?: string;
  demoUrl?: string;
  configurations?: IDeviceConfig[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema<IProject> = new mongoose.Schema(
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
    command: {
      type: String,
      default: "",
    },
    codeSnippet: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    projectUrl: {
      type: String,
      default: "",
    },
    demoUrl: {
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

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
