import passport from "passport";
import { Strategy } from "passport-local";
import User, { IUser } from "../models/User";
import { Handler } from "express";

passport.use(
  new Strategy((username: string, password: string, done) => {
    try {
      User.findOne({email: username}, null, (err, user) => {
        if(err) { return done(err); }
        if(user) {
          const hasCorrectPassword = user.verifyPassword(password);
          if(hasCorrectPassword) { return done(null, user) };
        }
        return done(new UserNotFoundError("User not found"));
      })
    } catch(error) {
      return done(error);
    }
  })
);

passport.serializeUser(
  ({ _id }: IUser, done) => { done(null, _id) }
);

passport.deserializeUser(
  (_id, done) => {
    User.findById(_id, (err, user) => {
      if(err) { return done(err) };
      return done(undefined, user);
    });
  }
);

export const authenticationInitialize = (): Handler => passport.initialize();
export const authenticationSession = (): Handler => passport.session();
export class UserNotFoundError extends Error {};