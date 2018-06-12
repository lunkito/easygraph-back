import * as express from 'express';
import * as controller from './controller';

export const router = express.Router();

//#region GET --------------------------------
router.get('/insert/:newEmail', (req, res) => {
  controller.insertUser(req.params.newEmail)
    .then(user => res.json(user))
    .catch(err => res.status(500).send(err));
});

router.get('/:userEmail', (req, res) => {
  console.log('Parametro: ', req.params.userEmail);
  controller.getUserByEmail(req.params.userEmail)
    .then(user => res.json(user))
    .catch(err => res.status(500).send(err));
});

router.get('/', (req, res) => {
  controller.getAllUsers()
    .then(users => res.json(users))
    .catch(err => res.status(500).send(err));
});
// router.get('/:userId', (req, res) => {
//   controller.getGraph(req.params.userId)
//     .then(graph => res.json(graph))
//     .catch(err => res.status(500).send(err));
// });
//#endregion

//#region POST -------------------------------
router.post('/', (req, res) => {
  const newGraph = req.body;

  controller.postGraph(newGraph)
    .then(() => res.json(newGraph))
    .catch(() => res.status(500).send('No se guardo la grafica'));
});
//#endregion

//#region PUT --------------------------------
router.put('/', (req, res, next) => {
  const graphId = req.body.id;

  controller.putGraph(graphId, req.body)
    .then(graph => res.send(graph))
    .catch(err => next(err));
});
//#endregion

//#region DELETE ----------------------------
router.delete('/:id', (req, res) => {
  const graphId = req.params.id;

  controller.deleteGraph(graphId)
    .then(graph => res.send(graph))
    .catch(err => res.status(404).send(err));
});
//#endregion