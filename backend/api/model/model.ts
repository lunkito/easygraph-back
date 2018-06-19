import { Schema, Document, Model, model } from 'mongoose';

export interface IGraph {
  id: any;
  name: String;
  description?: String;
  data: any[];
  created: Date;
  updated: Date;
}

export interface IUser extends Document {
  _id: any;
  userName: string;
  password: string;
  email: string;
  graphs?: IGraph[];
  token?: string;
  created?: Date;
  updated?: Date;
}

export interface IDisplayUser {
  userName: String;
  created?: Date;
  updated?: Date;
  token?: string;
}

const UserSchema: Schema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: false },
  email: { type: String, required: true },
  graphs: { type: [], required: false },
  token: { type: String, required: false },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export const Users: Model<IUser> = model<IUser>('users', UserSchema);