import foodModel from '../models/foodModel.js';

export default async({payload}) =>{
    return await foodModel.food.save(payload);
}