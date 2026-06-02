import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  type: "project" | "video";
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema<ICategory> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["project", "video"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate categories of the same type
CategorySchema.index({ name: 1, type: 1 }, { unique: true });

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
