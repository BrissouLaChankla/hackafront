import Image from 'next/image';
import styles from '../../styles/Login.module.scss'
import Button from 'components/assets/Button';

function Login(props) {

	const launchModal = (which) => {
		props.launchModal(which)
	}
	return (
		<div className="d-flex h-vh-100">
			<div className={`${styles.bgContainer} d-flex align-items-center justify-content-center `}>
			<Image width={500} height={400} src="/images/white-logo.png" className="reverse" alt="White logo Twitter" />
			</div>
			<div className={`${styles.textContainer} text-white bg-secondary p-3`}>
				<Image width={50} height={40} src="/images/white-logo.png" className="reverse" alt="White logo Twitter" />
				
				<h1 className='mt-5'>See what's <br /> happening</h1>
				<h2 className='mt-5'>Join Hackatweet today.</h2>
				<span onClick={() => launchModal("signup")}>
					<Button style="fill" text="Sign up"   />
				</span>
				<div className='mt-2'>
					<strong>Already have an account?</strong>
				</div>
				<div className='mt-2'>
				<span onClick={() => launchModal("signin")}>
					<Button style="outline" text="Sign in" />
				</span>
				</div>
				
			</div>
		</div>
    )
}

export default Login;
