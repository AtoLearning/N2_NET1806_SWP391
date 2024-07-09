import React, { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import CategoryList from "../../components/Category/CategoryList";
import PostList from "../../components/AllPostList/PostList"; // Import mới
import FilterSearch from "../../components/FilterSearch/FilterSearch"; // Import mới
import SortAdress from "../../components/SortAddress/SortAddress";
import './SearchPageStyle.css';
import {useLocation, useParams} from "react-router-dom";

export default function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get('searchValue');

  return (
    <main className="main-container1">
      <div className="content-wrapper1">
        <div className="page-content1">
          <FilterSearch />
          <div className="search-content1">
            <h2 className="section-title1"> Search results for keyword &quot;{searchValue}&quot; </h2>
            <SortAdress />
            <PostList />
          </div>
        </div>
      </div>
    </main>
  );
}
