import * as express from 'express';
import * as controller from './controller';

export const router = express.Router();

//#region GET --------------------------------
router.get('/', (req, res) => {
  console.log('Entra a /');
  controller.getGraphs()
    .then(graphs => res.json(graphs))
    .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
  controller.getGraph(req.params.id)
    .then(graph => res.json(graph))
    .catch(err => res.status(500).send(err));
});
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