import React from 'react';
import MyCanvas from './my-canvas';

const FishEye: React.FC = () => {
  return (
    <div>
      <h2 style={{textAlign: 'center', height: '24px'}}>Workshop: Fisheye Conversion</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 'calc(100vh - 24px)',
        }}
      >
        <MyCanvas />
      </div>
    </div>
  );
};

export default FishEye;
