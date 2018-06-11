import { MongoClient, Server, ObjectID } from 'mongodb';
import { user } from './model';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';

export function getUserByEmail(userEmail) {
  return new Promise((resolve, reject) => {
    user.find({ email: { $in: [`${userEmail}`] }})
      .then(result => resolve(result));
  });
}


export function getGraph(userId: number) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db('easygraph');
        const usersCollection = db.collection('users');

        usersCollection.findOne({ userId: new ObjectID(userId)})
          .then(graph => resolve(graph))
          .catch(errorFind => reject(errorFind));
      } else {
        reject(err);
      }
    });
  });
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

export function putGraph(graphId: number, graphFromBody) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db('easygraph');
        const graphsCollection = db.collection('graphs');

        const graphToUpdate = { ...graphFromBody, updated: new Date() };
        const query = { _id: new ObjectID(graphId)};
        const body = { $set: graphToUpdate };
        const options = { returnOrigonal: false, upsert: false };
        graphsCollection.findOneAndUpdate(query, body, options)
          .then(() => resolve())
          .catch(updateError => reject(updateError));
      } else {
        reject(err);
      }
    });
  });
}

export function deleteGraph(graphId: number) {
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