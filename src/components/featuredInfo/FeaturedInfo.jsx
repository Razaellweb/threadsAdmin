import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [perc1, setPerc1] = useState(0);
  const [perc2, setPerc2] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch { }
    };
    getIncome();
  }, []);

  useEffect(() => {
    const getSales = async () => {
      const res = await userRequest.get("orders");
      const data = res.data
      var sales = 0;
      for (let i = 0; i < data.length; i++) {
        sales = (sales * 1) + (data[i].amount)
      }
      setPerc1(sales)
    }
    getSales();
  }, []);

  useEffect(() => {
    const getSales = async () => {
      const res = await userRequest.get("products");
      const data = res.data
      var sales = 0;
      for (let i = 0; i < data.length; i++) {
        sales = (sales * 1) + (data[i].price)
      }
      setPerc2(sales)
    }
    getSales();
  }, []);


  

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₦{income[1]?.total.toLocaleString()}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon positive" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{"₦" + perc1.toLocaleString()}</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowUpward className="featuredIcon positive" />
          </span>
        </div>
        <span className="featuredSub">Total money received</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{"₦" + perc2.toLocaleString()}</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Cost of total stock</span>
      </div>
    </div>
  );
}
