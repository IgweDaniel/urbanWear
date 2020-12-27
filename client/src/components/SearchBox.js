import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { TiTimes } from "react-icons/ti";

import { RiSearchFill } from "react-icons/ri";
import { useFilter, useModal } from "../hooks";

const SearchBox = styled.div`
  width: var(--vw);
  background: #fff;
  padding: 35px 20px;
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
    margin-top: 20px;
    /* padding: 10px 0; */
  }
  .search-form input {
    font-size: 1.5rem;
    padding: 0;
    border: none;
    outline: none;
    border-bottom: 2px solid #eee;
  }
  input::placeholder {
    color: #ccc;
  }
  .button {
    /* background: #888; */
  }
  .search-form input,
  .search-form .icon {
    font-weight: 600;
    height: 40px;
  }
  .search-form .icon {
    font-size: 1.1rem;
  }
  @media (min-width: 768px) {
    padding: 50px 40px;
    .search-form input {
      font-size: 1.7rem;
    }
  }
`;

export default () => {
  const { q = "" } = useFilter();
  const [term, setTerm] = useState(q);
  const history = useHistory();
  const display = useModal();

  function closeSearch() {
    display({
      type: "CLOSE",
    });
  }

  function search() {
    if (term.trim() !== "") {
      history.push({
        pathname: `/shop/all`,
        search: `?q=${term}`,
      });
      closeSearch();
    }
  }
  return (
    <SearchBox>
      <div className="meta">
        <h5>what are you looking for?</h5>
        <button className="close" onClick={closeSearch}>
          <TiTimes size={20} />
        </button>
      </div>
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <input
          autoFocus={true}
          placeholder="search products..."
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />

        <button className="button icon">
          <RiSearchFill color="#fff" />
        </button>
      </form>
    </SearchBox>
  );
};
