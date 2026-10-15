import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../Exercise xp ninja.js';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('0');
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    const parsedQuantity = Number(quantity);

    if (!trimmedName || !Number.isInteger(parsedQuantity) || parsedQuantity < 0) return;

    dispatch(addProduct({ name: trimmedName, quantity: parsedQuantity }));
    setName('');
    setQuantity('0');
  }

  return (
    <form className="inventory-add-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="product-name">Product name</label>
      <input
        id="product-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Product name"
        maxLength={100}
        required
      />
      <label className="visually-hidden" htmlFor="product-quantity">Initial quantity</label>
      <input
        id="product-quantity"
        type="number"
        min="0"
        step="1"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        aria-label="Initial quantity"
        required
      />
      <button type="submit">Add product</button>
    </form>
  );
}
