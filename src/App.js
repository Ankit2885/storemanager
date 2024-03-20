import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './component/Header/Navbar.jsx';
import Home from './component/Home/Home';
import AddItems from './component/AddItems/AddItems.jsx';
import AddProduct from './component/ManageProduct/AddProduct/AddProduct.jsx';
import ManageProduct from './component/ManageProduct/ManageProduct.jsx';
import MainManageProduct from './component/ManageProduct/MainManageProduct.jsx';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add-items" element={<AddItems />} />
          <Route exact path="/manage" element={<MainManageProduct />}>
            <Route index element={<ManageProduct />} />
            <Route path="manage-product" element={<ManageProduct />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>
          {/* <Route exact path="/solid-item" element={<Soliditem />} /> */}
          {/* <Route exact path="/billing" element={<Billing />} /> */}

          {/* nested routing  */}
          {/* <Route exact path="/lead" element={<PrivateRoute><MainLead /></PrivateRoute>}>
            <Route index element={<FindLeads />} />
            <Route path="find-leads" element={<FindLeads />} />
            <Route path="manage-leads" element={<ManageLeads />} />
            <Route path="add-leads" element={<AddLeads />} />
            <Route path="contact-leads" element={<ContactLeads />} />
            <Route path="create-contact-leads" element={<CreateContactLead />} />
            <Route path="ai-email" element={<AiEmail />} />
            <Route path="create-ai-emails" element={<CreateAIEmail />} />
          </Route> */}

        </Routes>
      </Router>
    </>
  );
}

export default App;
