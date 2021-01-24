import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleAuth = (props) => {
  // variable for Google OAuth Instance
  const authRef = useRef(null);
  //input function for checking if state change (for listen function)
  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      props.signIn(authRef.current.currentUser.get().getId());
    } else {
      props.signOut();
    }
  };

  //event to sign in
  const OnSignIn = () => {
    authRef.current.signIn();
  };

  const OnSignOut = () => {
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
        //first time check
        onAuthChange(authRef.current.isSignedIn.get());
        //event listen for isSignedIn change for other time
        //onAuthChange is callback
        authRef.current.isSignedIn.listen(onAuthChange);
      });
    };
    authenticate();
  }, []);

  const renderAuthButton = () => {
    if (props.isSignedIn === null) {
      return <button className="ui red loading button">Loading</button>;
    } else if (props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={OnSignOut}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={OnSignIn}>
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };
  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
