import React, { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import CategoryList from "../../components/Category/CategoryList";
import PostList from "../../components/AllPostList/PostList"; // Import mới
import './HomePageStyle.css';

export default function HomePage() {


  return (
      <main className="main-container">
        <div className="content-wrapper">
          <section className="hero-section">
            <img
                src="https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FmainImage.jpg?alt=media&token=e7326543-7ad5-452c-8af4-2d8ab236b63c"
                alt="Hero image"
                className="hero-image"
            />
            {/*<div className="image-gallery">*/}
            {/*  <div className="gallery-row">*/}
            {/*    <img*/}
            {/*        src="https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FCoin.png?alt=media&token=508f0cae-8814-4efa-838e-79fec2262011"*/}
            {/*        alt="Gallery image 1"*/}
            {/*        className="gallery-item"*/}
            {/*    />*/}
            {/*    <img*/}
            {/*        src="https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FCoin.png?alt=media&token=508f0cae-8814-4efa-838e-79fec2262011"*/}
            {/*        alt="Gallery image 2"*/}
            {/*        className="gallery-item"*/}
            {/*    />*/}
            {/*    <img*/}
            {/*        src="https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FCoin.png?alt=media&token=508f0cae-8814-4efa-838e-79fec2262011"*/}
            {/*        alt="Gallery image 3"*/}
            {/*        className="gallery-item"*/}
            {/*    />*/}
            {/*    <img*/}
            {/*        src="https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/image%2FimageApp%2FCoin.png?alt=media&token=508f0cae-8814-4efa-838e-79fec2262011"*/}
            {/*        alt="Gallery image 4"*/}
            {/*        className="gallery-item"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div>*/}
          </section>

          <CategoryList />

          <h2 className="section-title">Recent listings</h2>

          <PostList />
        </div>
      </main>
  );
}