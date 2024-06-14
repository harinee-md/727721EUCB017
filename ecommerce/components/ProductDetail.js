import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CardMedia, CircularProgress, Alert } from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://20.244.56.144/test/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      setError('Error fetching product details');
    }
    setLoading(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      {product && (
        <Card>
          <CardMedia
            component="img"
            alt={product.name}
            height="300"
            image={`https://source.unsplash.com/random?sig=${product.id}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
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
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ProductDetail;
