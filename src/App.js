import React, { Component } from 'react';
// import Particles from 'react-particles-js';
import ParticlesBg from 'particles-bg'
import Clarifai from 'clarifai';
// import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import SignIn from './components/signIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: 'b026f34cc94c4a8caa3f47a30a32b893'
});

// No Longer need this. Updated to particles-bg
// const particlesOptions = {
//   particles: {
//     number: {
//       value: 30,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     }
//   }
// }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

  calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    // app.models
    //   .predict(

    // ***** UNCOMMENT ABOVE ^^^
    // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
    // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
    // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
    // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
    // is to use a different version of their model that works like the ones found here: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
    // so you would change from:
    // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    // to:
    // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)

      //   Clarifai.FACE_DETECT_MODEL,
      //   this.state.input)
      // .then(response => {
      //   console.log('hi', response)
      //   if (response) {
      //     fetch('http://localhost:3000/image', {
      //       method: 'put',
      //       headers: {'Content-Type': 'application/json'},
      //       body: JSON.stringify({
      //         id: this.state.user.id
      //       })
      //     })
      //       .then(response => response.json())
      //       .then(count => {
      //         this.setState(Object.assign(this.state.user, { entries: count}))
      //       })

      //   }
      //   this.displayFaceBox(this.calculateFaceLocation(response))
      // })
      // .catch(err => console.log(err));


      // **********************   LIVE WITH VID  *******************
      app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL,
          this.state.input)
        .then( response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, route, imageURL, box } = this.state;
    const { onRouteChange, onInputChange, onButtonSubmit } = this;
    return (
      <div className="App">
        <ParticlesBg className='particles' type="circle" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
        { route === 'home'
          ? 
            <>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={onInputChange}
                onButtonSubmit={onButtonSubmit}
              /> 
              <FaceRecognition url={imageURL} box={box} />
            </>
          : (
            route === 'signin' || route === 'signout'
            ? <SignIn onRouteChange={onRouteChange} />
            : <Register onRouteChange={onRouteChange} />
          ) 
          
        }
      </div>
    );
  }
}

export default App;
