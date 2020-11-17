import React from "react";
import { TiTick } from "react-icons/ti";
import styled from "styled-components";
const CheckBox = styled.div`
  display: flex;
  align-items: center;

  input {
    display: none;
  }
  label {
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
  label svg {
    fill: #fff;
  }
  input:checked + label svg {
    fill: #000;
  }
`;

export default ({
  name,
  label,
  className = "",
  labelClassName = "",
  renderLabel,
  ...props
}) => {
  return (
    <CheckBox className={className}>
      <input type="checkbox" {...props} name={name} id={name} />
      <label htmlFor={name}>
        <TiTick size={15} />
      </label>
      {renderLabel ? (
        renderLabel()
      ) : (
        <span className={labelClassName}>{label}</span>
      )}
    </CheckBox>
  );
};
