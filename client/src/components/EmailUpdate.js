import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Api from "../api";
import { setUserData } from "../ducks/auth";
import { createNotification } from "../ducks/global";

const EmailUpdate = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: user.email,
      password: "",
    },
    validate: validate,
    onSubmit: updateEmail,
  });

  function validate(values) {
    const errors = {};
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.newPassword = "Password Invalid or required";
    }
    return errors;
  }

  async function updateEmail(values, { setSubmitting }) {
    const { error } = await Api.updateEmail({
      ...values,
    });
    if (error) {
      if (error.current_password) {
        formik.setErrors({ password: "Invalid Password" });
      }
      if (error.new_email) {
        formik.setErrors({ email: error.new_email[0] });
      }
    } else {
      dispatch(setUserData());
      dispatch(
        createNotification({
          type: "success",
          message: `Email updated`,
        })
      );
    }
  }

  return (
    <div className="email-form">
      <div className="input-wrapper">
        <label>Email</label>

        <input
          type="text"
          name={`email`}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && <p className="error">{formik.errors.email}</p>}
      </div>
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

      <button
        type="submit"
        className={`button update-email ${
          formik.isSubmitting ? "loading" : ""
        }`}
        disabled={formik.isSubmitting || user.email === formik.values.email}
        onClick={formik.handleSubmit}
      >
        update Email
      </button>
    </div>
  );
};

export default EmailUpdate;
