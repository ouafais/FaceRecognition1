

import '../css/FaceRecognition.css'


const FaceRecognition = ({faceBox, imageUrl}) => {
    return (
        <div className='imageContainer'>
            <div className='postionImage'>
                <img id='imageToDetect'  alt ='face detection' src={imageUrl} />
                <div className='boundingBox' style={{top: faceBox.topRow, right: faceBox.rightCol, bottom: faceBox.bottomRow, left: faceBox.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;