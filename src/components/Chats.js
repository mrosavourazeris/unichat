import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'

import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const Chats = () => {

  const history = useHistory()
  const { user } = useAuth();

  console.log(user)


  const handleLogout = async() => {
    await auth.signOut()
    history.push('/')
  }

  useEffect (() => {
    if(!user) {
      history.push('/')

      return 
    }

    axios.get('https://api.chatengine.io/users/me',{
      headers: {
        'projet-id': '074f403a-9da1-4989-9a07-c8931ca276ab',
        'user-name': user.email,
        'user-secret': user.uid,
      }
    })

  }, [user,history])


  return (
    <div className="chats-page">
        <div className="nav-bar">
          <div className="logo-tab">
            Unichat
          </div>
          <div onClick={handleLogout} className="logout-tab">
            Logout
          </div>
        </div>

        <ChatEngine
          height='calc(100vh - 66px)'
          projectId='074f403a-9da1-4989-9a07-c8931ca276ab'
          userName='.'
          userSecret='.'
        />

    </div>
  )
}

export default Chats;