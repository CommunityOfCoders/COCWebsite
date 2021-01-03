import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Modal.css';

const ModalComp = props => {
	return (
		<Modal
			size={props.size}
			onHide={props.closeHandler}
			show={props.show}
			backdrop={props.backdrop}
			keyboard={props.keyboard}
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton={props.hasCloseBtn}>
				{props.header}
			</Modal.Header>
			<Modal.Body>{props.children}</Modal.Body>
			<Modal.Footer>
				<Button
					variant='outline-secondary'
					onClick={props.closeHandler}>
					Close
				</Button>
				{props.hasBtn ? (
					<Button
						variant='outline-primary'
						onClick={props.btnClickHandler}>
						{props.btnText}
					</Button>
				) : null}
			</Modal.Footer>
		</Modal>
	);
};

export default ModalComp;
