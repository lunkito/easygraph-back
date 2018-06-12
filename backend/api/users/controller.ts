import { MongoClient, ObjectID } from 'mongodb';
import { Users } from '../model/model';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';

export function getUserByUserName(userName) {
  return Users.findOne({ userName });
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
  console.log(' Fin de insertUser', user, userName);
  return user.save();
}

// export function insertGraph(userName) {
//   const user = new Users({
//     userName,
//     email : 'correo',
//     created : new Date(),
//     updated : new Date(),
//     graphs : [
//       {
//         name : 'Graph name',
//         _id: new ObjectId(),
//         description : 'graph description',
//         data : [ 
//           {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
//           {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
//           {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
//           {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
//           {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
//           {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
//           {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
//         ]
//       }
//     ]
//   });
//   console.log(' Fin de insertUser', user, userName);
//   return user.save();
// }

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

export function putUser(graphId: number, graphFromBody) {
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