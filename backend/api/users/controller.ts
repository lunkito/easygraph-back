import { Users, IUser } from '../model/model';

export function getUserId(userName) {
  return Users.findOne({ userName })
    .select({ _id: 1 });
}

export function getUserByUserName(userName) {
  return Users.findOne({ userName })
    .select({ graphs: 0 });
}

export function getAllUsers() {
  return Users.find({})
    .select({ graphs: 0 });
}

export function insertUser(userName) {
  const user = new Users({
    userName,
    email : 'correo',
    created : new Date(),
    updated : new Date(),
    graphs : []
  });
  return user.save();
}

export const addUser = (userName, password) => {
  const user = new Users({
    userName,
    password,
    email : 'correo',
    created : new Date(),
    updated : new Date(),
    graphs : []
  });
  return user.save();
};

export function updateUser(userName: string, userFromBody: IUser) {
  return new Promise((resolve, reject) => {
    Users.findOneAndUpdate(
      { userName },
      { $set: { userName: userFromBody.userName } },
      { new: true }
    )
    .select({ graphs: 0 })
    .then(user => resolve(user))
    .catch(err => reject(err));
  });
}

export function deleteUser(userName: string) {
  return new Promise((resolve, reject) => {
    Users.findOneAndRemove(
      { userName })
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}