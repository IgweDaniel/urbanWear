import React, { useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Api from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../ducks/auth";

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
  .button.edit-mode {
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

  .form-actions {
    display: flex;
    align-items: center;
    margin: 20px 0;
  }
  .form-actions .cancel {
    margin-left: auto;
    border: 1px solid #000;
    background: transparent;
    color: #000;
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

export default () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  async function handleAddressUpdate(values, cb) {
    const { data, error } = await Api.updateAddress(values);
    if (error) {
      console.log(error);
    }
    dispatch(setUser(data));
  }

  async function handleValidation(values) {
    const errors = {};
    if (!values.name) {
      errors.name = "name is required";
    }
    if (!values.lastname) {
      errors.lastname = "lastname  is required";
    }
    if (!values.street) {
      errors.street = "street is required";
    }
    if (!values.apartment) {
      errors.apartment = "apartment is required";
    }
    if (!values.country) {
      errors.country = "country is required";
    }
    return errors;
  }

  return (
    <Addresses>
      <div className="address">
        <UpdateAddress
          type="Billing"
          handleUpdate={handleAddressUpdate}
          initialValues={{
            name: "",
            lastname: "",
            street: "",
            apartment: "",
            zip_code: "",
            country: "",
            address_type: "B",
            ...user.address.billing,
          }}
          validate={handleValidation}
        />
      </div>
      <div className="address">
        <UpdateAddress
          type="Shipping"
          handleUpdate={handleAddressUpdate}
          initialValues={{
            name: "",
            lastname: "",
            street: "",
            apartment: "",
            zip_code: "",
            country: "",
            address_type: "S",
            ...user.address.shipping,
          }}
          validate={handleValidation}
        />
      </div>
    </Addresses>
  );
};

function UpdateAddress({ handleUpdate, initialValues, validate, type }) {
  const [isEditingAddress, HasEditAddress] = useState(false);
  const fields = [
    "name",
    "lastname",
    "street",
    "apartment",
    "zip_code",
    "country",
  ];

  function update(values, { setSubmitting }, errors) {
    handleUpdate(values).then(() => {
      setSubmitting(false);
    });
  }
  return (
    <>
      {!isEditingAddress && (
        <div className="action">
          <h3 className="address__type">{type} Address</h3>
          <button
            className="button edit-mode"
            onClick={() => HasEditAddress(true)}
          >
            {initialValues ? "edit" : "add"}
          </button>
        </div>
      )}
      {!isEditingAddress && initialValues && (
        <div className="details">
          {Object.keys(initialValues).map(
            (key) =>
              key !== "address_type" && (
                <span key={key}>{initialValues[key]}</span>
              )
          )}
        </div>
      )}
      {isEditingAddress && (
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={update}
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
              {fields.map((field) => (
                <div className="input-wrapper" key={field}>
                  <label htmlFor="name">{field}</label>
                  {touched[field] && errors[field] && (
                    <p className="error">{errors[field]}</p>
                  )}
                  <input
                    type="text"
                    name={field}
                    value={values[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <div className="form-actions">
                <button
                  type="submit"
                  className={`button submit ${isSubmitting ? "loading" : ""}`}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  save address
                </button>
                <div
                  className="button cancel"
                  onClick={() => {
                    HasEditAddress(false);
                  }}
                >
                  cancel
                </div>
              </div>
            </form>
          )}
        </Formik>
      )}
    </>
  );
}
