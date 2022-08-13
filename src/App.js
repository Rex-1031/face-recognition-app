import { Component } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';



const initialState = {
  input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        email: '',
        name: '',
        entries: 0,
        joined: ''
      }
    }


class  App extends Component {
  constructor(){
    super()
    this.state = initialState
  }

  loadUser = (data)=>{
    this.setState( {user:{
      id: data.id,
      email: data.email,
      name: data.name,
      entries: data.entires,
      joined: data.joined
    }})
  }

  calculateFaceLocation = data =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width)
    const height = Number(image.height)
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = box =>{

    this.setState({box: box})
  }

  onInputChange = e =>{
    this.setState({input: e.target.value})
  }

  onButtonSubmit = ()=>{
    this.setState({imageUrl: this.state.input})
      fetch('https://murmuring-depths-13881.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response =>{
        if(response){
          fetch('https://murmuring-depths-13881.herokuapp.com/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count=>{
            this.setState(
              Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({initialState})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }  
  
  render(){
    const { isSignedIn, imageUrl, route, box }=this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {
          route === 'home'?
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm 
              onInputChange ={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>:
          (
            route === 'signin'?
            <Signin  loadUser={this.loadUser} onRouteChange ={this.onRouteChange}/>:
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
          

        }
      </div>
    );

  }
}

export default App;
