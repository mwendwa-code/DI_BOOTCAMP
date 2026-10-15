import { useDispatch } from 'react-redux';
import { removeProduct } from '../../Exercise xp ninja.js';

export default function RemoveProduct({ productId, productName }) {
  const dispatch = useDispatch();

  return (
    <button
      className="inventory-remove-button"
      type="button"
      onClick={() => dispatch(removeProduct(productId))}
      aria-label={`Remove ${productName}`}
    >
      Remove
    </button>
  );
}
