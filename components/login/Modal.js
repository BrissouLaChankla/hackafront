import styles from '../../styles/Modal.module.scss'
import inputStyles from '../../styles/Input.module.scss'
import { useState } from 'react';
import Image from 'next/image';
import Button from 'components/assets/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../reducers/user'


function Modal(props) {
	const dispatch = useDispatch();

    const [signUsername, setSignUsername] = useState('');
    const [signFirstname, setSignFirstname] = useState('');
    const [signPassword, setSignPassword] = useState('');

    const handleSignUp = () => {
        const body = {
            firstname: signFirstname,
            username: signUsername,
            password: signPassword
        }

        fetch('https://hackaback.vercel.app/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ username: data.username, firstname:data.firstname, token: data.token, id:data.id }));
                    window.location.href = '/';
                } else {
                    alert(data.error);
                }
            });
    }

    const handleSignIn = () => {
        const body = {
            username: signUsername,
            password: signPassword
        }

        fetch('https://hackaback.vercel.app/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ username: data.username, firstname:data.firstname, token: data.token, id:data.id }));
                    window.location.href = '/';
                } else {
                    alert(data.error)
                }
            });
    }

    return (
        <>
            <div className={styles.backdrop} onClick={() => props.closeModal()}></div>
            <div className={styles.modal}>
                <div className='text-right'>
                    <span onClick={() => props.closeModal()} className="pointer">X</span>
                </div>
                <div className="text-center">
                    <Image width={50} height={40} src="/images/white-logo.png" className="reverse" alt="White logo Twitter" />
                </div>
                <h2 className='text-center'>{props.infos.title}</h2>
                {!props.infos.firstname ?
                    <>
                        <input type="text" className={inputStyles.text} onChange={(e) => setSignFirstname(e.target.value)} value={signFirstname} placeholder="Firstname" />
                        <input type="text" className={inputStyles.text} onChange={(e) => setSignUsername(e.target.value)} value={signUsername} placeholder="Username" />
                        <input type="password" className={inputStyles.text} onChange={(e) => setSignPassword(e.target.value)} value={signPassword} placeholder="Password" />
                    </> :
                    <>
                        <input type="text" className={inputStyles.text} onChange={(e) => setSignUsername(e.target.value)} value={signUsername} placeholder="Username" />
                        <input type="password" className={inputStyles.text} onChange={(e) => setSignPassword(e.target.value)} value={signPassword} placeholder="Password" />
                    </>
                }
                <div className='text-center mt-2'>
                    {!props.infos.firstname ?
                        <span onClick={() => handleSignUp()}>
                            <Button text="Sign up" ></Button>
                        </span>
                        :
                        <span onClick={() => handleSignIn()}>
                            <Button text="Sign in" ></Button>
                        </span>
                    }
                </div>
            </div>
        </>
    )
}

export default Modal;
