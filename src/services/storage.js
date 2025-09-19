const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: "dhig1svnp",
  api_key: "534965229428133",
  api_secret: "11t_x-JeCwAKIqqLE9dLq_T5pN8",
});

async function uploadFile(fileBuffer, fileName) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video", // ভিডিও হলে অবশ্যই দিতে হবে
        public_id: fileName,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
}

module.exports = {
  uploadFile,
};
