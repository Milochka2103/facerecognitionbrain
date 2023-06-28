import "./App.css";
import { ImageLinkForm } from "./components/ImageLinkForm/ImageLinkForm";
import { Logo } from "./components/Logo/Logo";
import { Navigation } from "./components/Navigation/Navigation";
import { Rank } from "./components/Rank/Rank";
import { FaceRecognition } from "./components/FaceRecognition/FaceRecognition";
import { SignIn } from "./components/SIgnIn/SignIn";
import "tachyons";
import ParticlesBg from "particles-bg";
import { /* useEffect, */ useState } from "react";
import { Register } from "./components/Register/Register";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  /*   const [email, setEmail] = useState(""); */
  const [entries, setEntries] = useState(0);
  /*   const [joined, setJoined] = useState(""); */

  const resetValues = () => {
    setInput("");
    setImageUrl("");
    setBox({});
    setRoute("signin");
    setId("");
    setName("");
    /*     setEmail(""); */
    setEntries(0);
    /*     setJoined(""); */
  };

  const loadUser = (data) => {
    setId(data.id);
    setName(data.name);
    /*     setEmail(data.email); */
    setEntries(data.entries);
    console.log(entries)
    /*     setJoined(data.joined); */
  };

  /*  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }); */

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    let box = {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
    return box;
  };

  const displayFaceBox = (values) => {
    setBox(values);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onPictureSubmit = () => {
    setImageUrl(input);
    fetch(
      "https://desolate-everglades-54148-6bdb29bf504f.herokuapp.com/imageurl",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: input,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch(
            "https://desolate-everglades-54148-6bdb29bf504f.herokuapp.com/image",
            {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: id,
              }),
            }
          )
            .then((response) => response.json())
            .then((count) => setEntries(count))
            .catch(console.log);
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  const onChangeRoute = (route) => {
    if (route === "signout") {
      resetValues();
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <ParticlesBg className="particles" type="circle" num={5} bg={true} />
      <Navigation isSignedIn={isSignedIn} onChangeRoute={onChangeRoute} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank name={name} entries={entries.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onPictureSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
      ) : route === "signin" || route === "signout" ? (
          <SignIn onChangeRoute={onChangeRoute} loadUser={loadUser} setEntries={setEntries} />
      ) : (
        <Register onChangeRoute={onChangeRoute} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
