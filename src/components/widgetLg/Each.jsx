import React from "react";

const Each = (prod) => {
    console.log(prod.prod)
  return (
    <div>
      {prod.prod.map((orders) => {
        <h5 style={{color: "black"}}>{"ajjj"}</h5>;
      })}
    </div>
  );
};

export default Each;
