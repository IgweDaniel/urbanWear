import React from "react";
import styled from "styled-components";
import { TiTimes } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { authenticateUser } from "../ducks/auth";
import { useHistory } from "react-router-dom";
import CheckBox from "./CheckBox";
import useModal from "../hooks/useModal";

const Login = styled.div`
  height: calc(var(--vh) * 0.8);
  width: calc(var(--vw));
  min-height: 400px;
  max-width: 400px;
  display: flex;
  align-items: center;
  position: relative;
  --diff: 15px;
  .input-wrapper {
    margin-bottom: var(--diff);
  }
  .input-wrapper:first-of-type {
    margin-top: var(--diff);
  }
  button.close {
    --size: 40px;
    top: 0;
    right: 0;
    position: absolute;
    width: var(--size);
    height: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  form {
    width: 80%;
    margin: auto;
  }

  .legend {
    width: 100%;
    font-size: 1.5rem;
    text-transform: capitalize;
    line-height: 1.2;
  }
  .sub-legend {
    /* margin-bottom: 18px; */
  }
  .submit.button {
    width: 100%;
    margin: 10px 0;
  }

  .meta {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .element {
    flex: 1;
  }
  .passwordReset {
    display: flex;
    justify-content: flex-end;
  }

  .info {
    line-height: 1.2;
  }
  @media (min-width: 768px) {
    width: calc(var(--vw) * 0.9);
  }
`;

export default ({ closeAuth }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const display = useModal();

  function closeForm() {
    display({
      type: "CLOSE",
    });
  }

  function handleSubmit(values, { setSubmitting }) {
    dispatch(authenticateUser(values.email, values.password)).then(() => {
      setSubmitting(false);
      history.push({
        pathname: `/account`,
      });
      closeForm();
    });
  }

  function handleValidation(values) {
    const errors = {};
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Please choose a password";
    } else if (values.password.length < 6) {
      errors.password = "Password characters must be more than 6";
    }
    return errors;
  }

  return (
    <Login>
      <button className="close" onClick={closeForm}>
        <TiTimes size={23} />
      </button>
      <Formik
        initialValues={{
          email: "daniel@gmail.com",
          password: "ltDjpe123",
          keepSignedIn: false,
        }}
        validate={handleValidation}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          handleChange,
          touched,
          handleSubmit,
          isSubmitting,
        }) => (
          <form>
            <h4 className="legend">Login </h4>
            <p className="sub-legend">The account for every wear urban</p>
            <div className="input-wrapper">
              {errors.email && touched.email && (
                <p className="error">{errors.email}</p>
              )}
              <input
                type="text"
                name="email"
                placeholder="email address"
                value={values.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              {errors.password && touched.password && (
                <p className="error">{errors.password}</p>
              )}
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                value={values.password}
              />
            </div>

            <div className="meta">
              <CheckBox
                name="keepSignedIn"
                id="keepSignedIn"
                className="element"
                checked={values.keepSignedIn}
                onChange={handleChange}
                label="keep credentials"
              />

              <p className="element passwordReset">forgot password?</p>
            </div>
            <button
              type="submit"
              className={`button submit ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              sign in
            </button>
            <p className="info">
              Don't have an account? Make your first purchase to create one
            </p>
          </form>
        )}
      </Formik>
    </Login>
  );
};
