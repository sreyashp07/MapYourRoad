import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    roadmap: { type: Schema.Types.ObjectId, ref: "Roadmap", required: true },
    nodeId: { type: String, default: null },
    content: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Comment = models.Comment || model("Comment", CommentSchema);
export default Comment;
