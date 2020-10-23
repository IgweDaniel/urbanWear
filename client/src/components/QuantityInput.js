import React from "react";
import styled from "styled-components";
import { FiPlus, FiMinus } from "react-icons/fi";
const QuantityInput = styled.div`
  height: 33px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  & div {
    user-select: none;
    display: flex;
    flex: 1;
    height: 100%;
    color: #888;
    align-items: center;
    justify-content: center;
  }
  .control {
    cursor: pointer;
    /* background-color: #30292f; */
    border: 2px solid #000;
  }
  .control:hover {
    border-color: #1f1f1f;
  }
  .control:active {
    background: #c2c2c2;
    color: #fff;
  }
`;

const COTROL_FILL = "#000";
const COTROL_SIZE = 17;
export default ({ min = 0, max, value, onChange }) => {
  return (
    <QuantityInput>
      <div
        className="control minus"
        onClick={() => {
          if (value !== min) onChange(value - 1);
        }}
      >
        <FiMinus color={COTROL_FILL} size={COTROL_SIZE} />
      </div>
      <div className="value">{value}</div>
      <div
        className="control plus"
        onClick={() => {
          if (max && value >= max) return;
          onChange(value + 1);
        }}
      >
        <FiPlus color={COTROL_FILL} size={COTROL_SIZE} />
      </div>
    </QuantityInput>
  );
};
