import React, { Component } from "react";
import {
  Button,
  Row,
  Col,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors, Field } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      rating: "",
      message: "",
      touched: {
        firstname: false,
        lastname: false,
        telnum: false,
        email: false,
      },
      isModalOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(event) {
    console.log("Current State is: " + JSON.stringify(this.state));
    alert("Current State is: " + JSON.stringify(this.state));
    //  event.preventDefault();
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    return (
      <div className="container">
        <Button outline onClick={this.toggleModal}>
          <i class="fa fa-pencil" aria-hidden="true"></i> Submit Comment
        </Button>

        <div className="row row-content">
          <div className="col-12 col-md-9">
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>
                Submit comment
              </ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                  <Row className="form-group">
                    <Label htmlFor="rating" md={12}>
                      rating
                    </Label>
                    <Col md={12}>
                      <Field model=".rating" dynamic={false}>
                        <select
                          id="rating"
                          name="rating"
                          className="form-control">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </Field>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="name" md={12}>
                      Name
                    </Label>
                    <Col md={12}>
                      <Control.text
                        model=".name"
                        id="name"
                        name="name"
                        placeholder="Name"
                        className="form-control"
                        validators={{
                          required,
                          minLength: minLength(2),
                          maxLength: maxLength(15),
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".name"
                        show="touched"
                        messages={{
                          required: "Required",
                          minLength: "Must be greater than 2 characters",
                          maxLength: "Must be 15 characters or less",
                        }}
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Label htmlFor="comment" md={12}>
                      Your Comment
                    </Label>
                    <Col md={12}>
                      <Control.textarea
                        model=".comment"
                        id="comment"
                        name="comment"
                        rows="12"
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={{ size: 10, offset: 2 }}>
                      <Button type="submit" color="primary">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </LocalForm>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentForm;
