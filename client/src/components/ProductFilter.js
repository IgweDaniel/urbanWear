import React from "react";
import styled from "styled-components";

const ProductFilter = styled.div`
  height: 100vh;
  width: 320px;

  @media (min-width: 768px) {
    width: 350px;
  }
`;

export default () => {
  return <ProductFilter>ProductFilter</ProductFilter>;
};
