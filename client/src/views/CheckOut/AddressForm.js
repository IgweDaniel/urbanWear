import React from "react";

export default ({
  type = "shipping",
  errors,
  handleChange,
  values,
  touched,
}) => {
  const textFieldsTypes = ["street", "apartment", "zipCode", "country"];

  return (
    <div className="address-form">
      {textFieldsTypes.map((field) => (
        <div className={`input-wrapper ${field}`} key={field}>
          <label>{field}</label>
          <input
            // placeholder={field}
            type="text"
            name={`${type}.${field}`}
            value={values[type][field]}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
};
