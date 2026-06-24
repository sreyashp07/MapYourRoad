import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    // Hashed with bcrypt. select:false keeps it out of normal queries.
    password: { type: String, required: true, select: false },
    image: { type: String, default: "" },
  },
  { timestamps: true, collection: "users" }
);

export const User = models.User || model("User", UserSchema);
export default User;
