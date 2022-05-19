import React, { useState } from "react";
import InvoiceForm from "./InvoiceForm";

import Invoice from "./Invoice"

function CartContainer(props) {
  const [personalInfo, setPersonalInfo] = useState({});

  const { cartItems, onAdd, onRemove, productType, setInvoiceDetails, invoiceDetails } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const generateInvoice = () => {
    console.log("submitted");
    console.log(cartItems);
    console.log(personalInfo);

    let type = productType.charAt(0).toUpperCase() + productType.slice(1);

    if (type == "Tshirts") {
      type = "T-shirts"
    }

    let invoiceInput = {
      ...personalInfo,
      quantity: cartItems[0].qty,
      item_type: type,
      unit_price: cartItems[0].price,
      item_id: cartItems[0].id,
      invoice_id: 1
    };

    console.log(JSON.stringify(invoiceInput));

    console.log(invoiceInput)

    fetch(`http://localhost:8080/invoices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceInput),
    })
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        setInvoiceDetails(d);
      })
      .catch((e) => console.error(e));
  };

  return (
    <aside className="block col-1">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{" "}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            <div className="col-2 text-right">
              {item.qty} x ${item.price.toFixed(2)}
            </div>
          </div>
        ))}

        <InvoiceForm
          setPersonalInfo={setPersonalInfo}
          personalInfo={personalInfo}
        />
        {cartItems.length !== 0 && (
          <>
            {/* <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
            </div> */}
            {/* <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
            </div> */}
            {/* <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
                ${shippingPrice.toFixed(2)}
              </div>
            </div> */}

            {/* <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr /> */}
            <div className="row">
              <button onClick={generateInvoice}>Checkout</button>
            </div>
          </>
        )}
      </div>
      {invoiceDetails.invoice_id && <Invoice  invoiceDetails={invoiceDetails}/>}
    </aside>
  );
}

export default CartContainer;
