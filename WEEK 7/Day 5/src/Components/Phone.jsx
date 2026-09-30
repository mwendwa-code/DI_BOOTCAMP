import { useState } from 'react';

function Phone() {
  const [phone, setPhone] = useState({
    brand: 'Samsung',
    model: 'Galaxy S20',
    color: 'black',
    year: 2020
  });

  const changeColor = () => {
    setPhone((currentPhone) => ({ ...currentPhone, color: 'blue' }));
  };

  return (
    <div className="demo-content">
      <p className="demo-line">
        My {phone.brand} {phone.model} is {phone.color} and was made in {phone.year}.
      </p>
      <button className="action-button" onClick={changeColor} type="button">
        Change color
      </button>
    </div>
  );
}

export default Phone;