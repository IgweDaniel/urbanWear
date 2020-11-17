import React, { useState } from "react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CheckBox } from "../components";
import Coupon from "./CheckOut/Coupon";
import Page from "./Page";
import AddressForm from "./CheckOut/AddressForm";

const Checkout = styled.div`
  .addresses {
    display: flex;

    flex-direction: column;
  }
  .address {
    width: 100%;
    /* margin-top: 20px; */
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
  @media (min-width: 768px) {
    /* .addresses {
      flex-direction: row;
      justify-content: space-between;
    }
    .address {
      width: 48%;
      margin-top: 20px;
    } */
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
                  <textarea
                    className="notes"
                    name="shipping.notes"
                    value={values.notes}
                    onChange={handleChange}
                    id=""
                    placeholder="shipping notes"
                  ></textarea>
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

function OrderDetails() {
  const { items, qty, total } = useSelector((state) => ({
    items: state.cart.items,
    total: state.cart.total,
    qty: state.cart.qty,
  }));
  return <div className="order-details"></div>;
}
