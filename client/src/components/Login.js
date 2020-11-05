import React from "react";
import styled from "styled-components";
import { TiTimes, TiTick } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { login } from "../ducks/auth";
import { useHistory } from "react-router-dom";
const Input = styled.div`
  position: relative;
  --diff: 15px;
  &:first-of-type {
    margin-top: var(--diff);
  }
  margin-bottom: var(--diff);
  .error {
    position: absolute;
    top: -10px;
    left: 10px;
    background: #fff;
    color: red;
    z-index: 10;
    font-size: 0.85rem;
    text-transform: capitalize;
  }
  input {
    width: 100%;
    height: 40px;
    padding: 10px;
    font-family: "Catamaran", sans-serif;
    border: 1px solid #ccc;
    border-radius: none;
    position: relative;
  }

  input::placeholder {
    /* font-weight: bold; */
    font-family: "Catamaran", sans-serif;
    text-transform: capitalize;
  }
`;

const Login = styled.div`
  height: calc(var(--vh) * 0.8);
  width: calc(var(--vw) * 0.9);
  max-width: 400px;
  display: flex;
  align-items: center;
  position: relative;
  button.close {
    --size: 40px;
    top: 0;
    right: 0;
    position: absolute;
    /* background: #ccc; */
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
  .checkbox {
    display: flex;
    align-items: center;
  }
  .checkbox input {
    display: none;
  }
  .checkbox label {
    display: flex;
    align-items: center;
    justify-content: center;
    --size: 15px;
    cursor: pointer;
    width: var(--size);
    height: var(--size);
    border: 1px solid #000;
    margin-right: 5px;
  }
  .checkbox label svg {
    fill: #fff;
  }
  .checkbox input:checked + label svg {
    fill: #000;
  }
  .info {
    line-height: 1.2;
  }
`;

export default ({ closeAuth }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Login>
      <button className="close" onClick={closeAuth}>
        <TiTimes size={23} />
      </button>
      <Formik
        initialValues={{ email: "", password: "", keepSignedIn: false }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email address is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Please choose a password";
          } else if (values.password.length < 6) {
            errors.password = "Password characters must be more than 6";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }, errors) => {
          console.log(values);
          dispatch(login({ user: { values }, token: "atoken" }));
          history.push({
            pathname: `/account`,
          });
          setTimeout(() => {
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <form>
            <h4 className="legend">Login </h4>
            <p className="sub-legend">The account for every wear urban</p>

            <Input>
              {errors.email && <p className="error">{errors.email}</p>}
              <input
                type="text"
                name="email"
                placeholder="email address"
                value={values.email}
                onChange={handleChange}
              />
            </Input>

            <Input>
              {errors.password && <p className="error">{errors.password}</p>}
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                value={values.password}
              />
            </Input>

            <div className="meta">
              <div className="checkbox element">
                <input
                  type="checkbox"
                  name="keepSignedIn"
                  id="keepSignedIn"
                  checked={values.keepSignedIn}
                  onChange={handleChange}
                />
                <label htmlFor="keepSignedIn">
                  <TiTick size={15} />
                </label>
                <span htmlFor="keepsigned">keep me signed in</span>
              </div>

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
