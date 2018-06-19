import { ObjectID } from 'mongodb';
import { Users } from '../model/model';

export function getGraphs(token: string) {
  return new Promise((resolve, reject) => {
    Users.findOne({ token })
      .then(selectedUser => resolve(selectedUser.graphs))
      .catch(err => reject(err));
  });
}

export function insertGraph(token) {
  return new Promise((resolve, reject) => {
    // const graphToInsert = {...newGraph, created: new Date(), updated: new Date() };

    Users.findOneAndUpdate({token},
      {$push: {
        graphs: {
          name : 'LookAtThisGraph',
          id: new ObjectID(),
          description : 'graph description',
          data : [
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
            {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
            {name: 'Page G', uv: 3490, pv: 4300, amt: 2100}
          ]
        }
      }},
      { new: true }
    )
    .select({ graphs: 1 })
    .then(userDocument => resolve(userDocument))
    .catch(err => reject(err));
  });
}

export function getGraph(token: string, graphName) {
  return new Promise((resolve, reject) => {
    Users.findOne({ token })
      .select({ graphs: 1 })
      .$where(graph =>  graph.name === graphName)
      .then(graph => resolve(graph))
      .catch(err => reject(err));
  });
}

export function updateGraph(token: string, graphName: string, graphFromBody) {
  const graphToUpdate = { ...graphFromBody};

  return new Promise((resolve, reject) => {
    Users.findOneAndUpdate(
      { token, 'graphs.name': graphName },
      { $set: { 'graphs.$.data': graphToUpdate.data } },
      { new: true }
      )
      .select({ graphs: 1 })
      .then(graph => resolve(graph))
      .catch(err => reject(err));
  });
}

export function deleteGraph(token: string, graphName: string) {
  return new Promise((resolve, reject) => {
    Users.findOneAndRemove(
      { token, 'graphs.name': graphName }
    )
    .then(graph => resolve(graph))
    .catch(err => reject(err));
  });
}