import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const FormModalButton = (props) => {
    var { buttonLabel, modalTitle, formBody, submitEvent, ...other } = props;
	const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const submitHandler = (event) => {
        event.preventDefault();

        submitEvent();
        
        setShow(false);
    }

    return (
        <>
            <Button onClick={handleShow} {...other}>{buttonLabel}</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
			        <Form onSubmit={submitHandler}>
                        {formBody}
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default FormModalButton;