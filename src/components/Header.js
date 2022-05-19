import React from 'react';

export default function Header(props) {
  

  return (
    <header className="block row center">
      <div>
        <a href="#/">
          <h1>Small Shopping Cart</h1>
        </a>
      </div>
      <>
      {/* <button
        style={{width: 100}}
        className="btn btn-primary" 
        type="button" 
        onClick={addClick}
      >
        Add Form
      </button> */}
      </>
      <div>
        <a href="#/cart">
          Cart{' '}
          {props.countCartItems ? (
            <button className="badge">{props.countCartItems}</button>
          ) : (
            ''
          )}
        </a>{' '}
      </div>
    </header>
  );
}
