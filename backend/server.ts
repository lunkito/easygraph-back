import * as express from 'express';
import * as graphsRouter from './api/graphs';
import * as cors from 'cors';
import * as session from 'express-session';
import { connect } from 'mongoose';
import * as morgan from 'morgan';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const app = express();

app.use(morgan('combined'));
app.use(session({ secret: 'asdf' }));
app.use(cors());
app.use(express.json());

connect(MONGO_URL);
app.use('/graphs', graphsRouter.router);

app.listen('3000', () => console.log('App listening on port 3000'));