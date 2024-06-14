import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Filter from './Filter';
import Pagination from './Pagination';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: '', company: '', rating: 0, minPrice: 0, maxPrice: 10000, availability: true });
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [filters, sort, page]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://20.244.56.144/test/companies/${filters.company}/categories/${filters.category}/products/top=10&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`);
      let products = response.data;

      // Sorting
      if (sort === 'price') {
        products = products.sort((a, b) => a.price - b.price);
      } else if (sort === 'rating') {
        products = products.sort((a, b) => b.rating - a.rating);
      } else if (sort === 'discount') {
        products = products.sort((a, b) => b.discount - a.discount);
      }

      setProducts(products);
    } catch (error) {
      setError('Error fetching products');
    }
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Filter filters={filters} setFilters={setFilters} />
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          id="sort"
          value={sort}
          label="Sort By"
          onChange={(e) => setSort(e.target.value)}
        >
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="discount">Discount</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt={product.name}
                height="140"
                image={`https://source.unsplash.com/random?sig=${product.id}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Company: {product.company}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {product.rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discount: {product.discount}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Availability: {product.availability ? 'In Stock' : 'Out of Stock'}
                </Typography>
                <Link to={`/product/${product.id}`}>View Details</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination page={page} setPage={setPage} />
    </Container>
  );
};

export default ProductList;
