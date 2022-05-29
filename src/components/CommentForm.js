import React, { Component } from 'react';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Button, Col, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


export default class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		};
		this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({ isModalOpen: !this.state.isModalOpen });
	}

    handleSubmit(values) {
        this.toggleModal();
        alert('Comment is:' + JSON.stringify(values));
    }

	render() {
		return (
			<div>
				<Button onClick={this.toggleModal}>
                    <span className='fa fa-pencil fa-lg'></span>
                    Submit Comment
                </Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={this.handleSubmit}>
							<Row className="form-group">
                                <Label htmlFor="rating" md={5}>
                                    Rating:
                                </Label>
								<Col md={10}>
									<Control.select model=".rating" name="rating" className="form-control">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
                                <Label htmlFor="yourname" md={5}>
                                    Your Name:
                                </Label>
								<Col md={10}>
									<Control.text
										model=".yourname"
										id="yourname"
										name="yourname"
										placeholder="Your name"
										className="form-control"
										validators={{
											required,
											minLength: minLength(3),
											maxLength: maxLength(15)
										}}
									/>
									<Errors
										className="text-danger"
										model=".yourname"
										show="touched"
										messages={{
											required: 'Required ',
											minLength: 'Must be greater than 2 characters ',
											maxLength: 'Must be 15 characters or less '
										}}
									/>
								</Col>
							</Row>
                            <Row className="form-group">
								<Label htmlFor="comment" md={5}>
									Comment
								</Label>
								<Col md={10}>
									<Control.textarea
										model=".comment"
										id="comment"
										name="comment"
										className="form-control"
										row="6"
									/>
								</Col>
							</Row>
							<Button type="submit" value="submit" color="primary">
								Submit
							</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}
