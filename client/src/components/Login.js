import React from "react";
import styled from "styled-components";
import { TiTimes, TiTick } from "react-icons/ti";

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
  padding: 10px;
  font-family: "Catamaran", sans-serif;
  border: 1px solid #ccc;
  border-radius: none;
  &::placeholder {
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
    margin: 20px 0;
    text-transform: uppercase;
    font-variant: small-caps;
    line-height: 1.2;
    text-align: center;
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
  function handleAuth(e) {
    e.preventDefault();
  }

  return (
    <Login>
      <button className="close" onClick={closeAuth}>
        <TiTimes size={23} />
      </button>
      <form>
        <h1 className="legend">Your account for everything urban </h1>
        <Input type="text" placeholder="email address" />
        <Input type="text" placeholder="password" />
        <div className="meta">
          <div className="checkbox element">
            <input type="checkbox" name="keepsigned" id="keepsigned" />
            <label htmlFor="keepsigned">
              <TiTick size={15} />
            </label>
            <span htmlFor="keepsigned">keep me signed in</span>
          </div>

          <p className="element passwordReset">forgot password?</p>
        </div>
        <button className="button submit" onClick={handleAuth}>
          sign in
        </button>
        <p className="info">
          Don't have an account? Make your first purchase to create one
        </p>
      </form>
    </Login>
  );
};
