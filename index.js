const express = require('express');
const app = express();
const Canvas = require('canvas');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// Delete the image on startup
fs.unlink('/temp/image.png', (err) => {
  if (err) {
    console.log("Error deleting image: ", err);
  } else {
    console.log("Image deleted successfully.");
  }
});

app.get('/', (req, res) => {
  res.status(200).send('Status 200 : True');
});

app.get('/image:images', (req, res) => {
  let images = req.params.images;
  let canvas = createCanvas(200, 200);
  let ctx = canvas.getContext('2d');
  ctx.font = '30px Impact';
  ctx.rotate(.1);
  ctx.fillText(images, 50, 100);
  let tempImage = '/temp/'+images+'.png';
  let out = fs.createWriteStream(tempImage);
  let stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', () =>  { 
    res.json({output:tempImage});
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
