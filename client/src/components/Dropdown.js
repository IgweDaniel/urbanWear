import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";

const Dropdown = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;

  width: 100%;
  .selected {
    display: flex;
    align-items: flex-start;
  }
  .options {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    top: 30px;
    font-weight: normal;
    font-size: 0.95rem;
    position: absolute;
    z-index: 400;
    background: #fff;
  }
  .option.active {
    background: #eee;
  }
  .option {
    padding: 8px 20px;
  }
  .option:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
  .icon {
    align-items: flex-start;
  }
  span {
  }
`;

export default ({ options, value, onSelect }) => {
  const dd = useRef(null);

  const [showListOptions, setShowListOptions] = useState(false);

  function handleSelect(value) {
    onSelect(value);
  }

  function onBlur(e) {
    if (dd.current && !dd.current.contains(e.target)) setShowListOptions(false);
  }
  useEffect(() => {
    window.addEventListener("click", onBlur);
    return () => {
      window.removeEventListener("click", onBlur);
    };
  }, []);

  useEffect(() => {
    if (value) {
      setShowListOptions(false);
    }
  }, [value]);

  return (
    <Dropdown ref={dd}>
      <div
        className="button-muted value selected"
        onClick={() => setShowListOptions(!showListOptions)}
      >
        <span>{value.label}</span>
        <span className="icon">
          <FiChevronDown size={20} />
        </span>
      </div>
      {showListOptions && (
        <ul className="options">
          {options.map((option) => (
            <li
              className={`option ${
                value.label === option.label ? "active" : ""
              }`}
              key={option.value}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </Dropdown>
  );
};
