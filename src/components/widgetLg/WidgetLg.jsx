import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import Listed from "./Listed";
import { format } from "timeago.js"
import { Modal } from 'react-bootstrap';
import { Cancel, ShoppingCartOutlined } from "@material-ui/icons";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);


  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch { }
    };
    getOrders();
  }, []);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  const handleClose = () => {
    setShow(false)
  };

  const handleShow = () => {
    setShow(true)
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Details</th>
        </tr>
        {orders.reverse().map((order) => (
          <Listed order={order}/>
        ))}
      </table>
      
    </div>
  );
}
