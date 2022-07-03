import React from "react";
const Detail = ({ name, value }) => {
    return (
        <h1 className="text-white text-xl font-semibold">
            {name} :{" "}
            <span className="text-white text-lg font-normal">{value}</span>
        </h1>
    );
};

export default Detail;
