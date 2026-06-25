import { Schema, model, models } from "mongoose";

const NodeSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, default: "roadmapNode" },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    data: {
      label: { type: String, required: true },
      description: { type: String, default: "" },
      notes: { type: String, default: "" },
      status: {
        type: String,
        enum: ["todo", "in-progress", "done"],
        default: "todo",
      },
    },
  },
  { _id: false }
);

const EdgeSchema = new Schema(
  {
    id: { type: String, required: true },
    source: { type: String, required: true },
    target: { type: String, required: true },
    type: { type: String, default: "roadmapEdge" },
  },
  { _id: false }
);

const RoadmapSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    slug: { type: String, required: true, unique: true, index: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ownerName: { type: String, default: "" },
    category: { type: String, default: "General" },
    isPublic: { type: Boolean, default: false, index: true },
    upvotes: { type: Number, default: 0 },
    upvotedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    nodes: { type: [NodeSchema], default: [] },
    edges: { type: [EdgeSchema], default: [] },
  },
  { timestamps: true }
);

export const Roadmap = models.Roadmap || model("Roadmap", RoadmapSchema);
export default Roadmap;
