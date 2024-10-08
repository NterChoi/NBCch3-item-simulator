import express from 'express';
import cookieParser from 'cookie-parser';
import UsersRouter from "./routers/users.router.js";
import CharacterRouter from "./routers/character.router.js";
import ItemRouter from "./routers/item.router.js";
import dotenv from "dotenv";


const app = express();
const PORT = 11000;

app.use(express.json());
app.use(cookieParser());

app.use('/api', [UsersRouter, CharacterRouter, ItemRouter]);

app.listen(PORT, () => {
    console.log(PORT, '포트로 서버가 열렸어요!');

});