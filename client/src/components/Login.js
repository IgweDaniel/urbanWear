import React from "react";
import styled from "styled-components";
import { TiTimes } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
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
  const formik = useFormik({
    initialValues: {
      email: "daniel@gmail.com",
      // password: "ltDjpe123",
      password: "wrongpassword",
      keepSignedIn: false,
    },
    validate: handleValidation,
    onSubmit: handleSubmit,
  });
  function closeForm() {
    display({
      type: "CLOSE",
    });
  }

  function handleSubmit(values, { setSubmitting }) {
    dispatch(authenticateUser(values.email, values.password))
      .then(() => {
        setSubmitting(false);
        history.push({
          pathname: `/account`,
        });
        closeForm();
      })
      .catch((error) => {
        formik.setErrors({ form: error.message });
        setSubmitting(false);
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
      <form>
        <h4 className="legend">Login </h4>
        <p className="sub-legend">The account for every wear urban</p>

        <div className="input-wrapper">
          {formik.errors.form && <p className="error">{formik.errors.form}</p>}
          {formik.errors.email && formik.touched.email && (
            <p className="error">{formik.errors.email}</p>
          )}
          <input
            type="text"
            name="email"
            placeholder="email address"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>

        <div className="input-wrapper">
          {formik.errors.password && formik.touched.password && (
            <p className="error">{formik.errors.password}</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>

        <div className="meta">
          <CheckBox
            name="keepSignedIn"
            id="keepSignedIn"
            className="element"
            checked={formik.values.keepSignedIn}
            onChange={formik.handleChange}
            label="keep credentials"
          />

          <p className="element passwordReset">forgot password?</p>
        </div>
        <button
          type="submit"
          className={`button submit ${formik.isSubmitting ? "loading" : ""}`}
          disabled={formik.isSubmitting}
          onClick={formik.handleSubmit}
        >
          sign in
        </button>
        <p className="info">
          Don't have an account? Make your first purchase to create one
        </p>
      </form>
    </Login>
  );
};
