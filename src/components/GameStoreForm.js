import React, { useState } from 'react'

const GameStoreForm = ({ product: intitalProduct, notify,productType }) => {
  const [product, setProduct] = useState(intitalProduct);
  const isAdd = intitalProduct.size === "";

  function handleChange(evt) {
    const clone = { ...product };
    clone[evt.target.name] = evt.target.value;
    setProduct(clone);
}

      function handleSubmit(evt) {
        evt.preventDefault();

        const url = isAdd ? `https://gamestore-backend.herokuapp.com/${productType}` : `https://gamestore-backend.herokuapp.com/${productType}/${product.id}`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = isAdd ? 201 : 204;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(product)
        };

        fetch(url, init)
        .then(response => {
            if (response.status === expectedStatus) {
                if (isAdd) {
                    return response.json();
                } else {
                    return product;
                }
            }
            return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
        })
        .then(result => notify({
            action: isAdd ? "add" : "edit",
            product: result
        }))

      }
  return (
  <div>
  <div>GameStoreForm</div>
  <h1>{product.id > 0 ? "Edit" : "Add"} product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="size">size</label>
                    <input type="text" id="size" name="size"
                        className="form-control"
                        value={product.size} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price">price</label>
                    <input type="text" id="price" name="price"
                        className="form-control"
                        value={product.price} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="color">color</label>
                    <input type="text" id="color" name="color"
                        className="form-control"
                        value={product.color} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description">description</label>
                    <input type="text" id="description" name="description"
                        className="form-control"
                        value={product.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity">quantity</label>
                    <input type="text" id="quantity" name="quantity"
                        className="form-control"
                        value={product.quantity} onChange={handleChange} />
                </div>

                
                <div className="mb-3">
                    <button className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "cancel" })}>Cancel</button>
                </div>
                </form>
  </div>
  )
}

export default GameStoreForm

