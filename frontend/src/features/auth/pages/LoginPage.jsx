import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  clearError,
  loginUser,
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
} from "../store/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(clearError());
    await dispatch(loginUser(formData));
  }

  if (isAuthenticated) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <section className="tasks-section">
      <h2>Login</h2>
      {error ? <p>{error}</p> : null}
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        No account? <Link to="/register">Create one</Link>
      </p>
    </section>
  );
}

export default LoginPage;
