import React, {useState}  from 'react'
import Button from '@mui/material/Button';
import { storage, db } from './firebase';
import firebase from 'firebase';
import './ImageUpload.css'



function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');


    const handelChange = (e) =>{

        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }

    };

    const handelUpload = () =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) =>{
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);

            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            ()=>{
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    db.collection("posts").add({
                       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                       caption: caption,
                       imgurl: url,
                       username:username
                    });

                    setProgress(0);
                    setCaption('');
                    setImage(null);

                });
            }
        );
    };
  return (
    <div className='image_upload'>
       {/* i want to have a folling.. */}
       {/* captain input */}
       {/* file picker */}
       {/* post button */}
        
       {progress > 0 && progress < 100 ?
    <progress className='Progress' value={progress} max="100" /> : <div></div>
    }

       <input type='text' placeholder='Enter a caption' onChange={event => setCaption(event.target.value)} value={caption} />
       <input type='file' onChange={handelChange} />

       <Button type='submit' onClick={handelUpload}>Upload</Button>


    </div>
  )
}

export default ImageUpload
