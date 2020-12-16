import React from "react";

export default ({ type = "billing", errors, handleChange, values }) => {
  const fields = ["street", "apartment", "zip_code", "country"];
  return (
    <div className="address-form">
      <div className="input-group ">
        <div className="input-wrapper">
          <label>name</label>
          <input
            type="text"
            name={`${type}.name`}
            value={values.name}
            onChange={handleChange}
          />
          {errors && errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="input-wrapper">
          <label>lastName</label>
          <input
            type="text"
            name={`${type}.lastname`}
            value={values.lastname}
            onChange={handleChange}
          />
          {errors && errors.lastname && (
            <p className="error">{errors.lastname}</p>
          )}
        </div>
      </div>
      {fields.map((field) => (
        <div className={`input-wrapper ${field}`} key={field}>
          <label>{field}</label>
          <input
            type="text"
            name={`${type}.${field}`}
            value={values[field]}
            onChange={handleChange}
          />
          {errors && errors[field] && <p className="error">{errors[field]}</p>}
        </div>
      ))}
    </div>
  );
};
