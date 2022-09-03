import React, { useEffect, useState } from "react";
import UAuth from "@uauth/js";

const uauth = new UAuth({
  clientID: "6cdd592b-60b5-4bb5-b8aa-17f7a85f11a2",
  scope: "openid wallet",
  redirectUri:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:3000"
      : "http://localhost:3000",
});

const UnstoppableDomain = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();

  // Check to see if the user is inside the cache
  useEffect(() => {
    setLoading(true);
    uauth
      .user()
      .then(setUser)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [setUser]);

  // Login with a popup and save the user
  const handleLogin = () => {
    setLoading(true);
    uauth
      .loginWithPopup()
      .then(() => uauth.user().then(setUser))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  // Logout and delete user
  const handleLogout = () => {
    setLoading(true);
    uauth
      .logout()
      .then(() => setUser(undefined))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <p className="text-sm">Loading....</p>;
  }

  if (error) {
    console.error(error);
    return <>{error.stack}</>;
  }

  if (user) {
    console.log(user);
    return (
      <>
        <button
          className="text-lg font-medium p-1 hover:bg-blue-400 hover:rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <button
      className="text-lg font-medium p-1 bg-pink-400 rounded p-2"
      onClick={handleLogin}
    >
      Login with unstoppable
    </button>
  );
};

export default UnstoppableDomain;
