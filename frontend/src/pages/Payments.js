import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Template from "../components/Template";
import TitleDash from "../components/TitleDash";

import {
    gpay,
    paytm,
    scantopay,
    Weed1Yellow,
    Arrow,
} from "../components/AssetsExport";

async function loadSDK() {
    return new Promise(function (resolve) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
    });
}

const Payments = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState({
        paytm: false,
        gpay: false,
        qr: false,
    });
    async function displayRazorpay() {
        const res = await loadSDK();
        if (!res) {
            alert("Razorpay SDK failed to load, Are you Online?");
            return;
        }
        let config = {
            headers: {
                Authorization:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMDg3NDU5MjUxZjkyNDRjN2U5ZmY5In0sImlhdCI6MTY1NjAxNTA3NiwiZXhwIjoxNjU2MTAxNDc2fQ.NxKb5Zqz9HLiwEkzRchVVB7tPz6wXm4MwbitFx_3iqw",
            },
        };
        const result = await axios.post(
            "http://localhost:5000/api/payment/createorders",
            config
        );
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_r6FiJfddJh76SI",
            amount: amount.toString(),
            currency: currency,
            name: "Treasuro 2022",
            description: "Ticket Purchase",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                };

                const result = await axios.post(
                    "http://localhost:5000/api/payment/verifypayment",
                    data,
                    config
                );
                if (result.data.success) {
                    //payment success, send to tickets page
                    navigate("/tickets");
                } else {
                    //payment failure, show error page
                    navigate("/error");
                }
            },
            prefill: {
                name: "Soumya Dey",
                email: "SoumyaDey@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <Template>
            <TitleDash title="Payments" />
            <p className="text-white my-7 text-xl">
                Choose payment method below:
            </p>
            <div className="flex justify-around items-center">
                <button
                    className={`${
                        paymentMethod.gpay &&
                        "border-4 border-solid border-[#F911BA] rounded-xl"
                    } shadow-sm transition hover:-translate-y-1 ease-in-out hover:shadow-md`}
                    onClick={(e) =>
                        setPaymentMethod({
                            ...{
                                paytm: false,
                                gpay: false,
                                qr: false,
                            },
                            gpay: true,
                        })
                    }
                >
                    <img
                        className="rounded-xl "
                        src={gpay}
                        alt="Payment Method Gpay"
                    />
                </button>
                <button
                    className={`${
                        paymentMethod.paytm &&
                        "border-4 border-solid border-[#F911BA] rounded-xl"
                    } shadow-sm transition hover:-translate-y-1 ease-in-out hover:shadow-md`}
                    onClick={(e) =>
                        setPaymentMethod({
                            ...{
                                paytm: false,
                                gpay: false,
                                qr: false,
                            },
                            paytm: true,
                        })
                    }
                >
                    <img
                        className="rounded-xl "
                        src={paytm}
                        alt="Payment Method Paytm"
                    />
                </button>
            </div>
            <p className="text-white my-4 text-xl text-center">OR</p>
            <div className="flex justify-center items-center">
                <button
                    className={`${
                        paymentMethod.qr &&
                        "border-4 border-solid border-[#F911BA] rounded-xl"
                    } shadow-sm transition hover:-translate-y-1 ease-in-out hover:shadow-md`}
                    onClick={(e) =>
                        setPaymentMethod({
                            ...{
                                paytm: false,
                                gpay: false,
                                qr: false,
                            },
                            qr: true,
                        })
                    }
                >
                    <img
                        className="rounded-xl "
                        src={scantopay}
                        alt="Payment Method Scan To pay"
                    />
                </button>
            </div>
            <div className="flex justify-end items-end mt-auto h-36">
                <img
                    src={Weed1Yellow}
                    className="absolute bottom-0 left-0"
                    alt="weed"
                />
                <button
                    onClick={() => displayRazorpay}
                    className="flex justify-between items-center cursor-pointer rounded-2xl px-3 py-2 md:px-6 md:py-2 bg-hot-pink font-semibold"
                >
                    <span className="mr-3 text-white">Proceed</span>
                    <img src={Arrow} alt="arrow" />
                </button>
            </div>
        </Template>
    );
};

export default Payments;
