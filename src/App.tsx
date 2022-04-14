import React, {useEffect} from 'react';

import './App.css';
import FishEye from 'src/pages/fisheye';

const App: React.FC = () => {
  useEffect(() => {
    window.onerror = (
      _event: Event | string,
      _source?: string,
      _lineno?: number,
      _colno?: number,
      error?: Error
    ): any => {
      console.log(error);
    };
  }, []);

  return <FishEye />;
};

export default App;
