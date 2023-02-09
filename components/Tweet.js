import styles from '../styles/Tweet.module.scss'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Tweet() {
	return (
		<div className={`${styles.tweet} p-2`}>
			<div className='d-flex align-items-center'>
          		<Image width={50} height={40} src="/images/white-logo.png" className="reverse" alt="White logo Twitter" />
				<strong className='ms-2'>Antoine</strong>
				<small className='text-muted ms-1'>@AntoileLeProf</small>
				<small className='text-muted ms-1'>- 5 hours</small>
			</div>
			<p>Welcome to #hackatweeet guys 😎</p>
			<div className="d-flex align-items-center">
				<FontAwesomeIcon  icon={faHeart} />
			<span className="ms-1">0</span>
			</div>
		</div>
	)
}

export default Tweet;
