import styled from "styled-components";

const Page = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  margin-top: 70px;
  &:before {
    content: "";
    background-color: #fff;
    height: 70px;
    width: 90%;
    z-index: 2000;
    display: block;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .hasScrolled &:before {
    box-shadow: -2px 2px 81px -27px rgba(0, 0, 0, 0.29);
  }

  @media (min-width: 969px) {
    width: 70%;
    margin-top: 90px;
    &:before {
      height: 90px;
    }
  }
`;
export default Page;
