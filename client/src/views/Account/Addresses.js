import React, { useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";

const Addresses = styled.div`
  display: flex;
  flex-direction: column;
  .address {
    margin: 20px 0;
  }
  .address .action {
    display: flex;
    align-items: center;
  }

  .button {
    margin-left: auto;
  }

  .address__type {
    font-size: 1.5rem;
  }
  .address .details span {
    display: block;
  }
  .input-wrapper input {
    height: 35px;
  }
  .input-wrapper label {
    text-transform: capitalize;
    font-size: 0.9rem;
  }

  .input-wrapper {
    margin: 10px 0;
  }
  .zip {
    width: 30%;
  }

  .button.submit {
    /* width: 50%; */
    margin: 20px 0;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    .address {
      margin: 0;
      width: 48%;
    }
  }
`;

const billingAddress = {
  name: "daniel",
  lastname: "",
  street: "Bayowa Street",
  apartment: "12",
  zipCode: "",
  country: "",
};

export default () => {
  const [isEditingAddress, HasEditAddress] = useState(false);

  function updateBilling(values, cb) {
    console.log(values);
    setTimeout(() => {
      cb(false);
    }, 2000);

    // HasEditAddress(false);
  }

  function handleValidation(values) {
    const errors = {};
    if (!values.name) {
      errors.name = "Email address is required";
    }
    return errors;
  }
  return (
    <Addresses>
      <div className="address">
        {!isEditingAddress && (
          <div className="action">
            <h3 className="address__type">Billing Address</h3>
            <button className="button" onClick={() => HasEditAddress(true)}>
              {billingAddress ? "edit" : "add"}
            </button>
          </div>
        )}

        {!isEditingAddress && billingAddress && (
          <div className="details">
            {Object.keys(billingAddress).map((key) => (
              <span key={key}>{billingAddress[key]}</span>
            ))}
          </div>
        )}
        {isEditingAddress && (
          <UpdateAddress
            initialValues={billingAddress}
            handleUpdate={updateBilling}
            validate={handleValidation}
          />
        )}
      </div>
      <div className="address">
        <div className="action">
          <h3 className="address__type">Shipping Address</h3>
          <button className="button">add</button>
        </div>
      </div>
    </Addresses>
  );
};

function UpdateAddress({ handleUpdate, initialValues, validate }) {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { setSubmitting }, errors) => {
          handleUpdate(values, setSubmitting);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
        }) => (
          <form>
            <div className="input-wrapper">
              <label htmlFor="name">name</label>
              {touched.name && errors.name && (
                <p className="error">{errors.name}</p>
              )}
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastname">lastname</label>
              {touched.lastname && errors.lastname && (
                <p className="error">{errors.lastname}</p>
              )}
              <input
                type="text"
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="street">street</label>
              {touched.street && errors.street && (
                <p className="error">{errors.street}</p>
              )}
              <input
                type="text"
                name="street"
                value={values.street}
                onChange={handleChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="apartment">apartment</label>
              {touched.apartment && errors.apartment && (
                <p className="error">{errors.apartment}</p>
              )}
              <input
                type="text"
                name="apartment"
                value={values.apartment}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper zip">
              <label htmlFor="zipCode">zipCode</label>
              {touched.zipCode && errors.zipCode && (
                <p className="error">{errors.zipCode}</p>
              )}
              <input
                type="text"
                name="zipCode"
                value={values.zipCode}
                onChange={handleChange}
              />
            </div>
            <div className="input-wrapper ">
              <label htmlFor="country">country</label>
              {touched.country && errors.country && (
                <p className="error">{errors.country}</p>
              )}
              <input
                type="text"
                name="country"
                value={values.country}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className={`button submit ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              save address
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}
