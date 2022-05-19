import React from 'react';

const Invoice = ({invoiceDetails}) => {
    

    return (
      <div>
        <h4>Invoice Details</h4>
        <p>Invoice_id: {invoiceDetails.invoice_id}</p>
        <p>Name: {invoiceDetails.name}</p>
        <p>Street: {invoiceDetails.street}</p>
        <p>City: {invoiceDetails.city}</p>
        <p>State: {invoiceDetails.state}</p>
        <p>Zipcode: {invoiceDetails.zipcode}</p>
        <p>Item_type: {invoiceDetails.item_type}</p>
        <p>Item_id: {invoiceDetails.item_id}</p>
        <p>Unit_price: {invoiceDetails.unit_price}</p>
        <p>Quantity: {invoiceDetails.quantity}</p>
        <p>Subtotal: {invoiceDetails.subtotal}</p>
        <p>Tax: {invoiceDetails.tax}</p>
        <p>Processing Fee: {invoiceDetails.processing_fee}</p>
        <p>Total: {invoiceDetails.total}</p>
      </div>
    );
}

export default Invoice;
