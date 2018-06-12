import { Schema, Document, Model, model } from 'mongoose';

export interface IGraph {
  name: String;
  description: String;
  data: [Object];
}

export interface IUser extends Document {
  name?: string;
  email: string;
  graphs?: [IGraph];
  created?: Date;
  updated?: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  graphs: { type: [], required: false },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export const User: Model<IUser> = model<IUser>('users', UserSchema);