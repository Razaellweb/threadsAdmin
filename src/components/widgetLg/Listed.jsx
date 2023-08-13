import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Cancel, ShoppingCartOutlined } from "@material-ui/icons";
import { format } from "timeago.js";
import Each from "./Each";

const Listed = ({ order }) => {
  const [show, setShow] = useState(false);
  const [showz, setShowz] = useState(false);
  const [prod, setProd] = useState(order.products);

  var data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    customize: {
      //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
    },
    images: {
      // The logo on top of your invoice
      logo: "https://th.bing.com/th/id/OIP.aIwnrchUyqICEj-ZuRlPNwAAAA?pid=ImgDet&rs=1",
      // The invoice background
      background: "https://wallpapercave.com/wp/wp2662866.jpg",
    },
    // Your own data
    sender: {
      company: "Threads And Textiles",
      address: "Plot 60 Ejio Rd arigbajo ewekoro L.G.A ogun state",
      zip: "",
      city: "Ewekoro",
      country: "Nigeria",
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    // Your recipient
    client: {
      company: order.name,
      address: order.phoneNumber,
      zip: order.address,
      city: order.address,
      country: "Nigeria",
      // "custom1": "custom value 1",
      // "custom2": "custom value 2",
      // "custom3": "custom value 3"
    },
    information: {
      // Invoice number
      number: "2023.0001",
      // Invoice data
      date: order.createdAt.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    products: order.products.map((product) => {
      const { name, ...rest } = product;
      return { description: name, "tax-rate": 0, ...rest };
    }),
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "Thanks for patronizing Threads And Textiles",
    // Settings to customize your invoice
    settings: {
      currency: "NGN", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
      // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
      // "margin-top": 25, // Defaults to '25'
      // "margin-right": 25, // Defaults to '25'
      // "margin-left": 25, // Defaults to '25'
      // "margin-bottom": 25, // Defaults to '25'
      // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
      // "height": "1000px", // allowed units: mm, cm, in, px
      // "width": "500px", // allowed units: mm, cm, in, px
      // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    translate: {
      // "invoice": "FACTUUR",  // Default to 'INVOICE'
      // "number": "Nummer", // Defaults to 'Number'
      // "date": "Datum", // Default to 'Date'
      // "due-date": "Verloopdatum", // Defaults to 'Due Date'
      // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
      // "products": "Producten", // Defaults to 'Products'
      // "quantity": "Aantal", // Default to 'Quantity'
      // "price": "Prijs", // Defaults to 'Price'
      // "product-total": "Totaal", // Defaults to 'Total'
      // "total": "Totaal", // Defaults to 'Total'
      vat: 0, // Defaults to 'vat'
    },
  };

  //Create your invoice! Easy!
  // var fs = require("fs");
  //Create your invoice! Easy!
  const apiUrl = "https://api.easyinvoice.cloud/v2/free/invoices";

  const createInvoice = async () => {
    alert("Please wait a few seconds for your invoice to get ready")
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
       // console.log("Invoice created successfully:", data.data.pdf);
        const downloadLink = document.createElement("a");
        downloadLink.href = "data:application/pdf;base64," + data.data.pdf;
        downloadLink.download = "convertedPDFFile.pdf";
        downloadLink.click();
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
    //await fs.writeFileSync("invoice.pdf", result.pdf, "base64");
  
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleClosez = () => {
    setShowz(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{"Click Me"}</button>;
  };

  const seeProducts = () => {
    setShowz(true);
    setShow(false);
    // console.log(prod);
    alert(prod[0].name);
  };

  return (
    <tr className="widgetLgTr" key={order._id}>
      <td className="widgetLgUser">
        <span className="widgetLgName">{order.name}</span>
      </td>
      <td className="widgetLgDate">{format(order.createdAt)}</td>
      <td className="widgetLgAmount">₦{order.amount.toLocaleString()}</td>
      <td className="widgetLgStatus" onClick={handleShow}>
        <Button type={order.status} />
      </td>
      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>
            <h3>
              Congratulations!!{" "}
              <span style={{ color: "green", fontSize: "smaller" }}>
                {" "}
                Title{" "}
              </span>{" "}
              Has Been Added To Your Cart
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            {" "}
            <span style={{ color: "teal" }}>Customer</span>: {order.name}
          </h5>
          <h5>
            {" "}
            <span style={{ color: "teal" }}>Phone Number</span>:{" "}
            {order.phoneNumber}
          </h5>
          <h5>
            {" "}
            <span style={{ color: "teal" }}>E-mail</span>: {order.email}
          </h5>
          <h5>
            {" "}
            <span style={{ color: "teal" }}>Note</span>: {order.note}
          </h5>
          <h5>
            {" "}
            <span style={{ color: "teal" }}>Address</span>: {order.address}
          </h5>
          <h5>
            {" "}
            <span style={{ color: "teal" }}>Date</span>:{" "}
            {format(order.createdAt)}
          </h5>
          
          <h5>
            {" "}
            <span style={{ color: "teal" }}>Orders</span>:{" "}
            {order.products.map((orde) => (
              <li>{orde.quantity + " " + orde.color + " " + orde.name}</li>
            ))}
          </h5>
          <h5>
            {" "}
            <a style={{ color: "red",textDecoration:"underline", cursor: "pointer" }} href={order.paymentProof}>click to see payment proof</a>
            <br />
            <a style={{ color: "red",textDecoration:"underline", cursor: "pointer" }} onClick={createInvoice}>click to download receipt</a>
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <ShoppingCartOutlined
            style={{ color: "#0b7fab", fontSize: "large" }}
            onClick={() => {}}
          />
          <Cancel
            style={{ color: "red", fontSize: "large" }}
            onClick={handleClose}
          />
        </Modal.Footer>
      </Modal>

      <Modal show={showz}>
        <Modal.Header closeButton onClick={handleClosez}>
          <Modal.Title>
            <h3>
              <span style={{ color: "green", fontSize: "smaller" }}>
                {order.name}
                {" cart items"}
              </span>{" "}
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Each prod={prod} />
        </Modal.Body>
        <Modal.Footer>
          <ShoppingCartOutlined
            style={{ color: "#0b7fab", fontSize: "large" }}
            onClick={() => {}}
          />
          <Cancel
            style={{ color: "red", fontSize: "large" }}
            onClick={handleClosez}
          />
        </Modal.Footer>
      </Modal>
    </tr>
  );
};

export default Listed;
