import React from "react";

const Input = ({
    type,
    className,
    formValue,
    formState,
    setValue,
    name,
    label,
}) => {
    return (
        <div className="relative my-5">
            <input
                type={type}
                className={
                    `${
                        type === "checkbox"
                            ? "shadow-md checked:shadow-xl"
                            : "block px-2.5 pb-2.5 pt-8 w-full text-sm font-bold text-gray-900 bg-transparent rounded-sm border-2 border-white appearance-none dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-xl"
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
                placeholder={""}
                id="outlined"
            />
            <label
                htmlFor="outlined"
                className={`${
                    type === "checkbox"
                        ? "text-white ml-3"
                        : "absolute text-lg text-gray-500 dark:text-white duration-300 transform -translate-y-0 scale-75 top-5 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 text-white uppercase font-semibold"
                }`}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
