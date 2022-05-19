import { Link } from "react-router-dom";
import { Arrow } from "./AssetsExport";
import axios from "axios";

const NavLinks = () => {
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;
      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert(" Razorpay SDK failed to load. Are you online ?");
      return;
    }

    const data = await axios({
      url: "http://localhost:5000/api/auth/razorpay",
      method: "POST",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3ODA5OTA4N2U2MTYyM2I0MjcxZDAzIn0sImlhdCI6MTY1MjgxNDE4NywiZXhwIjoxNjUyOTAwNTg3fQ.lBoC6UBvuUZrP8x0-hojLYJLHD3AAypk5XNdtcNTueY",
      },
    });

    var options = {
      key: "rzp_test_jYGQkS5FS8PAwV",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "React Dontation",
      description: "Test React Donation",

      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Gaurav Kumar",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="relative z-10 flex flex-col gap-10 mx-6 lg:flex-row lg:gap-20 lg:mx-8">
      <Link to="/leaderboard">
        <span className="py-5 cursor-pointer">Leaderboard</span>
      </Link>
      <Link to="/">
        <span className="py-5 cursor-pointer">Rules</span>
      </Link>
      <Link to="/">
        <span className="py-5 cursor-pointer">Payments</span>
      </Link>
      {/* <Link> */}
      <button className="py-5 cursor-pointer" onClick={displayRazorpay}>
        Tickets
      </button>
      {/* </Link> */}
      <Link to="/">
        <button className="flex items-center justify-between px-3 py-2 font-semibold cursor-pointer rounded-2xl md:px-6 md:py-2 bg-hot-pink">
          <span className="mr-1">SignIn</span>
          <img src={Arrow} alt="arrow" />
        </button>
      </Link>
    </div>
  );
};

export default NavLinks;
