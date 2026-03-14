import React from "react";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Reg = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Register submitted", data);
  };

  return (
    <Container className="pb-5">
      <Card className="form-card">
        <Card.Body>
          <h2 className="mb-4">Create an account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="userName">Name</label>
            <input
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z]{3,15}$/,
                  message: "Name must be 3-15 letters",
                },
              })}
              type="text"
              className="my-2 form-control"
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}

            <label htmlFor="userEmail">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z]{3,15}[1-8]{1,5}(@)(gmail|yahoo)(.com)$/,
                  message: "Email must be a valid gmail or yahoo address",
                },
              })}
              type="email"
              className="my-2 form-control"
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}

            <label htmlFor="user">Username</label>
            <input
              {...register("userName", {
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z]{3,5}[\S]*$/,
                  message: "Username must start with 3-5 letters",
                },
              })}
              type="text"
              className="my-2 form-control"
            />
            {errors.userName && (
              <p className="text-danger">{errors.userName.message}</p>
            )}

            <label htmlFor="password">Password</label>
            <div className="d-flex flex-row">
              <input
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^[a-zA-z]{8,}[1-6][$|&|+|,|:|;|=|?|@|#|'|<|>|.|-|^|*|(|)|%|!]$/,
                    message:
                      "Password must be 8+ chars and end with a special character",
                  },
                })}
                type="password"
                className="my-2 form-control"
              />
            </div>
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}

            <label htmlFor="reEnterPassword">Confirm Password</label>
            <div className="d-flex flex-row">
              <input
                {...register("reEnteredpassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
                className="my-2 form-control"
              />
            </div>
            {errors.reEnteredpassword && (
              <p className="text-danger">{errors.reEnteredpassword.message}</p>
            )}

            <Button className="w-100 mt-3" variant="primary" type="submit">
              Register
            </Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Reg;
