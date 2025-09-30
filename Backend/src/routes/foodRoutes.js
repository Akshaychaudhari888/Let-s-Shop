import express from 'express';
import multer from 'multer';
import addFood from '../controller/food.Controller.js'
import addNum from '../controller/add.Controller.js';
import subNum from '../controller/testing.Controller.js';
import getFoodList from '../controller/getFoodList.Controller.js';
import removeFood from '../controller/removeFoodItems.Controller.js';

const routes = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });
routes.post('/add', upload.single('image'), addFood);
routes.post("/addNum",addNum);
routes.post("/subNum",subNum);
routes.get("/list",getFoodList);
routes.post("/remove",removeFood);


export default routes;

