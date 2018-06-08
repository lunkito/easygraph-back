import * as express from 'express';
import * as graphsRouter from './api/graphs';
import * as cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/graphs', graphsRouter.router);

app.listen('3000', () => console.log('App listening on port 3000'));