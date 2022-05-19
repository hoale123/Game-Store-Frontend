import { type } from '@testing-library/user-event/dist/type';
import React from 'react';

export default function Product(props) {
  const { product, onAdd, productType, notify } = props;

  function handleDelete() {
    console.log(product)
    fetch(
      `https://gamestore-backend.herokuapp.com/${productType}/${product.id}`,
      { method: "DELETE" }
    )
      .then(() => notify({ action: "delete", product: product }))
}

const generateCard = (type) => {
  switch(type) {
    case "tshirts":
      return <>
      <h3>Size: {product.size}</h3>
      <div>Color: {product.color}</div>
      <div>Description: {product.description}</div>
      <div>Price: ${product.price}</div>
      <div>Quantity: {product.quantity}</div>
      </>
      case "consoles":
        return<>
        <h3>Model:{product.model}</h3>
        <div>Manufacturer: {product.manufacturer}</div>
        <div>Memory: {product.memory_amount}</div>
        <div>Processor: {product.processor}</div>
        <div>Price: ${product.price}</div>
        <div>Quantity: {product.quantity}</div>
        </>
      case "games":
        console.log(product)
        return<>
        <h3>Title: {product.title}</h3>
        <div>EsrbRating: {product.esrbRating}</div>
        <div>Description: {product.description}</div>
        <div>Studio: {product.studio}</div>
        <div>Price: ${product.price}</div>
        <div>Quantity: {product.quantity}</div>
        </>
  }
} 



  return (
    <div>
      <img className="small" src={product.image} alt={product.name} />
      {generateCard(productType)}

      <div>
        <button onClick={() => onAdd(product)}>Add To Cart</button>
        <button
        id='deleteButton'
        className='delete Btn'
        type='button'
        onClick={handleDelete}
        >Delete
        </button>
        <button
        id='editButton'
        className='Edit Btn'
        type='button'
        onClick={() => notify({action: "edit-form", product:product})}
        >Edit
        </button>
      </div>
    </div>
  );
}
