import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes';
import bodyParser from 'body-parser';

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

// enable CORS for all origins
app.use(cors());
app.use(bodyParser())

app.use(todoRoutes);
app.use('/health-check', (req, res) => {
  res.status(200).send('OK');
});

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.5ipfb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useInifiedTopology: true };
mongoose.set("useFindAndModify", false);

mongoose.connect(uri, options).then(() => {
  console.log('[DATABASE CONNECTED]');
  app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
  });
}).catch((exception) => {
  throw exception;
});

