import React from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, Box, Button } from '@mui/material';

const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "House", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];
const companies = ["AMZ", "FLP", "SNP", "KYN", "AZO"];

const Filter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ mb: 4 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category"
          value={filters.category}
          label="Category"
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="company-label">Company</InputLabel>
        <Select
          labelId="company-label"
          id="company"
          name="company"
          value={filters.company}
          label="Company"
          onChange={handleChange}
        >
          {companies.map((company) => (
            <MenuItem key={company} value={company}>{company}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        sx={{ mb: 2 }}
        id="rating"
        name="rating"
        label="Rating"
        type="number"
        value={filters.rating}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        sx={{ mb: 2 }}
        id="minPrice"
        name="minPrice"
        label="Min Price"
        type="number"
        value={filters.minPrice}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        sx={{ mb: 2 }}
        id="maxPrice"
        name="maxPrice"
        label="Max Price"
        type="number"
        value={filters.maxPrice}
        onChange={handleChange}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="availability-label">Availability</InputLabel>
        <Select
          labelId="availability-label"
          id="availability"
          name="availability"
          value={filters.availability}
          label="Availability"
          onChange={handleChange}
        >
          <MenuItem value={true}>In Stock</MenuItem>
          <MenuItem value={false}>Out of Stock</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={() => setFilters(filters)}>Apply Filters</Button>
    </Box>
  );
};

export default Filter;
