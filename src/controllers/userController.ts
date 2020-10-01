import User, { IUser } from "../models/User";

const find = async () => {
  try {
    const users = await User.find({}).exec();
    return users;
  } catch (err) {
    return 'Error occured';
  }
}

const findById = async (id: string) => {
  try {
    const user = await User.findById(id).exec();
    return user;
  } catch (error) {
    return 'Error occured'
  }
}

const findByIdAndDelete = (id: string) => {
  try {
    User.findByIdAndDelete(id, (err, res) => {
      return res;
    })
  } catch (error) {
    return 'Error occured';
  }
}

const findByIdAndUpdate = async (id: string, data: IUser ) => {
  try {
    await User.findByIdAndUpdate(id, data, (err, updatedUser) => {
      if(err) { return `An error has occured: ${err}`; }
      return updatedUser;
    })
  } catch (error) {
    return 'Error occured';
  }
}

const updateUser = (user: IUser, email: string, firstname: string, lastname: string, password?: string): Promise<IUser | null> => {
  if(password) user.setPassword(password);
  return User.findByIdAndUpdate(user._id, {email, firstname, lastname}).then(user => user);
}

const create = async (data: any) => {
  try {
    const newUser = new User({ email: data.email, firstname: data.firstname, lastname: data.lastname });
    newUser.setPassword(data.password);
    newUser.save();

    return newUser;
  } catch (error) {
    return 'Error occured'
  }
}

export = {
  find,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
  create,
  updateUser
}