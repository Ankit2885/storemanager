import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './component/Header/Navbar.jsx';
import Home from './component/Home/Home';
import AddItems from './component/AddItems/AddItems.jsx';
import AddProduct from './component/ManageProduct/AddProduct/AddProduct.jsx';
import ManageProduct from './component/ManageProduct/ManageProduct.jsx';
import MainManageProduct from './component/ManageProduct/MainManageProduct.jsx';
import HeaderAlert from './component/CommonComponent/HeaderAlert.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { removeAlert, setAlert } from './Redux/Actions/HeaderAlertAction.jsx';
import ImageEditor from './component/Fabric/ImageEditor/ImageEditor.jsx';

function App() {

  const dispatch = useDispatch()
  const alert = useSelector(state => state.alert)

  useEffect(() => {
    if (alert && alert.message !== "") {
      setTimeout(() => {
        dispatch(removeAlert())
      }, 4000);
    }
  }, [alert, dispatch])

  return (
    <>
      <Router>
        <HeaderAlert />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add-items" element={<AddItems />} />
          <Route exact path="/manage" element={<MainManageProduct />}>
            <Route index element={<ManageProduct />} />
            <Route path="manage-product" element={<ManageProduct />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>
          <Route exact path="fabric" element={<ImageEditor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;