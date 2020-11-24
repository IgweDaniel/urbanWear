import React from "react";
import { Formik } from "formik";

import styled from "styled-components";
import { useSelector } from "react-redux";
import { CheckBox, CartItem, AddressForm, Coupon } from "../components";
import Page from "./Page";

const Checkout = styled.div`
  margin: 150px auto;

  .addresses {
  }
  .address {
    width: 100%;
  }
  .address__type {
    font-size: 1.1rem;
    text-transform: capitalize;
    margin: 10px 0;
  }

  .notes {
    width: 100%;
    border: 1px solid #ccc;
    padding: 10px;
    font-family: "Catamaran", sans-serif;
    text-transform: capitalize;
  }
  .button.purchase {
    width: 100%;
    margin: 20px 0;
    /* background: ${({ theme }) => theme.colors.success}; */
  }

  .input-group {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .input-group .input-wrapper {
    width: 100%;
  }
  .input-wrapper {
    margin: 0 0 10px;
  }
  .input-wrapper label {
    text-transform: uppercase;
    font-variant: small-caps;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .content .input-wrapper input {
    height: 30px;
  }
  .zip {
    width: 200px;
  }

  .summary {
    display: none;
  }
  .content {
    display: flex;
    flex-direction: column-reverse;
  }
  .errors li {
    text-transform: capitalize;
    color: red;
  }
  @media (min-width: 768px) {
    .input-group {
      justify-content: space-between;
      margin-bottom: 15px;
      flex-direction: row;
    }
    .input-group .input-wrapper {
      width: 48%;
      margin: 0;
    }
  }
  @media (min-width: 1024px) {
    .content {
      flex-direction: row;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    .content form {
      width: 55%;
      /* margin-top: 40px; */
    }
    .summary {
      display: block;
      width: 35%;
      border: 1px solid #000;
      padding: 20px;
    }
    .button.purchase {
      width: 50%;
    }
  }
`;

export default () => {
  const { items, qty, total } = useSelector((state) => ({
    items: state.cart.items,
    total: state.cart.total,
    qty: state.cart.qty,
  }));

  function validateAddress(address) {
    const errors = {};
    const fields = [
      "name",
      "street",
      "apartment",
      "zip",
      "country",
      "lastname",
    ];

    fields.forEach((field) =>
      address[field] ? null : (errors[field] = `${field} is required`)
    );
    return errors;
  }

  function handlePurchase(values, { setSubmitting }, errors) {
    console.log(values);
    setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  }

  function renderError(error) {
    const arr = [];
    Object.keys(error).forEach((key) => {
      const isObject = typeof error[key] == "object";
      let data = isObject ? (
        renderError(error[key])
      ) : (
        <li key={error[key]}>{error[key]}</li>
      );
      arr.push(data);
    });

    return arr;
  }

  function validatePurchase(values) {
    const errors = {};
    errors.billing = validateAddress(values.billing);
    if (values.createAccount) {
      if (!values.email) {
        errors.email = "email address required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password || values.password < 6) {
        errors.password = "Password Invalid or required";
      }
    }
    if (values.altShippingAddress) {
      errors.shipping = validateAddress(values.shipping);
    }
    console.log(errors);
    return errors;
  }

  return (
    <Page>
      <Checkout>
        <Coupon />
        <div className="content">
          <Formik
            initialValues={{
              email: "",
              password: "",
              createAccount: false,
              altShippingAddress: false,
              billing: {
                name: "",
                lastname: "",
                street: "",
                apartment: "12",
                zip: "260123",
                country: "NG",
              },
              shipping: {
                name: "",
                lastname: "",
                street: "Bayowa Street",
                apartment: "12",
                zip: "",
                country: "",
                notes: "",
              },
            }}
            validate={validatePurchase}
            onSubmit={handlePurchase}
          >
            {({
              handleSubmit,
              isSubmitting,
              handleChange,
              values,
              ...rest
            }) => (
              <form>
                <ul className="errors">{renderError(rest.errors)}</ul>
                <div className="addresses">
                  <div className="address">
                    <h4 className="address__type">billing address</h4>
                    <AddressForm
                      values={values}
                      handleChange={handleChange}
                      type="billing"
                      {...rest}
                    />
                  </div>

                  <CheckBox
                    name="createAccount"
                    checked={values.createAccount}
                    renderLabel={() => (
                      <h4 className="address__type">create account</h4>
                    )}
                    onChange={handleChange}
                  />

                  {values.createAccount && (
                    <div className="input-group ">
                      <div className="input-wrapper">
                        <label>email address</label>
                        <input
                          type="text"
                          name={`email`}
                          value={values.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper">
                        <label>password</label>
                        <input
                          type="password"
                          name={`password`}
                          value={values.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                  <div className="address shipping">
                    <CheckBox
                      name="altShippingAddress"
                      checked={values.altShippingAddress}
                      renderLabel={() => (
                        <h4 className="address__type">
                          use different shipping address
                        </h4>
                      )}
                      onChange={handleChange}
                    />
                    {values.altShippingAddress && (
                      <AddressForm
                        values={values}
                        handleChange={handleChange}
                        type="shipping"
                        {...rest}
                      />
                    )}
                    <div className="input-wrapper">
                      <label htmlFor="notes">order notes</label>
                      <textarea
                        className="notes"
                        name="shipping.notes"
                        value={values.notes}
                        onChange={handleChange}
                        id="notes"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`button purchase ${isSubmitting ? "loading" : ""}`}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  place order
                </button>
              </form>
            )}
          </Formik>
          <div className="summary">
            <div className="items">
              {items.map((item, i) => (
                <CartItem {...item} key={i} />
              ))}
            </div>
            {qty}
            {total}
          </div>
        </div>
      </Checkout>
    </Page>
  );
};
