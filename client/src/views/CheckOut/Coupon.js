import React, { useState } from "react";
import { Formik } from "formik";
import styled from "styled-components";

const Coupon = styled.div`
  margin: 20px 0;
  .action {
    text-transform: uppercase;
    font-variant: small-caps;
    font-size: 0.95rem;
    margin: 10px 0;
  }
  .action .text {
    margin-right: 5px;
  }
  .action button {
    font-weight: bold;
    /* margin-left: 5px; */
  }
  form {
    display: flex;
    flex-direction: column;
  }

  .input-wrapper.code {
    width: 100%;
    margin-bottom: 10px;
  }

  @media (min-width: 768px) {
    form {
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
  return (
    <Coupon>
      <div className="action">
        <span className="text">Have a Coupon?</span>
        <button onClick={() => setshowCouponForm(!showCouponForm)}>
          click here to enter your code
        </button>
      </div>
      {showCouponForm && (
        <Formik
          initialValues={{ email: "", password: "", keepSignedIn: false }}
          validate={(values) => {
            const errors = {};
            if (!values.code) {
              errors.code = "Code Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }, errors) => {
            console.log(values);

            setTimeout(() => {
              setSubmitting(false);
            }, 2000);
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form>
              <div className="input-wrapper code">
                {errors.email && <p className="error">{errors.code}</p>}
                <input
                  type="text"
                  name="code"
                  placeholder="Coupon code"
                  value={values.code}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className={`button submit ${isSubmitting ? "loading" : ""}`}
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                apply coupon
              </button>
            </form>
          )}
        </Formik>
      )}
    </Coupon>
  );
};
