import * as express from 'express';
import * as graphsRouter from './api/graphs';
const app = express();

app.use(express.json());
app.use('/graphs', graphsRouter.router);

app.get('/', (req, res) => {
  res.send('Hello world from API');
});

app.listen('3000', () => console.log('App listening on port 3000'));