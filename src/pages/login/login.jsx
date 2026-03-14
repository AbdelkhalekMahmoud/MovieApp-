import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdRemoveRedEye } from "react-icons/md";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(true);
  const togglePasswordVisiblity = () => {
    setPasswordShown((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login submitted", data);
  };

  return (
    <Container className="pb-5">
      <Card className="form-card">
        <Card.Body>
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="userEmail">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: /^[a-zA-Z]{3,15}[1-8]{1,5}(@)(gmail|yahoo)(.com)$/,
              })}
              type="email"
              className="my-2 form-control"
            />
            {errors.email && (
              <p className="text-danger">
                {errors.email.message || "Invalid email"}
              </p>
            )}

            <label htmlFor="password">Password</label>
            <div className="d-flex align-items-center gap-2">
              <input
                {...register("password", { required: "Password is required" })}
                type={passwordShown ? "password" : "text"}
                className="my-2 form-control"
              />
              <MdRemoveRedEye
                className="text-muted"
                onClick={togglePasswordVisiblity}
                style={{ cursor: "pointer" }}
              />
            </div>
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}

            <Button type="submit" className="w-100 mt-3" variant="primary">
              Login
            </Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
