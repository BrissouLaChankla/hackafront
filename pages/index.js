import Image from 'next/image';
import styles from '../styles/Home.module.scss'
import Link from 'next/link';

import Tweet from '../components/Tweet';
import Trends from '../components/Trends';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user'


export default function Home() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [allTweets, setAllTweets] = useState([]);
  const [allHashtags, setAllHashtags] = useState([]);

  // A vomir dsl tout le monde
  if(checkHashtag()) {
    const word = "#"+checkHashtag();
    const divs = document.querySelectorAll("p div");
    for (const div of divs) {
      if (div.innerHTML.indexOf(word) !== -1) {
        div.parentNode.parentNode.style.display = "block"
      } else {
        div.parentNode.parentNode.style.display = "none"
      }
    }
  }


  function replaceValuesWithObjects(array) {
    let valueCounts = {};
    for (let i = 0; i < array.length; i++) {
      let value = array[i];
      if (valueCounts[value]) {
        valueCounts[value]++;
      } else {
        valueCounts[value] = 1;
      }
    }
    let result = [];
    for (let value in valueCounts) {
      result.push({value: value, count: valueCounts[value]});
    }
    return result;
  }

  const fetchTweets = () => {
    fetch('https://hackaback.vercel.app/tweets')
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          // Message = tweets (mal nommé dans le back)
          let sorted = data.message.sort((a, b) => b.date.localeCompare(a.date));
          setAllTweets(sorted);
          setMessage('');
        } else {
          alert(data.error);
        }
      });
  }

  const fetchHashtags = () => {
    fetch('https://hackaback.vercel.app/tweets/hashtags')
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setAllHashtags(replaceValuesWithObjects(data.message))
        } else {
          alert(data.error);
        }
      });
  }

  const handleLike = (tweetId) => {

    const body = {
      tweet_id: tweetId,
      token: user.token
    }
    fetch('https://hackaback.vercel.app/tweets/like', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          fetchTweets();
        } else {
          alert(data.error);
        }
      });
  }

  const handleDislike = (tweetId) => {

  }

  const handleDelete = (tweetid) => {
    fetch('https://hackaback.vercel.app/tweets/' + tweetid, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          fetchTweets();
        } else {
          alert(data.error);
        }
      });
  }

  function checkHashtag() {
    return window.location.hash.substr(1);
  }

  useEffect(() => {
    fetchHashtags()
  }, [allTweets])



  useEffect(() => {
    fetchTweets();

  }, [])

  const handleAddTweet = () => {

    const body = {
      message: message,
      token: user.token,
    }
    fetch('https://hackaback.vercel.app/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          fetchTweets();
        } else {
          alert(data.error);
        }
      });
  }

  const handleLogout = () => {
    dispatch(logout())
    window.location.href = '/login';
  }

  useEffect(() => {
    if (!user.token) {
      window.location.href = '/login';
    }
  }, [])



  return (
    <>
      <div className={`${styles.main} bg-secondary`}>
        <div className='d-flex flex-column justify-content-between'>
          <a href="/">
            <Image width={50} height={40} src="/images/white-logo.png" className="reverse" alt="White logo Twitter" />
          </a>
          <div>
            <div className='d-flex'>
              <Image width={48} height={48} src="/images/profile.jpg" className="profile" alt="White logo Twitter" />
              <div className='ms-2'>
                <strong className='text-white'>{user.firstname}</strong>
                <div className='text-muted'>
                  <small>
                    @{user.username}
                  </small>
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <button className={styles.logout} onClick={() => handleLogout()}>Logout</button>
            </div>
          </div>
        </div>
        <div className='text-white d-flex flex-column'>
          <div className="px-2">
            <h2>Home</h2>
            <div className="text-center px-3 my-2" >
              <textarea type="text" maxLength="280" className={styles.textinput} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What's up?" />
              <div className="text-end mt-1">
                {message.length}/280
                <button className={styles.tweetBtn} onClick={() => handleAddTweet()}>Tweet</button>
              </div>
            </div>
          </div>
          <div className={styles.allTweetsContainer}>
            {allTweets.map((tweetdata, i) => (
              user.token === tweetdata.user.token ?
                <Tweet key={i} {...tweetdata} idUserConnected={user.id} handleLike={handleLike} handleDislike={handleDislike} handleDelete={handleDelete} isAuthor={true} />
                :
                <Tweet key={i} {...tweetdata} idUserConnected={user.id} handleLike={handleLike} handleDislike={handleDislike} userToken={user.token} isAuthor={false} />
            ))}
          </div>
        </div>
        <div className='text-white'>
          <h2>Trends</h2>
          <div className='mt-3'>
            <div className={styles.trendsContainer}>
              {allHashtags.map((hashtag, i) => (
                hashtag.value !== "null" &&
                  <Trends hashtag={hashtag.value} occurence={hashtag.count} key={i} />
               
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
