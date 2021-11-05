

import '../css/ImageLink.css';

const ImageLink = ({setinputLink, onButtonSubmit}) => {
    
   const handleLinkChange =(e) =>{
        e.preventDefault();
        setinputLink(e.target.value);
    }

    return (
        <div className='uploadForm'>
            <div className='FormContainer'>
                <p className='textForm'>
                    {'you can detect a face on any image giving the link '}
                </p>
                <div>
                    <input type='text' className='Input-text' onChange={handleLinkChange}></input>
                    <button className='Btndetect' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
            
        </div>
    );
}

export default ImageLink;