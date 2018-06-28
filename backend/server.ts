import * as express from 'express';
import * as graphsRouter from './api/graphs';
import * as usersRouter from './api/users';
import * as cors from 'cors';
import * as session from 'express-session';
import { connect } from 'mongoose';
import * as morgan from 'morgan';
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/easygraph';
const SECRET = process.env.SECRET || 'asdf';
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(session({ secret: SECRET }));
app.use(express.json());

connect(MONGO_URL);

app.use('/graphs', graphsRouter.router);
app.use('/users', usersRouter.router);
app.get('/', (req, res) => { res.send('Hello!'); });

app.listen('3000', () => console.log('App listening on port 3000'));
