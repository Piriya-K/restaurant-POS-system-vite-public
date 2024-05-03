import React from "react";

const RightPanel = React.forwardRef(({ itemlist, onQuantityClick }, ref) => {
  const setQuantity = (index, newQuantity) => {
    onQuantityClick(index, newQuantity);
  };

  const removeItemFromList = (index) => {
    onQuantityClick(index);
  };

  const sumValue = itemlist.reduce((value, item) => {
    return value + item.value;
  }, 0);

  return (
    <div className="shadow-md shadow-slate-600 rounded-md bg-white">
      <div className="text-left font-semibold bg-gray-300 w-full rounded-t-md flex justify-between">
        <span>Total: ${sumValue.toFixed(2)}</span>
      </div>
      <div className="grid grid-cols-5 text-center font-semibold">
        <p className="col-span-2">Item</p>
        <p>Quantity</p>
        <p>Price</p>
        <p>Value</p>
      </div>
      <div>
        <ul className="overflow-y-scroll h-[55dvh]">
          {itemlist.map((item, index) =>
            item.quantity >= 1 ? (
              <li className="grid grid-cols-5 mt-2 text-center odd:bg-gray-100" key={index}>
                <div className="col-span-2">{item.name}</div>
                <div className="flex flex-row  bg-gray-600 rounded-md">
                  <button
                    className="w-1/3  text-white"
                    onClick={() => {
                      let newQuantity = item.quantity - 1;
                      if (newQuantity > 0) {
                        setQuantity(index, newQuantity);
                      } else removeItemFromList(index);
                    }}
                  >
                    -
                  </button>
                  <span className="w-1/3 bg-white">{item.quantity}</span>
                  <button
                    className="w-1/3 text-white"
                    onClick={() => {
                      let newQuantity = item.quantity + 1;
                      if (newQuantity > 0) {
                        setQuantity(index, newQuantity);
                      } else removeItemFromList(index);
                    }}
                  >
                    +
                  </button>
                </div>
                <div>${item.price}</div>
                <div>${item.value}</div>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
});

export default RightPanel;
