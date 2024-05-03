import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import fetchItemData from "./services/itemData";
import fetchCategoryData from "./services/categoryData";
import Manage from "./pages/Manage";
import Table from "./pages/Table";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const Appcontext = React.createContext();

function App() {
  //for useContext

  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]);
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
  );
  const [user, setUser] = useState(userToken ? jwtDecode(userToken) : null);
  const [filteredItemList, setFilteredItemList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState(
    user ? `${import.meta.env.VITE_API_URL}images/${user.imageFile}` : null
  );
  const [table1, setTable1] = useState({
    tableNum: 1,
    itemlist:
      (localStorage.tables &&
        JSON.parse(localStorage.tables).table1 &&
        JSON.parse(localStorage.tables).table1.itemlist) ||
      [],
  });
  const [table2, setTable2] = useState({
    tableNum: 2,
    itemlist:
      (localStorage.tables &&
        JSON.parse(localStorage.tables).table2 &&
        JSON.parse(localStorage.tables).table2.itemlist) ||
      [],
  });

  const [tables, setTables] = useState({ table1, table2 });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const categoryData = await fetchCategoryData();
      const itemData = await fetchItemData();
      // const tablesData = await getTableData();

      setCategory(categoryData);
      setItem(itemData);
    };

    const checkTokenExp = () => {
      if (userToken) {
        try {
          const decoded = jwtDecode(userToken);
          const tokenExpTime = decoded.exp * 1000;
          // console.log(`exp vs now is ${decoded.exp * 1000} vs ${Date.now()}`);
          if (tokenExpTime < Date.now()) {
            setUser(null);
            localStorage.removeItem("userToken");
            navigate(`/login`);
          }
        } catch (err) {
          console.err(err);
        }
      } else {
        navigate(`/login`);
      }
    };

    // Check token expiration every 10 seconds
    const tokenExpInterval = setInterval(checkTokenExp, 60000);

    fetchData();

    /* Add table instances to localStorage */
    localStorage.setItem("tables", JSON.stringify(tables));

    return () => clearInterval(tokenExpInterval);
  }, [userToken]);

  const NotFound = () => {
    return <div>404 - Not Found</div>;
  };

  return (
    <Appcontext.Provider
      value={{
        category,
        setCategory,
        item,
        setItem,
        categoryName,
        setCategoryName,
        filteredItemList,
        setFilteredItemList,
        user,
        setUser,
        imageFile,
        setImageFile,
        table1,
        setTable1,
        table2,
        setTable2,
        userToken,
        setUserToken,
        tables,
        setTables,
      }}
    >
      <Routes>
        <Route exact path="/" element={<Table />} />
        <Route exact path="/order" element={<Table />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Appcontext.Provider>
  );
}

export default App;
