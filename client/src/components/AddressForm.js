import React from "react";

export default ({
  type = "billing",
  errors,
  handleChange,
  values,
  touched,
}) => {
  const textFieldsTypes = [
    { name: "street", placeholder: "street" },
    { name: "apartment", placeholder: "apartment" },
    { name: "zip", placeholder: "zipCode" },
    { name: "country", placeholder: "country" },
  ];

  return (
    <div className="address-form">
      <div className="input-group ">
        <div className="input-wrapper">
          <label>name</label>
          <input
            type="text"
            name={`${type}.name`}
            value={values[type].name}
            onChange={handleChange}
          />
        </div>
        <div className="input-wrapper">
          <label>lastName</label>
          <input
            type="text"
            name={`${type}.lastname`}
            value={values[type].lastname}
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
