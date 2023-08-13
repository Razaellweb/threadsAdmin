import React, { useState } from 'react';
import "./form.css";

const ProductForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [products, setProducts] = useState([{ name: '', quantity: '', price: '' }]);

  const handleProductNameChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].name = value;
    setProducts(updatedProducts);
  };

  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = value;
    setProducts(updatedProducts);
  };

  const handlePriceChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].price = value;
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: '', quantity: '', price: '' }]);
  };

  
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
      company: name,
      address: phoneNumber,
      zip: address,
      city: address,
      country: "Nigeria",
      // "custom1": "custom value 1",
      // "custom2": "custom value 2",
      // "custom3": "custom value 3"
    },
    information: {
      // Invoice number
      number: "2023.0001",
      // Invoice data
      date: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    products: products.map((product) => {
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
    alert("please wait a few seconds for your invoice to download")
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
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

  return (
    <div className='newProduct'>
      <h2 className='addProductTitle'>New Invoice</h2>
      <label>
        Customer's Name:
        <input type="text" className='inpt' value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Customer's Address:
        <input type="text" className='inpt' value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <br />
      <label>
        Customer's Phone Number:
        <input type="text" className='inpt' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <br />
      <h3>Products</h3>
      {products.map((product, index) => (
        <fieldset key={index} className='addProductItem'>
          <label>
            Product Name:
            <input
              type="text"
              value={product.name}
              onChange={(e) => handleProductNameChange(index, e.target.value)}
            />
          </label>
          <br />
          <label>
            Quantity:
            <input
              type="text"
              value={product.quantity}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="text"
              value={product.price}
              onChange={(e) => handlePriceChange(index, e.target.value)}
            />
          </label>
          <br />
        </fieldset>
      ))}
      <button onClick={handleAddProduct} className='addProductButton'>Add Product</button>
      <br /><br/>
      <button className='addProductButtond' onClick={createInvoice}>Create Invoice</button>
    </div>
  );
};

export default ProductForm;
