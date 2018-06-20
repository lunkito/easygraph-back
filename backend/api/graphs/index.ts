import * as express from 'express';
import * as controller from './controller';

export const router = express.Router();

// GET --------------------------------
router.get('/:token', (req, res) => {
  console.log('req', req);
  controller.getGraphs(req.params.token)
    .then(graph => res.json(graph))
    .catch(err => res.status(500).send(err));
});

router.get('/:graphName', (req, res) => {
  controller.getGraph(req.body.token, req.params.graphName)
    .then(graph => res.json(graph))
    .catch(err => res.status(500).send(err));
});


// POST --------------------------------
router.post('/', (req, res) => {
  controller.insertGraph(req.body.token)
    .then(graph => res.json(graph))
    .catch(() => res.status(500).send('No se guardo la grafica'));
});


// PUT --------------------------------
router.put('/:graphName', (req, res, next) => {
  controller.updateGraph(req.body.token, req.params.graphName, req.body)
    .then(graph => res.send(graph))
    .catch(err => next(err));
});


// DELETE ----------------------------
router.delete('/:graphName', (req, res) => {
  controller.deleteGraph(req.body.token, req.params.graphName)
    .then(user => res.send(user))
    .catch(err => res.status(404).send(err));
});