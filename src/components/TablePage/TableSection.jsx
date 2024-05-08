import React, { useState } from "react";

const TableSection = ({ clickTable, table1, table2 }) => {
  const [tables, setTables] = useState([
    {
      _id: {
        $oid: "662d57e33c9f9478318cd001",
      },
      Table: 1,
      Flag: true,
    },
    {
      _id: {
        $oid: "662d57e33c9f9478318cd002",
      },
      Table: 2,
      Flag: false,
    },
    {
      _id: {
        $oid: "662d57e33c9f9478318cd003",
      },
      Table: 3,
      Flag: false,
    },
  ]);
  const handleTableClick = (e) => {
    const table = e.target.value;
    clickTable(table);
  };

  return (
    <>
      <div className="tablesection-div1">
        <div id="table" className="tablesection-div2">
          {/* {tables.map((table) => (
            <>
              <button
                className="panel-button-blue rounded-md h-fit"
                value="T1"
                draggable="true"
                onClick={(e) => handleTableClick(e)}
              >
                {table.Table}
              </button>
            </>
          ))} */}

          <button
            className="tablesection-btn"
            value="T1"
            draggable="true"
            onClick={(e) => handleTableClick(e)}
          >
            TABLE 1
          </button>
          <div className="self-center">
            {table1.itemlist.length !== 0 || undefined ? (
              <span className="text-red-300">Occupied</span>
            ) : (
              <span className="text-green-500">Available</span>
            )}
          </div>
        </div>
        <div id="table" className="tablesection-div2">
          <button
            className="tablesection-btn"
            value="T2"
            draggable="true"
            onClick={(e) => handleTableClick(e)}
          >
            TABLE 2
          </button>
          <div className="self-center">
            {table2.itemlist.length !== 0 || undefined ? (
              <span className="text-red-300">Occupied</span>
            ) : (
              <span className="text-green-500">Available</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TableSection;
