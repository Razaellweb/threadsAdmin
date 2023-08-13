import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import ProductForm from "./pages/invoice/Form";
import { useSelector } from "react-redux";

function App() {
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <div className="container">
          <Route exact path="/">
            <Sidebar />
            <Home />
          </Route>
          <Route path="/users">
            <Sidebar />
            <UserList />
          </Route>
          <Route path="/createInvoice">
            <Sidebar />
            <ProductForm />
          </Route>
          <Route path="/user/:userId">
            <Sidebar />
            <User />
          </Route>
          <Route path="/newUser">
            <Sidebar />
            <NewUser />
          </Route>
          <Route path="/products">
            <Sidebar />
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Sidebar />
            <Product />
          </Route>
          <Route path="/newproduct">
            <Sidebar />
            <NewProduct />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
