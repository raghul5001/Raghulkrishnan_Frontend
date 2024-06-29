import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './RetrieveProductList.scss';

const RetrieveProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10;

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://35.200.144.96:8859/dixtest/product/get?prod_name=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data);
      } else {
        alert('Failed to retrieve products');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to retrieve products');
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Logic for displaying current products
  const offset = currentPage * productsPerPage;
  const currentProducts = products?.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(products?.length / productsPerPage);

  return (
    <div className="retrieve-product-list">
      <h2>Retrieve Product</h2>
      <div className="search-box">
        <label>
          Product Name:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
      {products?.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Unit Cost</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.prod_id}>
                  <td>{product.prod_id}</td>
                  <td>{product.prod_name}</td>
                  <td>{product.unit_cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          )}
        </>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default RetrieveProductList;
