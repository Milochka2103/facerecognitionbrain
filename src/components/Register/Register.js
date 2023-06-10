import React, { useState } from "react";

export const Register = ({ onChangeRoute, loadUser }) => {
  const [nameRegistr, setNameRegistr] = useState("");
  const [emailRegistr, setEmailRegistr] = useState("");
  const [passwordRegistr, setPasswordRegistr] = useState("");

  const onNameRegistrChange = (e) => {
    setNameRegistr(e.target.value);
  };

  const onPasswordRegistrChange = (e) => {
    setPasswordRegistr(e.target.value);
  };

  const onEmailRegistrChange = (e) => {
    setEmailRegistr(e.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRegistr,
        email: emailRegistr,
        password: passwordRegistr
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          loadUser(user);
          onChangeRoute("home");
        }
      });
  };

  return (
    <article className="br3 ba dark-grey b--black-10 mv4 w-100 w-50-m 2-25-1 mw-5 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign up</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="name"
                id="name"
                onChange={onNameRegistrChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailRegistrChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordRegistrChange}
              />
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer">
              <input type="checkbox" /> Remember me
            </label>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign up"
            />
          </div>
        </div>
      </main>
    </article>
  );
};
