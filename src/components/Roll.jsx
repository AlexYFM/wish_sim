import React, { useEffect, useState , useRef} from 'react'
import { Modal, Button, ModalBody } from 'react-bootstrap'
import './Roll.css'


function Roll (props) {
    const [show, setShow] = useState(false);
    const rarity = "roll " + props.rarity
    const modalRef = useRef();
    const standard = ['diluc.png', 'jean.png', 'mona.png', 'keqing.png', 'tighnari.png', 'qiqi.png', 'dehya.png']
    // may need to just include a classname for each standard banner character, but I don't think I should need to do that
    const on_banner = rarity.includes('on_banner')
    const path = rarity.includes('gold') && '/assets/'  + (on_banner ?  'yelan.png ': standard[Math.floor(Math.random()*standard.length)])

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
        <div className={rarity} onClick={handleShow} style={{backgroundImage: `url(${path})`}}>
            <Modal show={show} onHide={handleClose} centered>
                <ModalBody ref={modalRef} className={rarity} style={{height: '50vw', width: '50vw', backgroundImage: `url(${path})`}}>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Roll