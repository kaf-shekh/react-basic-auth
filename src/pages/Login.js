import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../contexts/UserAuthContext";
import { useToast } from "../hooks/useToast";

const Login = () => {
  const toast = useToast();
  console.log("useToast ", useToast())
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   try {
  //     await logIn(email, password);
  //     navigate("/home");
  //     toast.success("Successfully login")
  //   } catch (err) {
  //     console.log(err.message,err.status)
  //     if (err.message.includes("Firebase: Error (auth/invalid-credential)")) {
  //       setError("Firebase: Error (auth/invalid-credential)");
  //       toast?.error("User not Found")
  //       // check()
  //       // return (<ToastComponent messageData="User Not found, Please Sign up" action="error" />)
        
  //     } else {
  //       setError(err.message);
  //     }
  //   }
  // };
  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
      toast.success("Successfully login")
    } catch (err) {
      console.log(err.message,err.status,toast)
      if (err.message.includes("Firebase: Error (auth/invalid-credential)")) {
        setError("Firebase: Error (auth/invalid-credential)");
        toast.error("User not Found")
        // check()
        // return (<ToastComponent messageData="User Not found, Please Sign up" action="error" />)
        
      } else {
        setError(err.message);
      }
    }
  }
  function check() {
    console.log("date check")
  }

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase/ React Auth Login</h2>
        <Button
          className="success-btn"
          onClick={() => toast.success("Success toast notification")}
        >Toast Success</Button>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={submit}>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;
