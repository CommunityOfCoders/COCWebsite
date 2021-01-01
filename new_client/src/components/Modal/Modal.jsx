import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComp = props => {
	return (
		<Modal
			size='lg'
			onHide={props.closeHandler}
			show={props.show}
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>{props.header}</Modal.Header>
			<Modal.Body>{props.body}</Modal.Body>
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
