const TitleDash = ({
  title = "Hello",
  isTop,
  isYellow,
  className = "",
  ...props
}) => {
  return (
    <p
      className={`relative tracking-widest text-sm md:text-lg lg:text-2xl text-white font-bold md:font-black uppercase min-w-max
          before:absolute 
          ${!isTop && "before:-bottom-[8px] before:md:-bottom-[12px]"} 
          ${isTop && "before:-top-[12px] before:md:-top-[18px]"} 
          before:w-[35px] md:w-[48px] before:h-[6px] before:md:h-[9px] ${
            isYellow ? "before:bg-yellow" : "before:bg-hot-pink"
          } before:rounded ${className}
         `}
      {...props}
    >
      {title}
    </p>
  );
};

export default TitleDash;
