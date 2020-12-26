import { createGlobalStyle } from "styled-components";

import loadingimg from "./assets/svg/loading.svg";

export default createGlobalStyle`
  :root{
    font-size:15px
  }

  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  
  body {
      font-family: 'Catamaran', sans-serif;
      height:var(--vh);
      overflow:hidden;
    }
    html{
      overflow:hidden;
   
    }
  #root{
    height:100%
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
    .button-muted{
      user-select:none
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
      cursor:pointer;
  
     position:relative;
    }
    .button.loading{
      text-indent:-9999px;
      background:#ccc !important;
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
    background:#ccc !important;
    color:#888;
    font-weight:bold;
  }

 .input-wrapper {
  position: relative;
 }
  .error {
    color: red;
    font-size: 13px;
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

  .input-wrapper input::placeholder {
    font-family: "Catamaran", sans-serif;
    text-transform: capitalize;
  }
  @media (min-width:1024px){
    :root{
      font-size:16px
    }
  }
  `;
