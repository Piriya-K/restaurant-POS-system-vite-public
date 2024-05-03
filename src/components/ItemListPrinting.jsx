import React from "react";

const ItemListPrinting = React.forwardRef(({ itemlist, table }, ref) => {
  const sumValue = itemlist.reduce((value, item) => {
    return value + item.value;
  }, 0);

  const date = new Date();

  return (
    <>
      <div ref={ref} className="mt-10 flex justify-center">
        <div className="w-[80%] border border-black border-solid">
          <div className="font-semibold bg-gray-300 w-full flex justify-center border-b border-black border-solid">
            <span>Table: {table.tableNum}</span>
          </div>
          <div className="flex flex-row justify-around font-semibold border-b border-black border-solid">
            <p>Item</p>
            <p>Quantity</p>
            <p>Price</p>
            <p>Value</p>
          </div>
          <div>
            <ul>
              {itemlist.map((item, index) =>
                item.quantity >= 1 ? (
                  <li className="grid grid-cols-4 my-2 text-center" key={index}>
                    <div>{item.name}</div>
                    <div>{item.quantity}</div>
                    <div>${item.price}</div>
                    <div>${item.value}</div>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          <div className="px-10 py-2 border-t border-black border-solid">
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
