import { useParams, Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/UseAppDispatch";
import { addToCart } from "../redux/cartSlice";
import { Button, Container, Spinner, Toast } from "react-bootstrap";
import { useState } from "react";
import { useCombinedProducts } from "../hooks/useCombinedProducts";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [showToast, setShowToast] = useState(false);

  const { data: products, isLoading, error } = useCombinedProducts();

  if (isLoading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );

  if (error)
    return (
      <p className="text-center text-danger mt-5">Error loading product</p>
    );

  const product = products?.find((p) => {
    const productId = String(p.id);
    return productId === id;
  });

  if (!product) return <p className="text-center mt-5">Product not found.</p>;

  return (
    <Container className="my-5">
      <div className="d-flex flex-column flex-md-row align-items-center">
        <img
          src={product.image}
          alt={product.title}
          onError={(e) =>
            (e.currentTarget.src = "https://via.placeholder.com/200")
          }
          className="img-fluid rounded shadow-sm me-md-4 mb-3"
          style={{ maxWidth: "250px" }}
        />
        <div>
          <h3 className="fw-bold mb-3">{product.title}</h3>
          <p className="text-muted mb-2 text-capitalize">{product.category}</p>
          <p className="text-secondary mb-4">{product.description}</p>
          <h4 className="text-primary mb-3">${product.price.toFixed(2)}</h4>
          <Button
            variant="primary"
            className="me-2"
            onClick={() => {
              dispatch(addToCart(product));
              setShowToast(true);
            }}
          >
            Add to Cart
          </Button>
          <Link to="/products" className="btn btn-outline-secondary">
            Back to Products
          </Link>
        </div>
      </div>

      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success!</strong>
          </Toast.Header>
          <Toast.Body>Added to cart!</Toast.Body>
        </Toast>
      </div>
    </Container>
  );
};

export default ProductDetails;
