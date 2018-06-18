import * as express from 'express';
import * as controller from './controller';
import { IUser } from '../model/model';
import * as session from 'express-session';

export const router = express.Router();

// GET --------------------------------
router.get('/:userName', (req, res) => {
  controller.getUserByUserName(req.params.userName)
    .then(user => res.json(user))
    .catch(err => res.status(500).send(err));
});

router.get('/:userName/id', (req, res) => {
  controller.getUserId(req.params.userName)
    .then(user => res.json(user))
    .catch(err => res.status(500).send(err));
});

router.get('/', (req, res) => {
  controller.getAllUsers()
    .then(users => res.json(users))
    .catch(err => res.status(500).send(err));
});


// POST -------------------------------
router.post('/login', (req, res) => {
  console.log('Req.body.password: ', req.body.password);
  controller.login(req.body)
    .then((putoUser: IUser) => {
      // session.
        // putoUser.save()
        //   .then(putoUser => {
        //     console.log('Response de DB', putoUser);
        //     res.json(putoUser.token);
        //   })
        //   .catch(() => 'No se guardo el token en DB');
     })
    .catch(err => res.status(404).send(err));
});

router.post('/insert', (req, res) => {
  console.log('Body', req);
  controller.addUser(req.body.userName, req.body.password)
    .then(response => res.json(response))
    .catch(err => res.status(500).send(err));
});


// PUT --------------------------------
router.put('/:userName', (req, res, next) => {
  controller.updateUser(req.params.userName, req.body)
    .then(user => res.send(user))
    .catch(err => next(err));
});


// DELETE ----------------------------
router.delete('/:userName', (req, res) => {
  controller.deleteUser(req.params.userName)
    .then(graph => res.send(graph))
    .catch(err => res.status(404).send(err));
});
