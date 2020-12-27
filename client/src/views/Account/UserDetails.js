import { useFormik } from "formik";
import React from "react";

import styled from "styled-components";

import * as Api from "../../api";
import { EmailUpdate } from "../../components";

const UserDetails = styled.div`
  .input-wrapper label {
    text-transform: uppercase;
    font-variant: small-caps;
    font-size: 0.8rem;
    font-weight: bold;
  }
  .update-password,
  .update-email {
    margin: 20px 0;
    width: fit-content;
  }
  .password-form {
    width: 100%;
    max-width: 400px;
  }
  .legend {
    text-transform: uppercase;
    font-variant: small-caps;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

export default () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: validatePasswords,
    onSubmit: updatePassword,
  });

  async function updatePassword(values, { setSubmitting }) {
    const { error } = await Api.updatePassword({
      ...values,
    });
    if (error) {
      if (error.current_password) {
        formik.setErrors({ password: "Invalid Password" });
      }
      return;
    }

    console.log("success");
  }
  function validatePasswords(values) {
    const errors = {};
    if (!values.password) {
      errors.password = "Password Invalid or required";
    }
    if (!values.newPassword) {
      errors.newPassword = "Password Invalid or required";
    }
    if (values.newPassword !== values.confirmNewPassword) {
      errors.confirmNewPassword = "Password do not match";
    }
    return errors;
  }

  return (
    <UserDetails>
      <EmailUpdate />
      <div className="password-form">
        <div className="legend">password change</div>
        <div className="input-wrapper">
          <label>Password</label>

          <input
            type="password"
            name={`password`}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <p className="error">{formik.errors.password}</p>
          )}
        </div>
        <div className="input-wrapper">
          <label>New Password</label>

          <input
            type="password"
            name={`newPassword`}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.newPassword && (
            <p className="error">{formik.errors.newPassword}</p>
          )}
        </div>
        <div className="input-wrapper">
          <label>Confirm New Password</label>

          <input
            type="password"
            name={`confirmNewPassword`}
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.confirmNewPassword && (
            <p className="error">{formik.errors.confirmNewPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className={`button update-password ${
            formik.isSubmitting ? "loading" : ""
          }`}
          disabled={formik.isSubmitting}
          onClick={formik.handleSubmit}
        >
          change password
        </button>
      </div>
    </UserDetails>
  );
};
