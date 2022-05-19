import React from 'react';
import Product from './Product';

export default function Main(props) {
  const { setProductType, products, onAdd, productType,notify } = props;
  return (
    <main className="block col-2">
      <h2>{productType.toUpperCase()}</h2>
      <div className="row">
        {products.length == 0 && <p>There are no products matching your filters.  Please reset your filters or add a product.</p>}
        {products.map((product) => (
          <Product key={product.id} setProductType={setProductType} product={product} onAdd={onAdd} productType={productType} notify={notify}></Product>
        
        ))}
      </div>
    </main>
  );
}