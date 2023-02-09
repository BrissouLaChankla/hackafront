import styles from '../../styles/Modal.module.scss'
import inputStyles from '../../styles/Input.module.scss'
import Image from 'next/image';
import Button from 'components/assets/Button';

function Modal(props) {

    console.log(props)

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
            { !props.infos.firstname && 
            <input type="text" className={inputStyles.text} placeholder="Firstname" />
            }
            <input type="text" className={inputStyles.text} placeholder="Username"/>
            <input type="text" className={inputStyles.text} placeholder="Password" />
            <div className='text-center mt-2'>
            { !props.infos.firstname ? 
                <Button text="Sign up" ></Button>
                :
                <Button text="Sign in" ></Button>
            }
                </div>
        </div>
        </>
    )
}

export default Modal;
