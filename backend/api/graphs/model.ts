import { Schema, Document, Model, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  graphs?: object[];
  created: Date;
  updated: Date;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  graphs: { type: [Object], required: false },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export const user: Model<IUser> = model<IUser>('users', userSchema);