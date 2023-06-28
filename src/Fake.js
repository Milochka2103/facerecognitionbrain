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
/* import Clarifai from "clarifai"; */
import { Register } from "./components/Register/Register";
/* import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc"; */

/* const app = new Clarifai.App({
  apiKey: "11aefaaf51884f2fa4484132427c48e5",
}); */

function Fake() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [entries, setEntries] = useState(0);
  const [joined, setJoined] = useState("");

  const resetValues = () => {
    setInput("")
    setImageUrl("")
    setBox({})
    setRoute("signin")
    setId("")
    setName("")
    setEmail("")
    setEntries(0)
    setJoined("")
  }

  const loadUser = (data) => {
    setId(data.id);
    setName(data.name);
    setEmail(data.email);
    setEntries(data.entries);
    setJoined(data.joined);
  };

  /*  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }); */

  /* const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    console.log(box);
    setBox(box);
  }; */

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  /* const stub = ClarifaiStub.grpc();

  const metadata = new grpc.Metadata();
  metadata.set("authorization", "Key 11aefaaf51884f2fa4484132427c48e5");

  const handleApiCall = (req, res) => {
    stub.PostModelOutputs(
      {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id: "6dc7e46bc9124c5c8824be4822abe105",
        inputs: [
          {
            data: { image: { url: req.body.input } },
          },
        ],
      },
      metadata,
      (err, response) => {
        if (err) {
          console.log("Error: " + err);
          return;
        }

        if (response.status.code !== 10000) {
          console.log(
            "Received failed status: " +
              response.status.description +
              "\n" +
              response.status.details
          );
          return;
        }

        console.log("Predicted concepts, with confidence values:");
        for (const c of response.outputs[0].data.concepts) {
          console.log(c.name + ": " + c.value);
        }
        req.json(response);
      }
    );
  };
*/
  /* const onPictureSubmit = () => {
    setImageUrl(input);
    app.models
      .predict("face-detection", input)
      .then((response) => {
        if(response) {
        fetch('http://localhost:3000/image', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: id
          })
        })
          .then(response => response.json())
          .then(count => setEntries(count))
        }
        displayFaceBox(calculateFaceLocation(response)}))
      .catch((err) => console.log(err));
  }; */

  const onChangeRoute = (route) => {
    if (route === "signout") {
      resetValues()
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
          <Rank name={name} entries={entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            /* onButtonSubmit={onPictureSubmit} */
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
      ) : route === "signin" ? (
        <SignIn onChangeRoute={onChangeRoute} loadUser={loadUser} />
      ) : (
        <Register onChangeRoute={onChangeRoute} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;