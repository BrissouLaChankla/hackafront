import { useState } from 'react';
import Login from '../components/login/Login';
import Modal from '../components/login/Modal';

export default function Home () { 
  const [showModal, setShowModal] = useState(false)
  const [infoModal, setInfoModal] = useState({})

const launchModal = (which) => {
  if(which === "signin") {
    setInfoModal({
      firstname:true,
      title: "Connect to Hackatweet"
    });
  } else {
    setInfoModal({
      firstname:false,
      title: "Create your Hackatweet account"
    });
  }

  
  setShowModal(true)
}

const closeModal = () => {
  setShowModal(false)
}
  return (
    <>
    <Login launchModal={launchModal} />
    {showModal &&
      <Modal infos={infoModal} closeModal={closeModal} />
    }
    </>
  )
}
