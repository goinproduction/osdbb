import 'dotenv/config'
import express, { Router } from 'express'
import cors from 'cors';
import route from './common/route'
import Connect from './configs/connect.config';

Connect();

const app = express();
app.use(express.json());
app.use(cors());

route(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));