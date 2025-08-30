import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    // In a real app, you'd make an API call to your backend for authentication.
    // For this example, we'll use a very basic local storage check.
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
          // Successful sign-in
          localStorage.setItem("isLoggedIn", "true");
          setError("");
          navigate("/"); // Redirect to home page
        } else {
          setError("Invalid credentials.");
        }
      } catch (parseError) {
        setError("Error parsing user data.");
        console.error("Error parsing user data:", parseError);
      }
    } else {
      setError("No user registered. Please register first.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg rounded-lg md:w-1/3">
        <h3 className="text-2xl font-bold text-center">Sign In</h3>
        <form onSubmit={handleSignIn}>
          <div className="mt-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
