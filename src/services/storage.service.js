const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: "public_t5WGgNEm/rfFEQ2O66mCl9Kkr0k",
  privateKey: "private_n6vH+to0s80s9z2N/ZjCYUOCj6E=",
  urlEndpoint: "https://ik.imagekit.io/qb6aisum7",
});

async function uploadFile(file, fileName) {
  const result = await imagekit.upload({
    file: file,
    fileName: fileName,
  });
  return result;
}

module.exports = {
  uploadFile,
};
