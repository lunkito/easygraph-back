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


// BIENAVENTURADO SEAS VIAJERO.
// Aqui podras ver mi primer intento de login de usuario y todas las pifias y cagadas mentales que se me ocurrieron por el camino.
// Ah y encima la mitad (o más) de lo que hay es copy paste
// Especial atencion a la hora de generar un token... Con MONGODB!!
export function login(body) {
  return new Promise((resolve, reject) => {
    Users.findOne({ userName: body.userName, password: body.password })
      .select({ graphs: 0, password: 0 }) // TODO: Como leñes hacer funcionar la Interfaz y hacer esa cosa... de devolver solo datos especificos
      .then((user) => {
        console.log('Response de DB', user);

        const token = new ObjectID().toHexString();
        Users.update({ _id: user._id}, { $set: { token }})
          .then(() => resolve(user))
          .catch(err => reject(err)); })
      .catch(err => reject(err));
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