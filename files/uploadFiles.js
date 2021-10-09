const fs = require('fs');
const path = require('path');

module.exports = (filePath, fileName, callbackCreatedImage) => {
  const validTypes = ["jpg", "png", "jpeg"];
  const type = path.extname(filePath);
  const isValidType = validTypes.indexOf(type.substring(1)) !== -1;

  if (isValidType) {
    const newFilePath = `./assets/imagens/${fileName}${type}`

    fs.createReadStream(filePath)
      .pipe(fs.createWriteStream(newFilePath))
      .on('finish', () => callbackCreatedImage(false, newFilePath));
  } else {
    const error = 'Invalid Type';
    console.log("Error! Invalid Type");
    callbackCreatedImage(true);
  }
};