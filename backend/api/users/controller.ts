import { Users, IUser } from '../model/model';
import { ObjectID } from 'mongodb';

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

export function login(body) {
  return new Promise((resolve, reject) => {
    Users.findOne({ userName: body.userName, password: body.password })
      .then((putoUser) => {
        if (putoUser !== null) {
          console.log('Response de DB', putoUser);

          const token = new ObjectID();
          putoUser.token = token.toHexString();
          resolve(putoUser);
          // putoUser.save()
          //   .then(putoUser => {
          //     console.log('Response de DB', putoUser);
          //     res.json(putoUser.token);
          //   })
          //   .catch(() => 'No se guardo el token en DB');
        } else {
          reject(404);
        }
  });
    // .then(user => {
    //   console.log('Usuario ', (user));
    //   if (user) {
    //     return true;
    //   }
    //   return false;
    // })
    // .catch();
});
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