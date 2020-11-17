import React, { useState } from "react";
import { Formik } from "formik";

import styled from "styled-components";
import { CheckBox } from "../../components";
import Page from "../Page";

import Coupon from "./Coupon";
import AddressForm from "./AddressForm";
import OrderDetails from "./OrderDetails";

const Checkout = styled.div`
  margin: 150px 0;
  .addresses {
    display: flex;
    flex-direction: column;
  }
  .address {
    width: 100%;
  }
  .address__type {
    font-size: 1rem;
    text-transform: uppercase;
    font-variant: small-caps;
    margin: 10px 0;
  }

  .notes {
    width: 100%;
    border: 1px solid #ccc;
    padding: 10px;
    font-family: "Catamaran", sans-serif;
    text-transform: capitalize;
    min-height: 100px;
  }
  .button.purchase {
    margin: 20px 0;
    width: 100%;
  }

  .fullName {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .fullName .input-wrapper {
    width: 48%;
    margin: 0;
  }
  .input-wrapper {
    margin: 0 0 15px;
  }
  .input-wrapper label {
    text-transform: uppercase;
    font-variant: small-caps;
    font-size: 0.85rem;
  }

  @media (min-width: 768px) {
    .addresses {
      flex-direction: row;
      justify-content: space-between;
    }
    .address {
      width: 48%;
      margin-top: 20px;
    }
  }
`;

export default () => {
  const [editShippingAddress, setEditShippingAddress] = useState(false);
  return (
    <Page>
      <Checkout>
        <Coupon />
        <Formik
          initialValues={{
            email: "",
            password: "",
            billing: {
              name: "",
              lastname: "",
              street: "Bayowa Street",
              apartment: "12",
              zipCode: "",
              country: "",
            },
            shipping: {
              name: "",
              lastname: "",
              street: "Bayowa Street",
              apartment: "12",
              zipCode: "",
              country: "",
              notes: "",
            },
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={(values, { setSubmitting }, errors) => {
            console.log(values);

            setTimeout(() => {
              setSubmitting(false);
            }, 2000);
          }}
        >
          {({ handleSubmit, isSubmitting, handleChange, values, ...rest }) => (
            <form>
              <div className="addresses">
                <div className="address">
                  <h4 className="address__type">billing address</h4>
                  <div className="fullName">
                    <div className="input-wrapper">
                      <label>name</label>
                      <input
                        // placeholder="name"
                        type="text"
                        name={`${"shipping"}.name`}
                        value={values["shipping"].name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-wrapper">
                      <label>lastName</label>
                      <input
                        // placeholder="lastName"
                        type="text"
                        name={`${"shipping"}.lastname`}
                        value={values["shipping"].lastname}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <AddressForm
                    values={values}
                    handleChange={handleChange}
                    type="billing"
                    {...rest}
                  />
                </div>

                <div className="address shipping">
                  <CheckBox
                    name="shipping"
                    label="ship to different address"
                    checked={editShippingAddress}
                    renderLabel={() => (
                      <h4 className="address__type">
                        ship to different address
                      </h4>
                    )}
                    onChange={(e) => {
                      setEditShippingAddress(e.target.checked);
                    }}
                  />
                  {editShippingAddress && (
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
                      // placeholder="shipping notes"
                    ></textarea>
                  </div>
                </div>
              </div>

              <OrderDetails />
              <button
                type="submit"
                className={`button purchase ${isSubmitting ? "loading" : ""}`}
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                Purchase
              </button>
            </form>
          )}
        </Formik>
      </Checkout>
    </Page>
  );
};
