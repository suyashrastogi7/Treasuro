import React from "react";
import Lottie from "react-lottie";

import { loaderAnimationData } from "./AssetsExport";

const Loader = ({ loading }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loaderAnimationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return loading ? (
        <div
            className="fixed z-50 h-full w-full top-0 left-0"
            style={{ backdropFilter: "blur(5px)" }}
        >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Lottie options={defaultOptions} height={400} width={400} />
            </div>
        </div>
    ) : null;
};

export default Loader;
