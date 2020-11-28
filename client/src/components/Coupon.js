import React, { useState } from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import * as Api from "../api";
import { updateCart } from "../ducks/cart";
import { useDispatch, useSelector } from "react-redux";
const Coupon = styled.div`
  margin: 20px 0;
  .action {
    text-transform: uppercase;
    font-variant: small-caps;
    font-size: 0.95rem;
    margin: 5px 0;
  }
  .action .text {
    margin-right: 5px;
  }
  .action button {
    font-weight: bold;
    /* margin-left: 5px; */
  }

  form .block {
    display: flex;
    flex-direction: column;
  }

  .input-wrapper.code {
    width: 100%;
    margin-bottom: 10px;
  }

  .coupon-code {
    background: #ccc;
    width: fit-content;
    padding: 5px 10px;
    margin: 0 0 10px;
  }
  .code {
    font-weight: bold;
    display: inline-block;
    margin: 0 5px;
  }

  @media (min-width: 768px) {
    form .block {
      align-items: center;
      flex-direction: row;
    }
    .input-wrapper.code {
      width: 30%;
      margin-right: 10px;
      margin-bottom: 0;
    }
  }
`;

export default () => {
  const [showCouponForm, setshowCouponForm] = useState(false);
  const dispatch = useDispatch();
  const coupon = useSelector((state) => state.cart.coupon);

  const formik = useFormik({
    // muFasa
    initialValues: { code: "" },
    validate: (values) => {
      const errors = {};
      if (!values.code || values.code === "") {
        errors.code = "Code Required";
      }
      return errors;
    },
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values, { setSubmitting }, errors) {
    if (coupon === values.code) {
      formik.setErrors({ code: "This code is currently applied" });
      return;
    }
    const { data, error } = await Api.applyCoupon(values.code);

    if (error) {
      formik.setErrors({ code: error.message });
      return;
    }

    dispatch(updateCart(data));
    setSubmitting(false);
    formik.resetForm();
  }

  return (
    <Coupon>
      <div className="action">
        <span className="text">Have a Coupon?</span>
        <button onClick={() => setshowCouponForm(!showCouponForm)}>
          click here to enter your code
        </button>
      </div>
      {coupon && (
        <p className="coupon-code">
          coupon
          <span className="code">{coupon}</span>
          has been applied
        </p>
      )}
      {showCouponForm && (
        <form>
          {formik.errors.code && <p className="error">{formik.errors.code}</p>}
          <div className="block">
            <div className="input-wrapper code">
              <input
                type="text"
                name="code"
                placeholder="Coupon code"
                value={formik.values.code}
                onChange={formik.handleChange}
              />
            </div>
            <button
              type="submit"
              className={`button submit ${
                formik.isSubmitting ? "loading" : ""
              }`}
              disabled={formik.isSubmitting}
              onClick={formik.handleSubmit}
            >
              apply coupon
            </button>
          </div>
        </form>
      )}
    </Coupon>
  );
};
