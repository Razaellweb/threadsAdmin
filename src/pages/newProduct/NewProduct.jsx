import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const [colorArray, setColorArray] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeArray, setSizeArray] = useState([]);

  const handleColorChange = (event) => {
    event.preventDefault()
    setSelectedColor(event.target.value);
  };

  const handleAddColor = (event) => {
    event.preventDefault()
    if (selectedColor) {
      setColorArray([...colorArray, selectedColor]);
      setSelectedColor("");
    }
  };

  const handleSizeChange = (event) => {
    event.preventDefault()
    setSelectedSize(event.target.value);
  };

  const handleAddSize = (event) => {
    event.preventDefault()
    if (selectedSize) {
      setSizeArray([...sizeArray, selectedSize]);
      setSelectedSize("");
    }
  };

  const handleChange = (e) => {
    e.preventDefault()
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat, color: colorArray, size: sizeArray };
          console.log(product);
          addProduct(product, dispatch);
          alert("Please wait while product creates and wait for page refresh");
          setTimeout(function() {
            window.location = "/"
          }, 10000);
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="sport,native or vintage"
            onChange={handleCat}
          />
        </div>
        <br />
        <div>
          <label htmlFor="color">Select Color: </label>
          <select id="color" value={selectedColor} onChange={handleColorChange}>
            <option value="">Select</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">yellow</option>
            <option value="black">black</option>
            <option value="white">white</option>
            {/* Add more color options as needed */}
          </select>
          <button onClick={handleAddColor} className="addProductButton">Add Color</button>
        </div>
        <br />
        <div>
          <label htmlFor="size">Select Sizes: </label>
          <select id="size" value={selectedSize} onChange={handleSizeChange}>
            <option value="">Select</option>
            <option value="xs">Xs</option>
            <option value="l">L</option>
            <option value="x">X</option>
            <option value="xxl">XXL</option>
            {/* Add more color options as needed */}
          </select>
          <button onClick={handleAddSize} className="addProductButton">Add Size</button>
        </div>
        <br />
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
