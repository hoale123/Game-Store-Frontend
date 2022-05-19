import React from 'react';
import Product from './Product';

export default function Main(props) {
  const { products, onAdd, productType,notify } = props;
  return (
    <main className="block col-2">
      <h2>Products</h2>
      <div className="row">
        {products.length == 0 && <p>There are no products matching your filters.  Please reset your filters or add a product.</p>}
        {products.map((product) => (
          <Product key={product.id} product={product} onAdd={onAdd} productType={productType} notify={notify}></Product>
        
        ))}
      </div>
    </main>
  );
}