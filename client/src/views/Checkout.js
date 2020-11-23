import React, { useState } from "react";
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
  .input-wrapper input {
    /* height: 30px; */
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
    form {
      width: 55%;
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
  const [editShippingAddress, setEditShippingAddress] = useState(false);
  const [canCreateAccount, setCanCreateAccount] = useState(false);
  const { items, qty, total } = useSelector((state) => ({
    items: state.cart.items,
    total: state.cart.total,
    qty: state.cart.qty,
  }));
  return (
    <Page>
      <Checkout>
        <Coupon />
        <div className="content">
          <Formik
            initialValues={{
              email: "",
              password: "",
              billing: {
                name: "",
                lastname: "",
                street: "Bayowa Street",
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
            {({
              handleSubmit,
              isSubmitting,
              handleChange,
              values,
              ...rest
            }) => (
              <form>
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
                    name="create account"
                    checked={canCreateAccount}
                    renderLabel={() => (
                      <h4 className="address__type">create account</h4>
                    )}
                    onChange={(e) => {
                      setCanCreateAccount(e.target.checked);
                    }}
                  />

                  {canCreateAccount && (
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
                      name="shipping"
                      label="ship to different address"
                      checked={editShippingAddress}
                      renderLabel={() => (
                        <h4 className="address__type">
                          use different shipping address
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
          </div>
        </div>
      </Checkout>
    </Page>
  );
};
