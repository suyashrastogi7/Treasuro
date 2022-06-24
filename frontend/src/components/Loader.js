import React from "react";
import Lottie from "react-lottie";

import loaderAnimationData from "./AssetsExport/loader";

const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loaderAnimationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <div>
            <Lottie options={defaultOptions} height={400} width={400} />
        </div>
    );
};

export default Loader;
