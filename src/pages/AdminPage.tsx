import { Container,} from "react-bootstrap";
import { Link } from "react-router-dom";



const AdminControls = () => {
    return (
        <Container className="mt-5 pt-5">
            <h2>Admin Controls</h2>
            <Link to="/add-product" className="btn btn-primary mb-3">Add Product</Link>
            <Link to="/product-db" className="btn btn-secondary mb-3 ms-3">Manage Products</Link>
            {/* Add more admin controls here */}
        </Container>
    );
};

export default AdminControls;