import React  from 'react';



import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';





      function RenderDish({dish}) {
        if (dish != null)
            return(
                                    
                      <CardText>{dish.description}</CardText>                 
            );
        else
            return(
                <div></div>
            );
    }

    function RenderComments({comment}) {
    const comme = comment.map((cmt) => {
            return (
              <div >
                                
                 <ul className="list-unstyled " >
                   <li key={cmt.id}> {cmt.comment} <br/>{cmt.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmt.date)))} </li>


                   
                     
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


    const DishDetail = (props) => {
     
        
          if (props.dish != null)
            return(
           <div className="row">
              <div  className="col-12 col-md-5 m-1" key={props.dish.id}>
                <Card >
                    <CardImg top src={props.dish.image} alt={props.dish.name} />
                    <CardBody>
                      <CardTitle>{props.dish.name}</CardTitle>
                      <RenderDish dish={props.dish}/>
                      
                    </CardBody>
                </Card>
              </div>
                    
                   <RenderComments  comment={props.dish.comments}/>
          </div>
              
            );
        else
            return(
                <div></div>
            
        );
    }


export default DishDetail;

