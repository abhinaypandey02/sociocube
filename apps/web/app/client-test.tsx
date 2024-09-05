"use client";
import React, { useState } from "react";
import { GET_CURRENT_USER } from "../lib/queries";
import { useAuthQuery } from "../lib/apollo-client";

export default function ClientTest() {
  const [user, setUser] = useState<string | null>();
  const query = useAuthQuery();
  const getCurrentUser = () => {
    query(GET_CURRENT_USER)
      .then((data) => {
        setUser(data.getCurrentUser.email);
      })
      .catch(console.error);
  };
  return (
    <div>
      User email: {user}
      <br />
      <button onClick={getCurrentUser}>Get current user</button>
    </div>
  );
}
