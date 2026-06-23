import { Schema, model, models } from "mongoose";

/** Embedded node — mirrors React Flow's node shape exactly. */
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
      resources: [{ title: String, url: String }],
      status: {
        type: String,
        enum: ["todo", "in-progress", "done"],
        default: "todo",
      },
    },
  },
  { _id: false }
);

/** Embedded edge — mirrors React Flow's edge shape exactly. */
const EdgeSchema = new Schema(
  {
    id: { type: String, required: true },
    source: { type: String, required: true },
    target: { type: String, required: true },
    type: { type: String, default: "roadmapEdge" },
    label: { type: String, default: "" },
    animated: { type: Boolean, default: false },
  },
  { _id: false }
);

const RoadmapSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    slug: { type: String, required: true, unique: true, index: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, default: "General" },
    tags: [{ type: String }],
    isPublic: { type: Boolean, default: false },
    nodes: { type: [NodeSchema], default: [] },
    edges: { type: [EdgeSchema], default: [] },
  },
  { timestamps: true }
);

export const Roadmap = models.Roadmap || model("Roadmap", RoadmapSchema);
export default Roadmap;
