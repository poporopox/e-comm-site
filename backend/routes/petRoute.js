import express from 'express';

import multer from 'multer';
import { addPet, removePet, listPet } from '../controllers/petController.js';
const petRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage})

petRouter.get("/list",listPet);
petRouter.post("/add",upload.single('image'),addPet);
petRouter.post("/remove",removePet);

export default petRouter;