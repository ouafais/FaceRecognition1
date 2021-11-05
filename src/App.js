import { useEffect, useState } from 'react';
import Clarifai from 'clarifai';
import AppNavigationBar from './components/AppNavigationBar';
import ImageLink from './components/ImageLink';
import FaceRecognition from './components/FaceRecognition';


import './css/App.css';


//declare the app for clarifai API
const app = new Clarifai.App({
  apiKey: '8e7dac5a22c443c680bbd6d133025bd4'
 });


function App() {
  // declare a new state variable for the input of the image link
  const [inputLink, setinputLink] = useState('');
  const [imageUrl, setimageUrl]= useState('');
  const [faceBox, setfaceBox]= useState({});
  
  // calculateFaceLocation is a function that giving the response from clarifai will calculate the placement of for points frame of the face
  const calculateFaceLocation = (data) =>{
    const clarifaiFaceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image= document.getElementById('imageToDetect');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    return( {
      leftCol : (clarifaiFaceBox.left_col * imageWidth),
      topRow : (clarifaiFaceBox.top_row * imageHeight),
      rightCol : (imageWidth -(clarifaiFaceBox.right_col * imageWidth)),
      bottomRow : (imageHeight - (clarifaiFaceBox.bottom_row * imageHeight))
    }) 
    
  }
  
  //when we change the window width it will recalculate the frame of the face because the width of picture will change 
  useEffect(()=>{
    if(imageUrl) { onButtonSubmit()}
  });

  const onButtonSubmit =() =>{
    setimageUrl(inputLink);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL,
        inputLink)
      .then(response => setfaceBox(calculateFaceLocation(response)))
      .catch(err => console.log(err));
  };


  return (
    <div className="container">
      <AppNavigationBar className="Navbar"/>
      <ImageLink  
        setinputLink={setinputLink} 
        onButtonSubmit={onButtonSubmit}
        />
        
        <FaceRecognition faceBox={faceBox} imageUrl={imageUrl}/>
      
    </div>
  );
}

export default App;
