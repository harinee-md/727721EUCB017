import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ page, setPage }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <MuiPagination
      count={10} // This should be dynamically set based on the total number of products and products per page
      page={page}
      onChange={handleChange}
      color="primary"
    />
  );
};

export default Pagination;
