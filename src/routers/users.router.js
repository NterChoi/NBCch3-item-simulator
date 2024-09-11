import express from 'express';
import jwt from 'jsonwebtoken';
import {prisma} from "../utils/prisma/index.js";
import Joi from "joi";
import bcrypt from "bcrypt";


const router = express.Router();

const schema = Joi.object({
    id: Joi.string().pattern(new RegExp('^[a-z0-9]{3,10}$')).required(),
    password : Joi.string().alphanum().min(6).required(),
    passwordCheck: Joi.ref('password'),
    userName : Joi.string().required()
})

// 사용자 회원가입 API 아이디, 비밀번호, 비밀번호 확인, 이름을 받음
router.post('/signup', async (req, res) => {

    try {
        const validation = await schema.validateAsync(req.body);

        const {id, password, passwordCheck, userName} = req.body;
        const isExistUser = await prisma.users.findFirst({
            where: {
                id
            }
        });

        if (isExistUser) {
            return res.status(409).json({message: '이미 존재하는 아이디입니다.'});
        }

        // 사용자 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 12);

        // Users 테이블에 사용자를 추가
        const user = await prisma.users.create({
            data: {
                id,
                password: hashedPassword,
                userName
            }
        });

        return res.status(201).json({"id": id, "name": userName});


    } catch (err) {
        return res.status(400).json({message: err.message});
    }
});

// 로그인 API
router.post('/signin', async (req, res, next) => {
    const {id, password} = req.body;

    const user = await prisma.users.findFirst({where: {id}});
    if (!user) {
        return res.status(401).json({message: '존재하지 않는 이메일입니다.'});
    } else if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({message: '비밀번호가 일치하지 않습니다.'});
    }


    // 로그인에 성공하면, 사용자의 userId를 바탕으로 토큰을 생성합니다.
    const token = jwt.sign({
        id: id
    }, process.env.SECRETE_KEY)


    // authorization 쿠키에 Bearer 토큰 형식으로 jwt 저장
    res.cookie('authorization', `Bearer ${token}`);
    return res.status(200).json({message: '로그인 성공'});


});



export default router;