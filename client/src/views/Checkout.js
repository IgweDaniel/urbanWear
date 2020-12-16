import React, { useEffect } from "react";
import { useFormik } from "formik";

import styled from "styled-components";
import { useSelector } from "react-redux";
import { CheckBox, CartItem, AddressForm, Coupon } from "../components";
import Page from "./Page";
import { CURRENCY } from "../constants";

import { RiShoppingCartLine } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import * as Api from "../api";

const EmptyCheckout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    text-align: center;
    margin: 25px 0;
  }
  .button {
    margin: 5px auto;
  }
`;

const Checkout = styled.div`
  margin: 150px auto;

  .address {
    width: 100%;
  }
  .address__type {
    font-size: 1.1rem;
    text-transform: capitalize;
    margin: 5px 0;
  }
  .credentials {
    margin: 20px 0;
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
    /* align-items: center; */
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
    height: 35px;
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
  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .emph {
    font-weight: bold;
  }
  .card {
    font-family: "Catamaran", sans-serif;
    width: 100%;
    padding: 0 10px;
  }

  .user-card {
    display: flex;
    height: 40px;
    border: 1px solid #ccc;
    align-items: center;
    justify-content: center;
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
      border: 1px solid #ccc;
      padding: 20px;
    }
    .summary .meta {
      background: #eee;
      padding: 10px 20px;
      font-size: 0.9rem;
    }
    .button.purchase {
      width: 50%;
    }
  }
`;

const EmptyAddress = {
  name: "",
  lastname: "",
  street: "",
  apartment: "",
  zip_code: "",
  country: "",
};

export default () => {
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const total = useSelector((state) => state.cart.total);
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      createAccount: false,
      altShippingAddress: false,
      billing: EmptyAddress,
      shipping: EmptyAddress,
    },
    validate: validatePurchase,
    onSubmit: handlePurchase,
  });

  function validateAddress(address) {
    const errors = {};
    const fields = [
      "name",
      "street",
      "apartment",
      "zip_code",
      "country",
      "lastname",
    ];

    fields.forEach((field) =>
      address[field] ? null : (errors[field] = `${field} is required`)
    );
    return errors;
  }

  async function handlePurchase(values, { setSubmitting }, errors) {
    if (!stripe || !elements) {
      return;
    }
    const shipping = values.altShippingAddress
      ? values.shipping
      : values.billing;

    try {
      const payload = await stripe.createToken(
        elements.getElement(CardElement)
      );
      const token = payload.token.id;

      const { data, error } = await Api.makePayment(
        token,
        values.billing,
        shipping,
        values.email,
        values.password
      );

      if (error) {
        console.log(error);
        if (error.email) {
          formik.setErrors({ email: error.email[0] });
        }
        return;
      }

      setSubmitting(false);
      history.push({
        pathname: "/payment-complete",
        state: {
          payment: data,
        },
      });
    } catch (error) {
      console.log({ error });
    }
  }

  function validatePurchase(values) {
    const errors = {};
    const billingErrors = validateAddress(values.billing);
    if (Object.keys(billingErrors).length !== 0) {
      errors.billing = billingErrors;
    }
    if (!values.email) {
      errors.email = "email address required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (values.createAccount) {
      if (!values.password || values.password < 6) {
        errors.password = "Password Invalid or required";
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password do not match";
      }
    }
    if (values.altShippingAddress) {
      const shippingErrors = validateAddress(values.shipping);
      if (Object.keys(shippingErrors).length !== 0) {
        errors.shipping = shippingErrors;
      }
    }

    return errors;
  }

  useEffect(() => {
    if (user) {
      formik.setValues({
        altShippingAddress: false,
        billing: {
          ...user.address.billing,
        },
        shipping: {
          ...user.address.shipping,
        },
      });
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Page>
      {items.length === 0 ? (
        <EmptyCheckout>
          <div className="content">
            <RiShoppingCartLine size={80} />
            <h2>No items in Cart</h2>
            <Link to="/shop" className="button">
              back to shop
            </Link>
          </div>
        </EmptyCheckout>
      ) : (
        <Checkout>
          <Coupon />
          <div className="content">
            <form>
              <div className="addresses">
                <div className="address">
                  <h4 className="address__type">billing address</h4>
                  <AddressForm
                    values={formik.values.billing}
                    handleChange={formik.handleChange}
                    type="billing"
                    errors={formik.errors.billing}
                  />
                  <div className="input-wrapper">
                    <label>email address</label>

                    <input
                      type="text"
                      name={`email`}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email && (
                      <p className="error">{formik.errors.email}</p>
                    )}
                  </div>
                </div>
                {!user && (
                  <div>
                    <CheckBox
                      name="createAccount"
                      checked={formik.values.createAccount}
                      renderLabel={() => (
                        <h4 className="address__type">create account</h4>
                      )}
                      onChange={formik.handleChange}
                    />

                    {formik.values.createAccount && (
                      <div className="input-group">
                        <div className="input-wrapper">
                          <label>password</label>

                          <input
                            type="text"
                            name={`password`}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.password && (
                            <p className="error">{formik.errors.password}</p>
                          )}
                        </div>
                        <div className="input-wrapper">
                          <label>confirm password</label>

                          <input
                            type="text"
                            name={`confirmPassword`}
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.confirmPassword && (
                            <p className="error">
                              {formik.errors.confirmPassword}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="address shipping">
                  <CheckBox
                    name="altShippingAddress"
                    checked={formik.values.altShippingAddress}
                    renderLabel={() => (
                      <h4 className="address__type">
                        use different shipping address
                      </h4>
                    )}
                    onChange={formik.handleChange}
                  />
                  {formik.values.altShippingAddress && (
                    <AddressForm
                      values={formik.values.shipping}
                      errors={formik.errors.shipping}
                      handleChange={formik.handleChange}
                      type="shipping"
                    />
                  )}
                  <div className="input-wrapper">
                    <label htmlFor="notes">order notes</label>
                    <textarea
                      className="notes"
                      name="shipping.notes"
                      value={formik.values.notes}
                      onChange={formik.handleChange}
                      id="notes"
                    />
                  </div>
                </div>
              </div>

              <div className="input-wrapper">
                <label>card details</label>
                <div className="user-card">
                  <div className="card">
                    <CardElement
                      className="eee"
                      options={{
                        hidePostalCode: true,
                        style: {
                          base: {
                            color: "#000",
                            "::placeholder": {
                              color: "#888",
                              textTransform: "uppercase",
                              fontVariant: "small-caps",
                              fontSize: "0.85rem",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className={`button purchase ${
                  formik.isSubmitting ? "loading" : ""
                }`}
                disabled={formik.isSubmitting}
                onClick={formik.handleSubmit}
              >
                place order
              </button>
            </form>

            <div className="summary">
              <div className="items">
                {items.map((item, i) => (
                  <CartItem {...item} key={i} />
                ))}
              </div>
              <div className="total">
                <span className="emph">Total:</span>
                <span>
                  {CURRENCY}
                  {total}
                </span>
              </div>
              <div className="meta">
                <p className="emph">Free Shipping included</p>
                <p className="emph">Delivery within 20 working days</p>
              </div>
            </div>
          </div>
        </Checkout>
      )}
    </Page>
  );
};
