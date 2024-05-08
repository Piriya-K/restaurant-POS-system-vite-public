import React from "react";

const ItemListPrinting = React.forwardRef(({ itemlist, table }, ref) => {
  const sumValue = itemlist.reduce((value, item) => {
    return value + item.value;
  }, 0);

  const date = new Date();

  return (
    <>
      <div ref={ref} className="div1">
        <div className="div2">
          <div className="div3">
            <span>Table: {table.tableNum}</span>
          </div>
          <div className="div4">
            <p>Item</p>
            <p>Quantity</p>
            <p>Price</p>
            <p>Value</p>
          </div>
          <div>
            <ul>
              {itemlist.map((item, index) =>
                item.quantity >= 1 ? (
                  <li className="list" key={index}>
                    <div>{item.name}</div>
                    <div>{item.quantity}</div>
                    <div>${item.price}</div>
                    <div>${item.value}</div>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          <div className="div5">
            <span>Total: ${sumValue.toFixed(2)}</span>
            <br />
            <span>{`Printed On: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</span>
          </div>
        </div>
      </div>
    </>
  );
});

export default ItemListPrinting;
