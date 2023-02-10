
import Link from 'next/link';

function Trends(props) {

	return (
			<Link className="div d-flex flex-column" href={`${props.hashtag}`}>
				<strong className="text-white">{props.hashtag}</strong>
				<small className="text-muted mt-1">{props.occurence} Tweet
					{props.occurence > 1 ?
						"s" : ""
					}
				</small>
			</Link>
	)
}

export default Trends;
