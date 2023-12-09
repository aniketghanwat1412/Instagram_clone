import React, { useEffect, useState } from 'react';
import './post.css';
import Avatar from '@mui/material/Avatar';
import firebase from 'firebase';
import {db} from './firebase'


function Post({user,postId,username, caption, imgurl}) {

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() =>{
    let unsubscribe;
    if(postId){
      unsubscribe=db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('timestamp','desc')
      .onSnapshot((snapshot) =>{
        setComments(snapshot.docs.map((doc)=> doc.data()));
      });
    }

    return () => {
       unsubscribe();
    };

  },[postId])

  const postComment = (event)=>{
    event.preventDefault();

    db.collection('posts').doc(postId).collection('comments').add({
      text:comment,
      username: user.displayName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');


  }

  return (

    <div className='post'>
    <div className='post_header'>
    <Avatar
     className='post_avatar'
     alt="Remy Sharp" 
     src={imgurl} />

    <h3 className='post_username'>{username}</h3>

    </div>
   
      <img className='post_img' src={imgurl} alt="hello"></img>

      <h4 className='post_text'>{username}: {caption}</h4>

      <div className='post_comments'>
      {comments.map((comment) => (

        <p>
          <strong>{comment.username}: </strong>{comment.text}
        </p>

      ))}
      </div>

      {user && 
        (
          <form className='post_comment_box'>

        <input
        className="post_input"
        type='text'
        placeholder='Add a comment...'
        value={comment}
        onChange={(e)=>setComment(e.target.value)} 
        />

        <button
        disabled={!comment}
        type='submit'
        className='post_button'
        onClick={postComment}
        >
       POST
        </button>
      </form>

        )}

    </div>

    


    
  )
}

export default Post
