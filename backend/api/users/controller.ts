import { MongoClient, ObjectID } from 'mongodb';
import { Users, IUser } from '../model/model';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';

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

export function postGraph(newGraph) {
  return new Promise((resolve, reject) => {
    const graphToInsert = {...newGraph, created: new Date(), updated: new Date() };
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db('easygraph');
        const graphsCollection = db.collection('graphs');

        graphsCollection.insertOne(graphToInsert)
          .then(() => resolve(graphToInsert))
          .catch(errorInsert => reject(errorInsert));
      } else {
        reject(err);
      }
    });
  });
}

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

export function deleteUser(graphId: number) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
      const db = client.db('easygraph');
      const graphsCollection = db.collection('graphs');

      const query = { _id: new ObjectID(graphId) };
      graphsCollection.findOneAndDelete(query)
        .then(() => resolve())
        .catch((deleteError => reject(deleteError)));
    });
  });
}