import app from './../app';
import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000;

app.listen(SERVER_PORT, () => console.log(`Server running at port ${SERVER_PORT}`));