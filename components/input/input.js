import React from "react";

export default React.forwardRef(
  ({ handler, className, type, name, placeholder, required, color }, ref) => {
    return (
      <input
        onChange={handler}
        className={`appearance-none p-2 pl-3 my-3 rounded-sm focus:outline-none focus:ring-2 ${
          color ? `focus:ring-${color}-500` : "focus:ring-black"
        } focus:border-transparent ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    );
  }
);
