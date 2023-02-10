import styles from '../styles/Tweet.module.scss'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';

function Tweet(props) {
	const condStyles = {
		likedHeart:{
		  color:"white",
		}
	  };
	

	if(props.hasliked.includes(props.idUserConnected)) {
		condStyles.likedHeart.color = "red";
	}
	
	function replaceHashtagsWithLinks(text) {
		return text.replace(/#(\w+)/g, '<a href="#$1">#$1</a>');
	  }


	function HashtagLinker( text ) {
		const html = replaceHashtagsWithLinks(text);
		return <div dangerouslySetInnerHTML={{ __html: html }} />;
	  }
	  
	return (
		<div className={`${styles.tweet} p-2`}>
			<div className='d-flex align-items-center'>
				<Image width={48} height={48} src="/images/profile.jpg" className="profile" alt="Profile pic" />
				<strong className='ms-2'>{props.user.firstname}</strong>
				<small className='text-muted ms-1'>@{props.user.username}</small>
				<small className='text-muted ms-1'>- <Moment fromNow>{props.date}</Moment></small>
			</div>
			<p>{HashtagLinker(props.message)}</p>
			<div className="d-flex align-items-center">
				<FontAwesomeIcon icon={faHeart} style={condStyles.likedHeart} onClick={() => props.handleLike(props._id)} className={styles.likeIcon} />
				<span className="ms-1">{props.hasliked.length}</span>
				{props.isAuthor &&
					<span className='ms-2'>
						<FontAwesomeIcon icon={faTrash} className={styles.trashIcon} onClick={() => props.handleDelete(props._id)} />
					</span>
				}
			</div>
		</div>
	)
}

export default Tweet;
