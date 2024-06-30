import React, { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/react";
import './HomePageStyle.css';
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { FaHandshake, FaMoneyBillWave } from "react-icons/fa";

// Component ProductList để hiển thị danh sách sản phẩm
const ProductList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Tính toán tổng số trang
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Lấy danh sách sản phẩm hiện tại dựa trên trang hiện tại
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="product-grid">
        {currentProducts.map((product, index) => (
          <article className="product-card" key={index}>
            <img
              src={product.image}
              alt="Product image"
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-price">
              <span>{product.price} </span>
              {product.isExchange ? (
                <span><FaHandshake /></span>
              ) : (
                <span><FaMoneyBillWave /></span>
              )}
            </div>
          </article>
        ))}
      </div>
      <nav className="pagination" aria-label="Pagination">
        <Pagination 
          showControls 
          total={totalPages} 
          initialPage={1} 
          page={currentPage} 
          onChange={(page) => setCurrentPage(page)} 
        />
      </nav>
    </div>
  );
};

// Component CategoryList để hiển thị danh sách category
const CategoryList = ({ categories }) => {
  return (
    <section className="category-section">
      {categories.map((category, index) => (
        <div className="category-item" key={index}>
          <img
            src={category.icon}
            alt="Category icon"
            className="category-icon"
          />
          <div className="category-name">{category.name}</div>
        </div>
      ))}
    </section>
  );
};

// Component App chính
export default function App() {
  // Danh sách sản phẩm mẫu
  const products = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/cb41b205e31845634d3f285cc7fea1ee37657ea186278d7d1821ca0b95f27680?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Name' goods",
      description: "Description of the product...",
      price: "25.000",
      isExchange: false
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    // Thêm các sản phẩm khác tại đây
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea3664f1c5fa38496abf2c8449f0e1bde231da9338dc706d4ad89acd3f35954c?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Exchange goods",
      description: "Description of the exchange product...",
      price: "Trade",
      isExchange: true
    },
    
  ];

  // Danh sách danh mục mẫu
  const categories = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4eea275bdc50db4372abe020c14dd75c17f5e36afb6de2c6ac38738ed83482df?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Electronics"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4eea275bdc50db4372abe020c14dd75c17f5e36afb6de2c6ac38738ed83482df?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Fashion"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4eea275bdc50db4372abe020c14dd75c17f5e36afb6de2c6ac38738ed83482df?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Home & Garden"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4eea275bdc50db4372abe020c14dd75c17f5e36afb6de2c6ac38738ed83482df?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Sports"
    },
    // Thêm các danh mục khác tại đây
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4eea275bdc50db4372abe020c14dd75c17f5e36afb6de2c6ac38738ed83482df?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Sports"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4eea275bdc50db4372abe020c14dd75c17f5e36afb6de2c6ac38738ed83482df?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Sports"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4eea275bdc50db4372abe020c14dd75c17f5e36afb6de2c6ac38738ed83482df?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Sports"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4eea275bdc50db4372abe020c14dd75c17f5e36afb6de2c6ac38738ed83482df?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Sports"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4eea275bdc50db4372abe020c14dd75c17f5e36afb6de2c6ac38738ed83482df?apiKey=a4b48bf45df64e12b8f4c0de29c4c28f&",
      name: "Sports"
    },
    
  ];

  // const [cities, setCities] = useState([]);
  // const [districts, setDistricts] = useState([]);
  // const [wards, setWards] = useState([]);
  //
  // useEffect(() => {
  //   // Lấy dữ liệu cities
  //   fetch('http://localhost:3000/api/cities')
  //     .then(response => response.json())
  //     .then(data => setCities(data))
  //     .catch(error => console.error('Error fetching cities:', error));
  //
  //   // Lấy dữ liệu districts
  //   fetch('http://localhost:3000/api/districts')
  //     .then(response => response.json())
  //     .then(data => setDistricts(data))
  //     .catch(error => console.error('Error fetching districts:', error));
  //
  //   // Lấy dữ liệu wards
  //   fetch('http://localhost:3000/api/wards')
  //     .then(response => response.json())
  //     .then(data => setWards(data))
  //     .catch(error => console.error('Error fetching wards:', error));
  // }, []);

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
          <div className="view-more-container">
            <button className="view-more-button">View more</button>
          </div>
        </section>

        <CategoryList categories={categories} />
        
        {/* <section className="filter-section">
          <div className="filter-label">Sorted by</div>
          <div>
            <Autocomplete
              label="City"
              placeholder="Search a City in Viet Nam"
              className="filter-options"
            >
              {cities.map((city) => (
                <AutocompleteItem key={city.id} value={city.name}>
                  {city.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div>
            <Autocomplete
              label="District"
              placeholder="Search a District in Viet Nam"
              className="filter-options"
            >
              {districts.map((district) => (
                <AutocompleteItem key={district.id} value={district.name}>
                  {district.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div>
            <Autocomplete
              label="Ward"
              placeholder="Search a Ward in Viet Nam"
              className="filter-options"
            >
              {wards.map((ward) => (
                <AutocompleteItem key={ward.id} value={ward.name}>
                  {ward.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
        </section> */}

        <h2 className="section-title">Recent listings</h2>

        <ProductList products={products} />
      </div>
    </main>
  );
}
