import { useState, type FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../context/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { User } from "../types/User";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // STEP 1: Authenticate user with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // STEP 2: Get user profile data from Firestore database
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // STEP 3: Get the data and create User object
        const userData = userDocSnap.data();
        const userProfile = new User(
          userData.id,
          userData.name,
          userData.username,
          "", // Password not stored in Firestore for security
          userData.email,
          userData.age,
          userData.address,
          userData.city,
          userData.state,
          userData.zipcode
        );

        // STEP 4: Store user in Redux for global access
        dispatch(setUser(userProfile));

        setError(null);
        navigate("/");
      } else {
        setError("User profile not found. Please contact support.");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <div className="p-4 rounded-4 shadow-sm bg-light">
        <h2 className="text-center mb-4 text-primary">Login</h2>

        {error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : (
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </Form>
        )}
      </div>
    </Container>
  );
};

export default LoginPage;
