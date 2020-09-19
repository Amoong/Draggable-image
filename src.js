let selectedImg;
let prevMouseX;
let prevMouseY;
let imgs = [];
let imageInfos = [];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class ImageInfo {
  constructor(x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
  }
}

function moveImage(imageInfo, dx, dy) {
  imageInfo.x += dx;
  imageInfo.y += dy;
  render();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageInfos.length; i++) {
    const info = imageInfos[i];
    if (info === selectedImg) {
      continue;
    }
    ctx.drawImage(info.img, info.x, info.y, info.width, info.height);
  }
  ctx.drawImage(
    selectedImg.img,
    selectedImg.x,
    selectedImg.y,
    selectedImg.width,
    selectedImg.height
  );
}

function draw(imgs) {
  let prevX = 0;
  let prevY = 0;
  for (let i = 0; i < imgs.length; i++) {
    ctx.drawImage(imgs[i], prevX, prevY, imgs[i].width, imgs[i].height);
    imageInfos[i] = new ImageInfo(
      prevX,
      prevY,
      imgs[i].width,
      imgs[i].height,
      imgs[i]
    );
    prevX += imgs[i].width;
    imgs[i].style.display = "none";
  }

  canvas.addEventListener("mousedown", function (e) {
    const x = e.clientX - this.offsetLeft;
    const y = e.clientY - this.offsetTop;

    for (let i = 0; i < imageInfos.length; i++) {
      const img = imageInfos[i];
      if (
        x >= img.x &&
        x < img.x + img.width &&
        y >= img.y &&
        y < img.y + img.height
      ) {
        selectedImg = img;
        break;
      }
    }
  });

  canvas.addEventListener("mousemove", function (e) {
    if (selectedImg === undefined) {
      return;
    }
    const x = e.clientX - this.offsetLeft;
    const y = e.clientY - this.offsetTop;
    if (prevMouseX === undefined || prevMouseY === undefined) {
      prevMouseX = x;
      prevMouseY = y;
    } else {
      const dx = x - prevMouseX;
      const dy = y - prevMouseY;
      prevMouseX = x;
      prevMouseY = y;
      moveImage(selectedImg, dx, dy);
    }
  });

  document.addEventListener("mouseup", function () {
    selectedImg = undefined;
    prevMouseX = undefined;
    prevMouseY = undefined;
  });
}

function imageLoad() {
  let loadCount = 0;

  imgs[0] = new Image();
  imgs[0].src =
    "https://images.unsplash.com/photo-1600442838391-12d5d246cc6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
  imgs[0].crossOrigin = "Anonymous";
  imgs[0].onload = function () {
    ++loadCount;
    if (loadCount >= 2) {
      draw(imgs);
    }
  };

  imgs[1] = new Image();
  imgs[1].src =
    "https://images.unsplash.com/photo-1600223521564-0415410a0b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
  imgs[1].onload = function () {
    ++loadCount;
    if (loadCount >= 2) {
      draw(imgs);
    }
  };
}

function init() {
  imageLoad();
}

init();
