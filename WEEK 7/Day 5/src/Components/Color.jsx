import { useEffect, useState } from 'react';

function Color() {
  const [favoriteColor, setFavoriteColor] = useState('red');

  useEffect(() => {
    window.alert('useEffect reached');
  }, []);

  const changeColor = () => setFavoriteColor('blue');

  return (
    <div className="demo-content">
      <p className="demo-line">
        My favorite color is <strong className={`color-value ${favoriteColor}`}>{favoriteColor}</strong>.
      </p>
      <button className="action-button" onClick={changeColor} type="button">
        Change color
      </button>
    </div>
  );
}

export default Color;