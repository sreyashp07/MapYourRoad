import { Schema, model, models } from "mongoose";

const ProgressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    roadmap: { type: Schema.Types.ObjectId, ref: "Roadmap", required: true },
    completedNodes: [{ type: String }],
  },
  { timestamps: true }
);

// One progress doc per user per roadmap.
ProgressSchema.index({ user: 1, roadmap: 1 }, { unique: true });

export const Progress = models.Progress || model("Progress", ProgressSchema);
export default Progress;
