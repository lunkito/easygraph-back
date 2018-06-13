import * as express from 'express';
import * as controller from './controller';

export const router = express.Router();

//#region GET --------------------------------
router.get('/:userName', (req, res) => {
  controller.getUserByUserName(req.params.userName)
    .then(user => res.json(user))
    .catch(err => res.status(500).send(err));
});

router.get('/', (req, res) => {
  controller.getAllUsers()
    .then(users => res.json(users))
    .catch(err => res.status(500).send(err));
});
//#endregion

//#region POST -------------------------------
router.post('/insert/:userName', (req, res) => {
  controller.insertUser(req.params.userName)
    .then(user => res.json(user))
    .catch(err => res.status(500).send(err));
});
//#endregion

//#region PUT --------------------------------
// router.put('/', (req, res, next) => {
//   const graphId = req.body.id;

//   controller.putGraph(graphId, req.body)
//     .then(graph => res.send(graph))
//     .catch(err => next(err));
// });

router.put('/:userName', (req, res, next) => {
  controller.updateUser(req.params.userName, req.body)
    .then(user => res.send(user))
    .catch(err => next(err));
});
//#endregion

//#region DELETE ----------------------------
router.delete('/:id', (req, res) => {
  const graphId = req.params.id;

  controller.deleteUser(graphId)
    .then(graph => res.send(graph))
    .catch(err => res.status(404).send(err));
});
//#endregion