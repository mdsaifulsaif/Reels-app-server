// const mongoose = (require = require("mongoose"));

// const foodSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   video: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//   },
//   // foodPartenr: {
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: "user",
//   // },
// });

// const foodModel = mongoose.model("food", foodSchema);
// module.exports = foodModel;

// // foodPartner: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "foodpartner",
// //   },

const mongoose = (require = require("mongoose"));

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  foodPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodpartner",
  },
});

const foodModel = mongoose.model("food", foodSchema);
module.exports = foodModel;
