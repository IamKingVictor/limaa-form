import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  kingschat_username: string;
  country: string;
}

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  kingschat_username: { type: String, required: true },
  country: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
