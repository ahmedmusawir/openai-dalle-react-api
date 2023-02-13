import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDb from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.send('Hello from Local Dall-e!');
});

app.get('/api/v1/post', async (req, res) => {
  res.send('Hello from Post Route!');
});

const startServer = async () => {
  try {
    connectDb(process.env.MONGODB_URL);

    app.listen(4002, () =>
      console.log('Server has started on port http://localhost:4002')
    );
  } catch (error) {
    console.log('Connection Error', error);
  }
};

startServer();
