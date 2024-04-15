import React from "react";

const ItemListPrinting = React.forwardRef(({ itemlist, table }, ref) => {
  const sumValue = itemlist.reduce((value, item) => {
    return value + item.value;
  }, 0);

  const date = new Date();

  return (
    <>
      <div ref={ref}>
        <div className="font-semibold bg-gray-300 w-full flex justify-center">
          <span>Table: {table.tableNum}</span>
        </div>
        <div className="flex flex-row justify-around font-semibold">
          <p>Item</p>
          <p>Quantity</p>
          <p>Price</p>
          <p>Value</p>
        </div>
        <div>
          <ul className="">
            {itemlist.map((item, index) =>
              item.quantity >= 1 ? (
                <li className="grid grid-cols-4 mt-2 text-center" key={index}>
                  <div>{item.name}</div>
                  <div>{item.quantity}</div>
                  <div>${item.price}</div>
                  <div>${item.value}</div>
                </li>
              ) : null
            )}
          </ul>
        </div>
        <div className="px-10 pt-10">
          <span>Total: ${sumValue.toFixed(2)}</span>
          <br />
          <span>{`Printed On: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</span>
        </div>
      </div>
    </>
  );
});

export default ItemListPrinting;
