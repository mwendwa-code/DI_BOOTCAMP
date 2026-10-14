import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '../../Exercise xp ninja.js';

export default function UpdateQuantity({ product }) {
  const [quantity, setQuantity] = useState(String(product.quantity));
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const parsedQuantity = Number(quantity);

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 0) return;

    dispatch(updateQuantity({ id: product.id, quantity: parsedQuantity }));
  }

  return (
    <form className="quantity-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor={`quantity-${product.id}`}>
        Quantity for {product.name}
      </label>
      <input
        id={`quantity-${product.id}`}
        type="number"
        min="0"
        step="1"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        required
      />
      <button type="submit">Update</button>
    </form>
  );
}
