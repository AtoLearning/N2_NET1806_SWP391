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
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6679b632faeae7b9d09e040c09f1d3b32ac4ce449da6f2a05d359fd0107c6056?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&"
                alt="Hero image"
                className="hero-image"
            />
            <div className="image-gallery">
              <div className="gallery-row">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4eea275bdc50db4372abe020c14dd75c17f5e36afb6de2c6ac38738ed83482df?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&"
                    alt="Gallery image 1"
                    className="gallery-item"
                />
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4eea275bdc50db4372abe020c14dd75c17f5e36afb6de2c6ac38738ed83482df?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&"
                    alt="Gallery image 2"
                    className="gallery-item"
                />
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4eea275bdc50db4372abe020c14dd75c17f5e36afb6de2c6ac38738ed83482df?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&"
                    alt="Gallery image 3"
                    className="gallery-item"
                />
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4eea275bdc50db4372abe020c14dd75c17f5e36afb6de2c6ac38738ed83482df?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&"
                    alt="Gallery image 4"
                    className="gallery-item"
                />
              </div>
            </div>
            {/* <div className="view-more-container">
              <button className="view-more-button">View more</button>
            </div> */}
          </section>

          <CategoryList />

          <h2 className="section-title">Recent listings</h2>

          <PostList />
        </div>
      </main>
  );
}