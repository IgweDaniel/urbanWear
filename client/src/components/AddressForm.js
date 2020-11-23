import React from "react";

export default ({
  type = "shipping",
  errors,
  handleChange,
  values,
  touched,
}) => {
  const textFieldsTypes = [
    { name: "street", placeholder: "street" },
    { name: "apartment", placeholder: "apartment" },
    { name: "zip", placeholder: "zip" },
    { name: "country", placeholder: "country" },
  ];

  return (
    <div className="address-form">
      <div className="input-group ">
        <div className="input-wrapper">
          <label>name</label>
          <input
            type="text"
            name={`${"shipping"}.name`}
            value={values["shipping"].name}
            onChange={handleChange}
          />
        </div>
        <div className="input-wrapper">
          <label>lastName</label>
          <input
            type="text"
            name={`${"shipping"}.lastname`}
            value={values["shipping"].lastname}
            onChange={handleChange}
          />
        </div>
      </div>
      {textFieldsTypes.map(({ name, placeholder }) => (
        <div className={`input-wrapper ${name}`} key={name}>
          <label>{placeholder}</label>
          <input
            type="text"
            name={`${type}.${name}`}
            value={values[type][name]}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
};
