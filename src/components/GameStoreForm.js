import React, { useState } from 'react'

const GameStoreForm = ({ product: intitalProduct, notify,productType }) => {
  const [product, setProduct] = useState(intitalProduct);
  const isAdd = intitalProduct.price === 0;

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
            console.log(init)
            if (response.status === expectedStatus) {
                if (isAdd) {
                    return response.json();
                } else {
                    return product;
                }
            }
        })
        .then(result => notify({
            action: isAdd ? "add" : "edit",
            product: result
        }))
      }


      const generateForm = (type) => {
        switch(type) {
          case "tshirts":
            return <> <form onSubmit={handleSubmit}>
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
            </>
            case "consoles":
              return<>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="model">model</label>
                    <input type="text" id="model" name="model"
                        className="form-control"
                        value={product.model} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="manufacturer">manufacturer</label>
                    <input type="text" id="manufacturer" name="manufacturer"
                        className="form-control"
                        value={product.manufacturer} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="memory_amount">memory_amount</label>
                    <input type="text" id="memory_amount" name="memory_amount"
                        className="form-control"
                        value={product.memory_amount} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="processor">processor</label>
                    <input type="text" id="processor" name="processor"
                        className="form-control"
                        value={product.processor} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price">price</label>
                    <input type="text" id="price" name="price"
                        className="form-control"
                        value={product.price} onChange={handleChange} />
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
              </>
            case "games":
              return<>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title">title</label>
                    <input type="text" id="title" name="title"
                        className="form-control"
                        value={product.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="esrbRating">esrbRating</label>
                    <input type="text" id="esrbRating" name="esrbRating"
                        className="form-control"
                        value={product.esrbRating} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description">description</label>
                    <input type="text" id="description" name="description"
                        className="form-control"
                        value={product.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="studio">studio</label>
                    <input type="text" id="studio" name="studio"
                        className="form-control"
                        value={product.studio} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price">price</label>
                    <input type="text" id="price" name="price"
                        className="form-control"
                        value={product.price} onChange={handleChange} />
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
              </>
        }
      } 
  return (
  <div>
  <div>GameStoreForm</div>
  <h1>{product.id > 0 ? "Edit" : "Add"} {productType}</h1>
  {generateForm(productType)}
  </div>
  )
}

export default GameStoreForm

