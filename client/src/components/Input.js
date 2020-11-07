import React from "react";
import styled from "styled-components";
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

export default ({ error, ...rest }) => {
  return (
    <Input>
      {error && <p className="error">{error}</p>}
      <input {...rest} />
    </Input>
  );
};
