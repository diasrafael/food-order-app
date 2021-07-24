import {Fragment} from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.onDismiss}/>
};

const ModalOverlay = props => {
    return <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>};

const portalElement  = document.getElementById('overlays');

const Modal = props => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onDismiss={props.onDismiss}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>
            {props.children}
        </ModalOverlay>, portalElement)}
        
    </Fragment>
}

export default Modal;