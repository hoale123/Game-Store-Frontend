import React from 'react';

export default function Product(props) {
  const { product, onAdd, productType, notify } = props;

  function handleDelete() {
    console.log(product)
    fetch(
      `http://localhost:8080/${productType}/${product.id}`,
      { method: "DELETE" }
    )
      .then(() => notify({ action: "delete", product: product }))
}

const generateCard = (type) => {
  switch(type) {
    case "tshirts":
      return <>
      <h3>{product.size}</h3>
      <div>${product.price}</div>
      <div>{product.color}</div>
      <div>{product.description}</div>
      <div>{product.quantity}</div>
      </>
      // case "consoles"
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
//          "size": "small",
// "color": "red",
// "description": "A lovely red T-shirt",
// "price": 9.99,
// "quantity": 10