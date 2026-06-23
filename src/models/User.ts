import { Schema, model, models } from "mongoose";

/**
 * Shares the `users` collection that Auth.js (@auth/mongodb-adapter)
 * will own in Phase 3. strict:false lets adapter-written fields coexist.
 */
const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    emailVerified: { type: Date, default: null },
    image: { type: String },
  },
  { timestamps: true, collection: "users", strict: false }
);

export const User = models.User || model("User", UserSchema);
export default User;
