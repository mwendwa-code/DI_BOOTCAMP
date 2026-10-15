import { useSelector } from 'react-redux';
import AddProduct from './AddProduct.jsx';
import InventoryList from './InventoryList.jsx';

export default function Inventory() {
  const products = useSelector((state) => state.inventory.products);

  return (
    <section className="inventory-section" aria-labelledby="inventory-heading">
      <div className="inventory-heading">
        <div>
          <p className="eyebrow">Store management</p>
          <h2 id="inventory-heading">Inventory</h2>
        </div>
        <span className="task-count" aria-live="polite">
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </span>
      </div>
      <AddProduct />
      <InventoryList />
    </section>
  );
}
