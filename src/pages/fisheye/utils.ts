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
