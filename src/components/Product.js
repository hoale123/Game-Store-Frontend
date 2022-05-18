import React from 'react';

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <div>
      <img className="small" src={product.image} alt={product.name} />
      <h3>{product.size}</h3>
      <div>${product.price}</div>
      <div>{product.color}</div>
      <div>{product.description}</div>
      <div>{product.quantity}</div>

      <div>
        <button onClick={() => onAdd(product)}>Add To Cart</button>
      </div>
    </div>
  );
}
//          "size": "small",
// "color": "red",
// "description": "A lovely red T-shirt",
// "price": 9.99,
// "quantity": 10