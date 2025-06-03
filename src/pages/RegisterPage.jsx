import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/Auth/AuthLayout';
import RegisterForm from '../components/Auth/RegisterForm';
import fieldImg from '../assets/Football.jpg';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (form) => {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const payload = {
        name: form.fullName,
        email: form.email,
        password: form.password,
      };

      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      await autoLogin(form.email, form.password);

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const autoLogin = async (email, password) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Auto login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/profile");

    } catch (err) {
      console.error(err);
      setError("Auto login error");
    }
  };

  return (
    <AuthLayout backgroundImage={fieldImg}>
      <RegisterForm onRegister={handleRegister} error={error} />
    </AuthLayout>
  );
};

export default RegisterPage;
