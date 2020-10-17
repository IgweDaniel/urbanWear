import { createGlobalStyle } from "styled-components";
import HKNova from "./assets/HKNova-Medium.woff";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap');
  /* @font-face {
    font-family: HKNova;
    src: url(${HKNova}) format('woff');
  } */

  :root{
    font-size:14px
  }

  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  
  body {
      font-family:"HKNova";
      font-family: 'Catamaran', sans-serif;
    }
  
  li {
      list-style:none
    }

  a {
      color:inherit;
      text-decoration:none;
    }

  .icon {
      display:flex;
      align-items:center;
      justify-content:center;
    }
  
  button {
      outline:none;
      box-shadow:none;
      border:none;
      cursor:pointer;
      background:transparent;
      font-family:inherit;
    }
  
    .button{
      height:38px;
      display:flex;
      align-items:center;
      justify-content:center;
      width:fit-content;
      padding:0 20px;
      background:#000;
      color:#fff;
      /* font-weight:bold; */
      font-size:0.8rem;
      text-transform:uppercase;
      font-variant:small-caps
    }


@media (min-width:1024px){
  :root{
    font-size:16px
  }
}

  `;
