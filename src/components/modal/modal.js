import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { CourseConsumer } from '../../context';

const LoginModal = (props) => {
    return (
        <CourseConsumer>
            {
                value => {
                    const {isModalOpen, closeModal, handleInputChange, handleSubmit} = value;

                    return (
                        <Modal show={isModalOpen} onHide={closeModal} animation={false}>                               
                            <form onSubmit={(e) => handleSubmit(e)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Login</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                    <div className="form-group">
                                        <label htmlFor="username">User Name</label>
                                        <input type="text" onChange={(e) => handleInputChange(e)} name="username" className="form-control" id="username" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" onChange={(e)=> handleInputChange(e)} name="password" className="form-control" id="password" required/>
                                    </div>                        
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={closeModal}>
                                    Close
                                </Button>                                    
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Modal.Footer>                                
                            </form>   
                        </Modal>
                    )
                }
            }
        </CourseConsumer>
    )
}

export default LoginModal;