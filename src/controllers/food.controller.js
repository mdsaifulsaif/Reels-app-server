const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  // console.log(req.foodPartenr);
  // console.log(req.body);
  // console.log(req.file);
  // console.log(fileUploadResult);
  // return res.send("food item created");

  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartenr._id,
  });

  res.status(200).json({
    message: "Food created successfully",
    food: foodItem,
  });
}
// async function createFood(req, res) {
//   // console.log(req.foodPartenr);
//   // console.log(req.body);
//   // console.log(req.file);
//   // console.log(fileUploadResult);
//   // return res.send("food item created");

//   const fileUploadResult = await storageService.uploadFile(
//     req.file.buffer,
//     uuid()
//   );

//   const foodItem = await foodModel.create({
//     name: req.body.name,
//     description: req.body.description,
//     video: fileUploadResult.url,
//     foodPartenr: req.foodPartenr._id,
//   });

//   res.status(200).json({
//     message: "Food created successfully",
//     food: foodItem,
//   });
// }

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});

  res.status(200).json({
    message: "Food items fetched successfully",
    foodItems,
  });
}

module.exports = {
  createFood,
  getFoodItems,
};
