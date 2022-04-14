import React, {useEffect, useRef} from 'react';
import topView from 'src/assets/top-view.png';
import frontView from 'src/assets/front-view.png';
import {
  getInvertedImageData,
  getConvertedTopViewImageData,
  getConvertedFrontViewImageData,
} from './utils';

const MyCanvas: React.FC = () => {
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef1.current) {
      return;
    }
    const canvas1: HTMLCanvasElement = canvasRef1.current;
    const context1: CanvasRenderingContext2D | null = canvas1?.getContext('2d');
    const img = new Image();
    img.src = topView;
    img.onload = function() {
      canvas1.width = img.width;
      canvas1.height = img.height;
      context1?.drawImage(img, 0, 0);
      img.style.display = 'none';
    };
  }, []);

  function convert() {
    if (!canvasRef1.current || !canvasRef2.current) {
      console.log('no canvas');
      return;
    }
    const canvas1: HTMLCanvasElement = canvasRef1.current;
    const context1: CanvasRenderingContext2D | null = canvas1?.getContext('2d');
    const sourceImageData = context1?.getImageData(0, 0, canvas1.width, canvas1.height);
    if (!sourceImageData) {
      console.log('no sourceImageData');
      return;
    }
    // const destImageData = getInvertedImageData(sourceImageData);
    const destImageData = getConvertedTopViewImageData(sourceImageData);
    // const destImageData = getConvertedFrontViewImageData(sourceImageData, 7);
    const canvas2: HTMLCanvasElement = canvasRef2.current;
    const context2: CanvasRenderingContext2D | null = canvas2?.getContext('2d');
    canvas2.width = destImageData.width;
    canvas2.height = destImageData.height;
    context2?.putImageData(destImageData, 0, 0);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <canvas ref={canvasRef1} />
      <button style={{margin: '16px'}} onClick={convert}>
        Convert
      </button>
      <canvas ref={canvasRef2} />
    </div>
  );
};

export default MyCanvas;
