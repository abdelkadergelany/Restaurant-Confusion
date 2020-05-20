import React,{ Component } from "react";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Label,
  Button,
  Row
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors, Field } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderDish({ dish }) {
  if (dish != null) return <CardText>{dish.description}</CardText>;
  else return <div></div>;
}


/*CommentForm*/


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
    this.toggleModal();
    this.props.addComment(this.props.dishId, event.rating, event.author, event.comment);
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
          <i className="fa fa-pencil" aria-hidden="true"></i> Submit Comment
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

/*Commentform End */

function RenderComments({comments, addComment, dishId}) {
  const comme = comments.map((cmt) => {
    return (
      <div key={cmt.id}>
        <ul className="list-unstyled ">
          <li >
            {" "}
            {cmt.comment} <br />
            {cmt.author}{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(cmt.date)))}{" "}
          </li>
        </ul>
      </div>
    );
  });

  if (comments != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        {comme}
      </div>
    );
  else return <div></div>;
}

const DishDetail = (props) => {
  if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        
  else if (props.dish != null) 
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Menu</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1" key={props.dish.id}>
            <Card>
              <CardImg top src={baseUrl + props.dish.image} alt={props.dish.name} />
              <CardBody>
                <CardTitle>{props.dish.name}</CardTitle>
                <RenderDish dish={props.dish} />
              </CardBody>
            </Card>
          </div>
          <div className=" col-md-6">
            <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
           <CommentForm dishId={props.dishId} addComment={props.addComment} />
          </div>
        </div>
      </div>
    );
  else return <div></div>;
};

export default DishDetail;
