import React from "react";

export const Navigation = ({ onChangeRoute, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onChangeRoute("signout")}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign out
        </p>
      </nav>
    );
  } else {
    return (
      <div>
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => onChangeRoute("signin")}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign In
          </p>
          <p
            onClick={() => onChangeRoute("register")}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign up
          </p>
        </nav>
      </div>
    );
  }
};
