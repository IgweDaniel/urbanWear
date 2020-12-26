import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { TiTimes } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import { useModal } from "../hooks";

const SearchBox = styled.div`
  width: var(--vw);
  background: #fff;
  padding: 40px;
  /* display: none; */
  .meta {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    text-transform: uppercase;
    font-variant: small-caps;
    color: #888;
  }
  .meta h3,
  .meta .close {
    flex: 1;
  }
  .meta .close {
    display: flex;
    justify-content: flex-end;
  }
  .search-form {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    padding: 10px 0;
    border-bottom: 2px solid #ccc;
  }
  .search-form input {
    padding: 0;
    border: none;
    outline: none;
  }

  .search-form input,
  .search-form .icon {
    font-size: 2rem;
    font-weight: bold;
  }
`;

export default () => {
  const [term, setTerm] = useState("");
  const history = useHistory();
  const display = useModal();

  function closeSearch() {
    display({
      type: "CLOSE",
    });
  }

  function search() {
    history.push({
      pathname: `/shop/all`,
      search: `?q=${term}`,
    });
    closeSearch();
  }
  return (
    <SearchBox>
      <div className="meta">
        <h5>what are you looking for?</h5>
        <button className="close" onClick={closeSearch}>
          <TiTimes size={20} />
        </button>
      </div>
      <form className="search-form">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />

        <button className="icon" onClick={search}>
          <FiSearch color="#888" />
        </button>
      </form>
    </SearchBox>
  );
};
