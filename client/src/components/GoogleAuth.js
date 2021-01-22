import React, { useEffect, useRef, useState } from "react";

const GoogleAuth = () => {
  const [status, setStatus] = useState(null);

  // variable for Google OAuth Instance
  const authRef = useRef(null);
  //input function for checking if state change (for listen function)
  const onAuthChange = (isSignedIn) => {
    setStatus(isSignedIn);
  };

  //event to sign in
  const signIn = () => {
    authRef.current.signIn();
  };

  const signOut = () => {
    authRef.current.signOut();
  };

  useEffect(() => {
    //authenticate user

    const authenticate = async () => {
      window.gapi.load("client:auth2", async () => {
        await window.gapi.client.init({
          clientId:
            "395460103067-0sas7phd1tod9m0qukf5nig36i7leb6o.apps.googleusercontent.com",
          scope: "email",
        });
        authRef.current = window.gapi.auth2.getAuthInstance();
        setStatus(authRef.current.isSignedIn.get());
        authRef.current.isSignedIn.listen(onAuthChange);
      });
    };
    authenticate();
  }, []);

  const renderAuthButton = () => {
    if (status === null) {
      return <button className="ui red loading button">Loading</button>;
    } else if (status) {
      return (
        <button className="ui red google button" onClick={signOut}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={signIn}>
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };
  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
