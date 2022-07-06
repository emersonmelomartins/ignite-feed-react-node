import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Login() {
  const navigate = useNavigate();
  const { signed, login, register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    signed && navigate("/home");
  }, [signed]);

  function handleLogin() {
    login("string@string.com", "string");
  }

  return (
    <>
      <h1>login</h1>
      <button onClick={handleLogin}>sign in</button>
    </>
  );
}
