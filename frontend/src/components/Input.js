import React from "react";

import "./Input.css";

const Input = ({
    type,
    className,
    formValue,
    formState,
    setValue,
    name,
    label,
    Placeholder,
}) => {
    return (
        <div className="relative my-5">
            <input
                type={type}
                className={
                    `${
                        type === "checkbox"
                            ? "shadow-md checked:shadow-xl"
                            : "block px-2.5 pb-2.5 pt-10 w-full text-2xl font-bold text-gray-900 bg-[#5400C2] placeholder:text-white placeholder:opacity-60 rounded-sm border-2 border-white dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    }` + className
                }
                value={formValue}
                name={name}
                onChange={(e) => {
                    const { name, type, value, checked } = e.target;
                    setValue({
                        ...formState,
                        [name]: type === "checkbox" ? checked : value,
                    });
                }}
                placeholder={Placeholder}
            />
            <label
                htmlFor="outlined"
                className={`${
                    type === "checkbox"
                        ? "text-white ml-3"
                        : "absolute text-lg text-gray-500 dark:text-white duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] px-2 text-white uppercase font-semibold"
                }`}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
