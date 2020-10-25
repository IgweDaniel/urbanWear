import React, { useState } from "react";
import styled from "styled-components";
const Tabs = styled.div`
  --border-color: #d9d9d9;
  margin: 60px 0;
  .tab-list {
    border-bottom: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
  }
  .tab-content {
    margin: 20px 0 0;
  }
  .tab-list li {
    font-size: 1rem;
    padding: 0 20px;
    text-align: center;
    height: 40px;
    font-weight: 700;
    text-transform: uppercase;
    font-variant: small-caps;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #777;
  }
  .tab-list li.active {
    color: #303030;
  }
  @media (min-width: 768px) {
    .tab-list {
      flex-direction: row;
      align-items: center;
    }
    .tab-list li {
      position: relative;
      font-size: 0.9rem;
    }
    .tab-list li:after {
      content: "";
      position: absolute;
      bottom: -2px;
      height: 5px;
      width: 100%;
      left: 0;
    }

    .tab-list li.active {
      padding: 0 20px;
      border: 1px solid var(--border-color);
      border-bottom: none;
    }

    .tab-list li.active:after {
      background: #fff;
    }
  }
`;

export default ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };
  return (
    <Tabs>
      <ul className={"tab-list"}>
        {children.map((child) => {
          const { label } = child.props;
          return (
            <li
              key={label}
              onClick={() => onClickTabItem(label)}
              className={`${activeTab === label ? "active" : ""} clickable`}
            >
              {label}
            </li>
          );
        })}
      </ul>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return null;
          return child.props.children;
        })}
      </div>
    </Tabs>
  );
};
