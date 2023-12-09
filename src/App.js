import React, {useState, useEffect} from 'react';
import './App.css';
import Post from "./post";
import {db, auth} from "./firebase";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import ImageUpload from './imageUpload';
import { InstagramEmbed } from 'react-social-media-embed';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {

 const [posts, setPosts] = useState([]);
 const [open, setOpen] = useState(false);
 const  [opensignin, setOpensignin] = useState(false);
//  const [handleOpen, setHandelopen] = useState(false);
 const [email, setEmail] = useState('');
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [user , setUser] = useState(null);


 useEffect(() =>{
 const unsubscribe = auth.onAuthStateChanged((authUser) =>{

    if(authUser){

      console.log(authUser);
      setUser(authUser);


    } else{
      setUser(null);
    }

  })

  return () =>{
    unsubscribe();
  }

  
 },[user,username])

 useEffect(() => {

  db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot  => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post:doc.data()
    })));
  });

 }, []);

 const signUp = (event)=>{

  event.preventDefault();

  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser)=>{
    return authUser.user.updateProfile({
      displayName:username
    })

  })
  .catch((error) => alert(error.message))

  setOpen(false);
 }

 const signIn = (event)=>{

  event.preventDefault();

  auth.signInWithEmailAndPassword(email,password)
  .catch((error) => alert(error.message))

  setOpensignin(false);
 }

 

  return (
    <div className="app">

   
     
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
       <Box sx={style}>

      <form className='app_signup'>
        <center>
        <img className="app_headerimg1" alt="hello" 
        src ="data:image/jpeg;base64,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">
        </img>
       </center>
       <Input
       placeholder='email'
       type='text'
       value={email}
       onChange={(e) => setEmail(e.target.value)} 
       />

      <Input
       placeholder='username'
       type='text'
       value={username}
       onChange={(e) => setUsername(e.target.value)} 
       /> 

      <Input
       placeholder='password'
       type='text'
       value={password}
       onChange={(e) => setPassword(e.target.value)} 
       /> 

      <Button type='submit' onClick={signUp}>sign up</Button>


    </form>
        </Box>
      </Modal>

      <Modal
        open={opensignin}
        onClose={() => setOpensignin(false)}
      >
       <Box sx={style}>

      <form className='app_signup'>
        <center>
        <img className="app_headerimg1" alt="hello" 
        src ="data:image/jpeg;base64,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">
        </img>
       </center>
       <Input
       placeholder='email'
       type='text'
       value={email}
       onChange={(e) => setEmail(e.target.value)} 
       />
      <Input
       placeholder='password'
       type='text'
       value={password}
       onChange={(e) => setPassword(e.target.value)} 
       /> 

      <Button type='submit' onClick={signIn}>LogIn</Button>


    </form>
        </Box>
      </Modal>

      
      <div className="app_header">
        <img className="app_headerimg" alt="hello" 
        src ="./images/insat.svg">
        </img>
        {user ? (<Button className='login' onClick={() => auth.signOut()}>logout</Button>) :
       (
        <div className='login'>
        <Button onClick={() => setOpen(true)}>sign up</Button>
        <Button onClick={() => setOpensignin(true)}>LogIn</Button>

        </div>
        )}
      </div>
      
      {/* <h1>hello</h1> */}

      <div className='app_posts'>

      <div className='app_postright'>
      {
        posts.map(({id,post}) => (
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imgurl={post.imgurl} />

      ) )
      }

      </div>
      

      <div className='app_postleft'>
      <InstagramEmbed url="https://www.instagram.com/aniket14122002/" width={328} />
    </div>


      </div>

      

      {user?.displayName ? (<ImageUpload username={user.displayName} />) :
      (<h3>Sorry you nedd to login</h3>) }
      

    </div>
  );
}

export default App;
