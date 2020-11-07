import { createGlobalStyle } from "styled-components";
import HKNova from "./assets/HKNova-Medium.woff";

import loadingimg from "./assets/svg/loading.svg";

export default createGlobalStyle`
  @font-face {
    font-family: HKNova;
    src: url(${HKNova}) format('woff');
  }

  :root{
    font-size:15px
  }

  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  
  body {
    /* font-family:"HKNova"; */
      font-family: 'Catamaran', sans-serif;
      height:100vh;
      overflow:hidden;
    }
  
  li {
      list-style:none
    }

  a {
      color:inherit;
      text-decoration:none;
    }

  .icon, .icon-label {
      display:flex;
      height:100%;
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
      color:inherit;
      text-transform:inherit;
      font-size:inherit;
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
      font-weight:bold;
      font-size:0.8rem;
      text-transform:uppercase;
      font-variant:small-caps;
      /* border-radius:5px; */
      position:relative;
    }
    .button.loading{
      text-indent:-9999px;
    }
    .button:after{
      background:url(${loadingimg});
      background-size:contain;
      background-position:center;
      background-repeat:no-repeat;
      content:"";
      width:40%;
      height:100%;
      position:absolute;
      top:0;
      display:none;
    }
    .button.loading:after{


display:block
    }

.button:disabled{
  background:#ccc;
  color:#fff;
}

@media (min-width:1024px){
  :root{
    font-size:16px
  }
}

  `;
