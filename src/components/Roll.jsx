import React, { useEffect, useState , useRef} from 'react'
import { Modal, Button, ModalBody } from 'react-bootstrap'
import './Roll.css'


function Roll (props) {
    const [show, setShow] = useState(false);
    const rarity = "roll " + props.rarity
    const modalRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useEffect, handleClickOutside, and modalRef here so modal keeps basic click outside properties
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleClose();
        }
    };

    return (
        <div className={rarity} onClick={handleShow}>
            <Modal show={show} onHide={handleClose} centered>
                <ModalBody ref={modalRef} className={rarity} style={{height: '50vw', width: '50vw'}}>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Roll