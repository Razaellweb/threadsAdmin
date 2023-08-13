import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function saveDataWithTimestamp(key, data) {
    const timestamp = new Date().getTime();
    const dataWithTimestamp = {
      timestamp: timestamp,
      data: data
    };
    localStorage.setItem(key, JSON.stringify(dataWithTimestamp));
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (username == "threadsandtextiles" && password == "obaloluwa28") {
      saveDataWithTimestamp("users", "threadsandtextile")
      window.location = "/"
    } else if (username == "threadsandtextiles" && password !== "obaloluwa28") {
      alert("incorrect password")
    }  else if (username !== "threadsandtextiles" && password == "obaloluwa28") {
      alert("incorrect username")
    } else {
      alert("Incorrect credentials")
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Admin Login</h1>
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width:100 }}>
        Login
      </button>
    </div>
  );
};

export default Login;
