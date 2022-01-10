import { useEffect, useState } from 'react';
import Clarifai from 'clarifai';
import AppNavigationBar from './components/AppNavigationBar';
import ImageLink from './components/ImageLink';
import FaceRecognition from './components/FaceRecognition';


import './css/App.css';


//declare the app for clarifai API
const app = new Clarifai.App({
  apiKey: 'dbeb1da5516048aeabeefa556df86170'
 });


function App() {
  // declare a new state variable for the input of the image link
  const [inputLink, setinputLink] = useState('');
  //ONCE the user click on detect we will have this state to show the image on the page
  const [imageUrl, setimageUrl]= useState('');
  //faceBox is a state where we have the 4 point of the bounding box of the face
  const [faceBox, setfaceBox]= useState({});
  
  // calculateFaceLocation is a function that giving the response from clarifai will calculate the placement of for points frame of the face
  const calculateFaceLocation = (data) =>{
    console.log(data);
    //the data is the response of clarifai we extract the for point of face 
    const clarifaiFaceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    // the image on our page don't have a fixed width and heught so we have to extract them 
    const image= document.getElementById('imageToDetect');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    //we will calculate the placement of the for point of the bounding box
    return( {
      leftCol : (clarifaiFaceBox.left_col * imageWidth),
      topRow : (clarifaiFaceBox.top_row * imageHeight),
      rightCol : (imageWidth -(clarifaiFaceBox.right_col * imageWidth)),
      bottomRow : (imageHeight - (clarifaiFaceBox.bottom_row * imageHeight))
    }) 
    
  }
  
  //when we change the window width it will recalculate the frame of the face because the width of picture will change 
  useEffect(()=>{
    //the change will have to happen just when we have an image shown on the page 
    if(imageUrl) { onButtonSubmit()}
  });

  const onButtonSubmit =() =>{
    setimageUrl(inputLink);
    // we send the image link to the face detection model of clarifai
    app.models
      .predict( "a403429f2ddf4b49b307e318f00e528b",
        inputLink)
        //after we get the response of clarifai we have to calculate the placement of the for point of the bounding box and change the state faceBox
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
