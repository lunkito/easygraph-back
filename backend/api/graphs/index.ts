import * as express from 'express';
import * as controller from './controller';

export const router = express.Router();

// GET --------------------------------
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


// POST --------------------------------
router.post('/:userName', (req, res) => {
  controller.insertGraph(req.params.userName)
    .then(graph => res.json(graph))
    .catch(() => res.status(500).send('No se guardo la grafica'));
});


// PUT --------------------------------
router.put('/:userName/:graphName', (req, res, next) => {
  controller.updateGraph(req.params.userName, req.params.graphName, req.body)
    .then(graph => res.send(graph))
    .catch(err => next(err));
});


// DELETE ----------------------------
router.delete('/:userName/:graphName', (req, res) => {
  controller.deleteGraph(req.params.userName, req.params.graphName)
    .then(user => res.send(user))
    .catch(err => res.status(404).send(err));
});