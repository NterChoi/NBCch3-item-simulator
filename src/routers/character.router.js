import express from 'express';
import {prisma} from "../utils/prisma/index.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/characters", authMiddleware, async (req, res, next) => {
    const {userId} = req.user

    const {name} = req.body;

    if(!name){
        return res.status(400).json({errorMessage: '데이터 형식이 올바르지 않습니다.'});
    }

    const isExistsCharacter = await prisma.character.findFirst({
        where: {name: name}
    });

    if (isExistsCharacter) {
        return res.status(409).json({message: '이미 존재하는 이름입니다.'});
    }

    const character = await prisma.character.create({
        data: {
            name: name,
            userId: userId,
        }
    });

    return res.status(201).json({
        message: `새로운 캐릭터 '${character.name}'를 생성하셨습니다!`,
        data: {
            "character_id": character.characterID
        }
    });

});

router.delete('/characters/:characterId', authMiddleware, async (req, res, next) => {
    const {userId} = req.user;
    const {characterId} = req.params;
    if (!characterId) {
        return res.status(400).json({message: '데이터 형식이 올바르지 않습니다.'});
    }
    const character = await prisma.character.findFirst({
        where: {characterID: +characterId}
    });

    if(userId !== character.userId){
       return res.status(400).json({message : "보유한 케릭터만 삭제가 가능합니다."});
    }
    if (!character) {
        res.status(404).json({message: "캐릭터 조회에 실패하였습니다."});
    }
    await prisma.character.delete({
        where: {characterID: +characterId}
    });

    return res.status(201).json({message: `캐릭터 '${character.name}'를 삭제하였습니다.`})
});

// 캐릭터 상세 조회 API
//  비로그인시 캐릭터 조회 구현 필요
router.get('/characters/:characterId', authMiddleware, async (req, res, next) => {
    const {characterId} = req.params;
    const {userId} = req.user;
    if (!characterId) {
        return res.status(400).json({message: '데이터 형식이 올바르지 않습니다.'});
    }

    const isExistsCharacter = await prisma.character.findFirst({
        where: {characterID: +characterId}
    });

    if (!isExistsCharacter) {
        return res.status(404).json({message: "캐릭터 조회에 실패하였습니다."});
    }

    if(userId === undefined || userId !== isExistsCharacter.userId){
        const character = await prisma.character.findFirst({
            where: {characterID: +characterId},
            select: {
                name: true,
                health: true,
                power: true,
            }
        });

        return res.status(200).json({data: character});
    }else {
        const character = await prisma.character.findFirst({
            where: {characterID: +characterId},
            select: {
                name: true,
                health: true,
                power: true,
                money: true,
            },
        });

        return res.status(200).json({data: character});
    }
})

export default router;