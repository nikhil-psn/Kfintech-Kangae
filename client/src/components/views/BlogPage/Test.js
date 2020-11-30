import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
// import "bootstrap-less";

function Test() {
  const [pageNumber, setPageNumber] = useState(5);
  var list;

  useEffect(() => {
    list = () => {
      return <h3>The active page is {pageNumber}</h3>;
    };
  }, [pageNumber]);

  const pageChanged = (pageNo) => {
    console.log(`active page is ${pageNo}`);
    setPageNumber(pageNo);
  };
  return (
    <div>
      <h4>Hello</h4>
      {list}
      <Pagination
        activePage={pageNumber}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        onChange={pageChanged}
      />
      <h4>Hello</h4>
    </div>
  );
}

export default Test;
