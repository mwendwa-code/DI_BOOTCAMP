import { useState } from 'react';
import Garage from './Garage.jsx';

function Car({ carInfo }) {
  const [color] = useState('red');

  return (
    <div className="demo-content">
      <p className="demo-line">This car is <strong>{color} {carInfo.model}</strong>.</p>
      <Garage size="small" />
    </div>
  );
}

export default Car;