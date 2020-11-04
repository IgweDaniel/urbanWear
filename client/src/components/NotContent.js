import styled from "styled-components";

const NotContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 100px auto 0;
  margin-top: ${({ offset = 100 }) => `${offset}px`};
  text-align: center;
  text-transform: uppercase;
  font-variant: small-caps;
`;

export default NotContent;
