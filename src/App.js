import './App.css';
import { ImageLinkForm } from './components/ImageLinkForm/ImageLinkForm';
import { Logo } from './components/Logo/Logo';
import { Navigation } from './components/Navigation/Navigation';
import { Rank } from './components/Rank/Rank';
import "tachyons";
import ParticlesBg from 'particles-bg';

function App() {
  return (
    <div className="App">
      <ParticlesBg className="particles" type="circle" num={5} bg={true} />
      <Navigation />
      <Logo />
      <Rank/>
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
