import { useState } from "react";
import { loginWithGoogle, loginWithEmail, registerWithEmail } from "../authService";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
        <h2 className="text-xl font-semibold text-center">Login / Register</h2>

        {/* Google Login */}
        <button
          onClick={loginWithGoogle}
          className="w-full bg-red-500 text-white py-2 rounded"
        >
          Sign in with Google
        </button>

        {/* Email / Password */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            onClick={() => loginWithEmail(email, password)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <button
            onClick={() => registerWithEmail(email, password)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
