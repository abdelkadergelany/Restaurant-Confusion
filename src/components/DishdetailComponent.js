import React, { Component } from 'react';



import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail  extends Component {

    constructor(props) {
        super(props);

        this.state = {
          
        }
    }
       

       renderDish(dish) {
        if (dish != null)
            return(
                                    
                      <CardText>{dish.description}</CardText>                 
            );
        else
            return(
                <div></div>
            );
    }

    renderComments(comment) {
    const comme = comment.map((cmt) => {
            return (
              <div >
                                
                 <ul className="list-unstyled " key={cmt.id}>
                   <li> {cmt.comment}</li>
                    <li> {cmt.author} {cmt.date}</li>
                     
                 </ul>
                
              </div>
            );
        });



        if (comment != null)
            return(
                       <div  className="col-12 col-md-5 m-1"> 
                         <h4>Comments</h4>
                               {comme}    
                      </div>                
            );
        else
            return(
                <div></div>
            );
    }


    render() {
     
        
          if (this.props.dish != null)
            return(
           <div className="row">
              <div  className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                      <CardTitle>{this.props.dish.name}</CardTitle>
                      {this.renderDish(this.props.dish)}
                    </CardBody>
                </Card>
              </div>
                    
                   {this.renderComments(this.props.dish.comments)}
          </div>
              
            );
        else
            return(
                <div></div>
            
        );
    }
}

export default DishDetail;