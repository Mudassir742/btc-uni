"use client";


// deprecated following Hamzahs updates on Oct 2-3


import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

import { GET_USER } from "../../hooks/useAuth";

const LOG_OUT = gql`
  mutation logOut {
    logout(input: {}) {
      status
    }
  }
`;

export default function LogOut() {
  const [logOut, { called, loading, error, data }] = useMutation(LOG_OUT, {
    refetchQueries: [
      { query: GET_USER }
    ],
  });
  const loggedOut = Boolean(data?.logout?.status);

  useEffect(() => {
    logOut();
  }, [logOut]);

  return (
    <main>

      <h1>Log Out</h1>
      {!called || loading ? (
        <p>Logging out...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : !loggedOut ? (
        <p>Unable to log out. Please reload the page and try again.</p>
      ) : (
        <p>You have been logged out.</p>
      )}
    </main>
  );
}
