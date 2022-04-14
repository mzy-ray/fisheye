export function getInvertedImageData(sourceImageData: ImageData): ImageData {
  const sourceImageDataArray = sourceImageData.data;
  const destImageDataArray = new Array<number>(sourceImageDataArray.length);
  for (let i = 0; i < sourceImageDataArray.length; i += 4) {
    destImageDataArray[i] = 255 - Number(sourceImageDataArray[i]);
    destImageDataArray[i + 1] = 255 - Number(sourceImageDataArray[i + 1]);
    destImageDataArray[i + 2] = 255 - Number(sourceImageDataArray[i + 2]);
    destImageDataArray[i + 3] = Number(sourceImageDataArray[i + 3]);
  }
  return new ImageData(
    new Uint8ClampedArray(destImageDataArray),
    sourceImageData.width,
    sourceImageData.height,
    {
      colorSpace: 'srgb',
    }
  );
}

export function getConvertedTopViewImageData(sourceImageData: ImageData): ImageData {
  const sourceR = Math.floor(sourceImageData.height / 2);
  const destHeight = sourceR;
  const destWidth = Math.floor(2 * Math.PI * sourceR);
  const sourceCX = Math.floor(sourceImageData.width / 2);
  const sourceCY = Math.floor(sourceImageData.height / 2);
  const sourceImageDataArray = sourceImageData.data;
  const destImageDataArray = new Array<number>(destHeight * destWidth);
  for (let destX = 0; destX < destWidth; destX += 1) {
    for (let destY = 0; destY < destHeight; destY += 1) {
      const r = (destY / destHeight) * sourceR;
      const theta = (destX / destWidth) * 2 * Math.PI;
      const sourceX = Math.floor(sourceCX + r * Math.sin(theta));
      const sourceY = Math.floor(sourceCY + r * Math.cos(theta));
      const sourceIdx = (sourceY * sourceImageData.width + sourceX) * 4;
      const x = destWidth - destX - 1;
      const y = destHeight - destY - 1;
      const destIdx = (y * destWidth + x) * 4;
      destImageDataArray[destIdx] = sourceImageDataArray[sourceIdx];
      destImageDataArray[destIdx + 1] = sourceImageDataArray[sourceIdx + 1];
      destImageDataArray[destIdx + 2] = sourceImageDataArray[sourceIdx + 2];
      destImageDataArray[destIdx + 3] = sourceImageDataArray[sourceIdx + 3];
    }
  }
  return new ImageData(new Uint8ClampedArray(destImageDataArray), destWidth, destHeight, {
    colorSpace: 'srgb',
  });
}

export function getConvertedFrontViewImageData(
  sourceImageData: ImageData,
  aperture: number
): ImageData {
  const destHeight = sourceImageData.height;
  const destWidth = 2 * sourceImageData.width;
  const sourceImageDataArray = sourceImageData.data;
  const destImageDataArray = new Array<number>(destHeight * destWidth);
  const sourceCX = Math.floor(sourceImageData.width / 2);
  const sourceCY = Math.floor(sourceImageData.height / 2);
  const destCX = Math.floor(destWidth / 2);
  const destCY = Math.floor(destHeight / 2);
  for (let destX = 0; destX < destWidth; destX += 1) {
    for (let destY = 0; destY < destHeight; destY += 1) {
      // 2D rect -> 3D lati, long
      const longitude = ((destX - destCX) / destWidth) * Math.PI;
      const latitude = (((destY - destCY) / destHeight) * Math.PI) / 2;
      // 3D lati, long -> 3D rect
      const Py = Math.cos(latitude) * Math.cos(longitude);
      const Px = Math.cos(latitude) * Math.sin(longitude);
      const Pz = Math.sin(latitude);
      // 3D rect -> 2D polar -> 2D rect
      const r = (2 * Math.atan2(Math.sqrt(Px * Px + Pz * Pz), Py)) / aperture;
      const theta = Math.atan2(Pz, Px);
      const sourceX = sourceCX + Math.floor(r * Math.cos(theta) * sourceImageData.width);
      const sourceY = sourceCY + Math.floor(r * Math.sin(theta) * sourceImageData.height);
      const sourceIdx = (sourceY * sourceImageData.width + sourceX) * 4;
      const destIdx = (destY * destWidth + destX) * 4;
      destImageDataArray[destIdx] = sourceImageDataArray[sourceIdx];
      destImageDataArray[destIdx + 1] = sourceImageDataArray[sourceIdx + 1];
      destImageDataArray[destIdx + 2] = sourceImageDataArray[sourceIdx + 2];
      destImageDataArray[destIdx + 3] = sourceImageDataArray[sourceIdx + 3];
    }
  }

  return new ImageData(new Uint8ClampedArray(destImageDataArray), destWidth, destHeight, {
    colorSpace: 'srgb',
  });
}
