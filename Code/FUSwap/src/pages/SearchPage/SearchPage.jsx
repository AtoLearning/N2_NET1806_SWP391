import React, { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import CategoryList from "../../components/Category/CategoryList";
import PostList from "../../components/AllPostList/PostList"; // Import mới
import FilterSearch from "../../components/FilterSearch/FilterSearch"; // Import mới
import SortAdress from "../../components/SortAddress/SortAddress";
import './SearchPageStyle.css';

export default function SearchPage() {
  return (
    <main className="main-container1">
      <div className="content-wrapper1">
        <div className="page-content1">
          <FilterSearch />
          <div className="search-content1">
            <h2 className="section-title1">Search results for keyword 'xxxxxxxxxxxxxxxxx' </h2>
            <SortAdress />
            <PostList />
          </div>
        </div>
      </div>
    </main>
  );
}
