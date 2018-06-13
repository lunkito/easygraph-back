import * as express from 'express';
import * as controller from './controller';

export const router = express.Router();

//#region GET --------------------------------
router.get('/:userName', (req, res) => {
  controller.getGraphs(req.params.userName)
    .then(graph => res.json(graph))
    .catch(err => res.status(500).send(err));
});

router.get('/:userName/:graphName', (req, res) => {
  controller.getGraph(req.params.userName, req.params.graphName)
    .then(graph => res.json(graph))
    .catch(err => res.status(500).send(err));
});
//#endregion

//#region POST -------------------------------
router.post('/:userName', (req, res) => {
  controller.insertGraph(req.params.userName)
    .then(graph => res.json(graph))
    .catch(() => res.status(500).send('No se guardo la grafica'));
});
//#endregion

//#region PUT --------------------------------
router.put('/:userName/:graphName', (req, res, next) => {
  console.log(`Nombre usuario: ${req.params.userName}. Nombre grafica: ${req.params.graphName}`);
  console.log('Body: ', req.body);
  controller.updateGraph(req.params.userName, req.params.graphName, req.body)
    .then(graph => res.send(graph))
    .catch(err => next(err));
});
//#endregion

//#region DELETE ----------------------------
router.delete('/:userName/:graphName', (req, res) => {

  controller.deleteGraph(req.params.userName, req.params.graphName)
    .then(user => res.send(user))
    .catch(err => res.status(404).send(err));
});
//#endregion