import Image from 'next/image';
import styles from '../styles/Home.module.scss'

import LastTweets from '../components/LastTweets';
import Trends from '../components/Trends';
import { useState } from 'react';


export default function Home() {

  const [message,  setMessage] = useState("");


  return (
    <>
      <div className={`${styles.main} bg-secondary`}>
        <div className='d-flex flex-column justify-content-between'>
          <Image width={50} height={40} src="/images/white-logo.png" className="reverse" alt="White logo Twitter" />
          <div>
            <div className='d-flex'>
              <Image width={50} height={40} src="/images/white-logo.png" className="reverse" alt="White logo Twitter" />
              <div className='ms-2'>
                <strong className='text-white'>John</strong>
                <div className='text-muted'>
                  <small>
                    @JohnCena
                  </small>
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <button className={styles.logout}>Logout</button>
            </div>
          </div>
        </div>
        <div className='text-white '>
          <div className="px-2">

            <h2>Home</h2>
            <div className="text-center px-3 my-2" >
              <textarea type="text" maxlength="280" className={styles.textinput} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What's up?" />
              <div className="text-end mt-1">
                {message.length}/280
                <button className={styles.tweetBtn}>Tweet</button>
              </div>
            </div>
          </div>
          <LastTweets />
        </div>
        <div className='text-white'>
          <h2>Trends</h2>
          <div className='mt-3'>
              <div className={styles.trendsContainer}>
              <Trends /> 
              <Trends /> 
              <Trends /> 
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
