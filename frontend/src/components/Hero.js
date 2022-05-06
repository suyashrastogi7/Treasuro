import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../features/sampleSlice";

const Hero = () => {
  const { count } = useSelector((state) => state.sample);
  const dispatch = useDispatch();

  return (
    <div className="text-white bg-lime-400 text-center py-3 font-medium">
      <p>Hello Treasuro</p>
      <span>{count ?? 0}</span>
      <button
        onClick={() => dispatch(add())}
        className="border-2 border-solid border-blue-500 mx-4 text-blue-500"
      >
        Add Num
      </button>
    </div>
  );
};

export default Hero;
