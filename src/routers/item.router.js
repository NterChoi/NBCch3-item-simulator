import express from 'express';
import {prisma} from "../utils/prisma/index.js";

const router = express.Router();


// 아이템 생성 API
router.post('/items', async (req, res, next) => {
    const {itemName, itemPrice, itemInfo} = req.body;

    const item = await prisma.items.create({
        data: {
            itemName: itemName,
            itemPrice: itemPrice,
            itemInfo: itemInfo
        }
    });

    return res.status(201).json({
            message: '아이템을 생성하였습니다',
            data: item
        }
    );
})

// 아이템 목록 조회 API
router.get('/items', async (req, res, next) => {
    const items = await prisma.items.findMany({
        select: {
            itemId: true,
            itemName: true,
            itemPrice: true,
        },
        orderBy: {
            itemId: 'asc'
        }
    });

    return res.status(200).json({data: items})
});

// 아이템 상세 조회 API
router.get('/items/:itemId', async (req, res, next) => {
    const {itemId} = req.params;

    const item = await prisma.items.findFirst({
        where: {
            itemId: +itemId
        },
        select: {
            itemId: true,
            itemName: true,
            itemPrice: true,
            itemInfo: true,
        }
    });

    return res.status(200).json({data: item});
});

// 아이템 수정 API
router.put('/items/:itemId', async (req, res, next) => {
    const {itemId} = req.params;
    const {itemName, itemPrice, itemInfo} = req.body;

    if(itemPrice !== undefined){
        return res.status(401).json({message: '아이템 가격은 수정할 수 없습니다!'});
    }

    const updateItem = await prisma.items.update({
        where: {
            itemId: +itemId
        },
        data: {
            itemName: itemName,
            itemInfo: itemInfo
        }
    });

    return res.status(200).json({
        message: '아이템 정보 변경에 성공하였습니다.',
        data: updateItem
    });
})

export default router;