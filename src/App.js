import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from './components/Particles/Particles';
import {Component} from 'react';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import 'tachyons';

const initialState = {
  input: '',
  imageURL: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
  }
  
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map(region => 
      region.region_info.bounding_box);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return clarifaiFace.map(face => {
      return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height),
          }
      });
  }
  

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
          fetch('https://face-block-back-end.onrender.com/imageurl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              input: this.state.input
            })
          })
            .then(response => response.json())
            .then(response => {
              if (response) {
                fetch('https://face-block-back-end.onrender.com/image', {
                  method: 'put',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    id: this.state.user.id 
                  })
                })
                
                .then(response => response.json())
                  .then(count => {
                    this.setState(Object.assign(this.state.user, {entries: count}))
                  })
                  .catch(console.log)
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
              })
              .catch(err => console.log(err));
  }
  
  onRouteChange = (route) => {
        if (route === 'signout') {
          this.setState(initialState)
        } else if (route === 'home') {
          this.setState({isSignedIn: true})
        }
        this.setState({route: route});
  }


  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
  return (
    <div className="App">
      <Particles />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      
      <div className=''>
        <Logo />
      </div>
      {route === 'home'
        ? <div>
          {/* <Logo /> */}
          <Rank name={this.state.user.name}
            entries={this.state.user.entries} />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
        </div>
        : (
          this.state.route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

          )
      }
      
      <footer class="pv4 ph3 ph5-m ph6-l ">
  <small class="f6 db tc">© 2023 <b class="ttu"> <a
        rel="noreferrer"
            target="_blank"
            href="https://meziszem.netlify.app/">mez</a></b>, All Rights Reserved</small>
  <div class="tc mt3 cta">
  <a
        rel="noreferrer"
            target="_blank"
            className="cta-btn grow"
            href="mailto:meseretfh@gmail.com"
        >
          <img src="mail_ico.png"
            alt="github"
            width={40}
            /></a>
<a
        rel="noreferrer"
            target="_blank"
            className="cta-btn grow"
            href="https://github.com/meziszem"
        >
          <img src="github_ico.png"
            alt="github"
            width={50}
            /></a>  </div>
</footer>
      
    </div>
    
    );
  }
}

export default App;
