import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';


    function RenderDish({dish}) {
            return(
                <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
        )
      }
  
      function RenderComments({comments}) {
       return(
        <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((dish)=>{
            return(
                <p key={dish.id}>
                <p>{dish.comment}</p>
                <p>-- {dish.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dish.date)))}</p>
                </p>
            )
        })}
      </div>
       )
      }

const DishdetailComponent =(props)=>{
        
            return(
                <div className='container'>
                {props.selectedDish!=null?<div className='row'><RenderDish dish={props.selectedDish}/><RenderComments comments={props.selectedDish.comments}/></div>:<div/>}
                </div>
            )
                
    }

export default DishdetailComponent;