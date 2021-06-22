import React from "react";

const Pagination = ({ nextPage, previousPage }) => {
  return (
    <div className="pagination">
      {previousPage && <button onClick={previousPage}>back</button>}
      {nextPage && <button onClick={nextPage}>next</button>}
    </div>
  );
};

export default Pagination;
