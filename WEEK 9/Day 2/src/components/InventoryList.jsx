import { useSelector } from 'react-redux';
import RemoveProduct from './RemoveProduct.jsx';
import UpdateQuantity from './UpdateQuantity.jsx';

export default function InventoryList() {
  const products = useSelector((state) => state.inventory.products);

  if (products.length === 0) {
    return <p className="inventory-empty">No products yet. Add your first item above.</p>;
  }

  return (
    <ul className="inventory-list" aria-label="Store inventory">
      {products.map((product) => (
        <li className="inventory-item" key={product.id}>
          <div className="inventory-product">
            <span className="inventory-product-name">{product.name}</span>
            <span className="inventory-stock">
              {product.quantity} {product.quantity === 1 ? 'unit' : 'units'}
            </span>
          </div>
          <UpdateQuantity product={product} />
          <RemoveProduct productId={product.id} productName={product.name} />
        </li>
      ))}
    </ul>
  );
}
