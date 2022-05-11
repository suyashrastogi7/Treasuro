import React from "react";

const TitleDash = ({ title = "Hello", isTop, isYellow, ...props }) => {
  return (
    <p
      className={`relative tracking-widest text-sm text-white font-bold uppercase w-max
          before:absolute 
          ${!isTop && "before:-bottom-[8px]"} 
          ${isTop && "before:-top-[8px]"} 
          before:w-[28px] before:h-[5px] before:${
            isYellow ? "bg-yellow" : "bg-hot-pink"
          } before:rounded
         `}
      {...props}
    >
      {title}
    </p>
  );
};

export default TitleDash;
