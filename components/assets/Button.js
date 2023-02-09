import styles from '../../styles/Button.module.scss'

function Button(props) {
	return (
        <button className={`${styles.button} ${styles[props.style]}`}>
            {props.text}
        </button>
    )
}

export default Button;
