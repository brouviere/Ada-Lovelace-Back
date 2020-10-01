import { Document, Schema, model, Model} from 'mongoose';
import { SHA256 } from 'crypto-js';

export interface IUser extends Document {
  email: string;
  firstname: string;
  lastname: string;
  setPassword: (password: string) => void;
  verifyPassword: (password: string) => boolean;
  getSafeUser: () => ISafeUser;
}

export type ISafeUser = Pick<IUser, '_id' | 'email' | 'lastname' | 'firstname' >

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});


userSchema.methods.getSafeUser = function (): ISafeUser {
  const { _id, email, lastname, firstname } = this;
  return { _id, email, lastname, firstname };
};

userSchema.methods.setPassword = function (password: string) {
  this.password = SHA256(password).toString();
}

userSchema.methods.verifyPassword = function (password: string) {
  return this.password === SHA256(password).toString();
}

const User = model<IUser, Model<IUser>>('user', userSchema);

export default User;