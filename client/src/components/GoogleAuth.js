import React, { useEffect, useState } from "react";

const GoogleAuth = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    //authenticate user
    const authenticate = async () => {
      window.gapi.load("client:auth2", async () => {
        await window.gapi.client.init({
          clientId:
            "395460103067-0sas7phd1tod9m0qukf5nig36i7leb6o.apps.googleusercontent.com",
          scope: "email",
        });
        const auth = window.gapi.auth2.getAuthInstance();
        setStatus(auth.isSignedIn.get());
      });
    };
    authenticate();
  }, []);

  const renderAuthButton = () => {
    if (status === null) {
      return <div>Not sign in</div>;
    } else if (status) {
      return <div>I'm sign in</div>;
    } else {
      return <div>sign in fail</div>;
    }
  };
  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
