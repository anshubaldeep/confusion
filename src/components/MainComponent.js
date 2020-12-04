import React,{Component} from 'react';
import Home from './HomeComponent.js';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import { Redirect, Route, Switch ,withRouter} from 'react-router';
import Contact from './ContactComponent.js';
import About from './AboutUsComponent.js';
import TodoList from './TodoList.js';
import { connect } from 'react-redux';



const mapStateToProps=state=>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders    
  }
}



  class MainComponent extends Component{
  
  onDishSelect(dishId){
    this.setState({selectedDish:dishId});
}

  render(){
    const menuPage=()=>(
      <React.Fragment>
        <Menu dishes={this.props.dishes}
            onClick={(dishId)=>this.onDishSelect(dishId)}
        />      
      </React.Fragment>
    )

    const DishWithId = ({match}) => {
      return(
          <DishdetailComponent dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    const HomePage=()=>(
      <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
      promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
      leader={this.props.leaders.filter((leader) => leader.featured)[0]}></Home>
    )

      const AboutComponent=()=>(
        <About leaders={this.props.leaders}/>
      )

  return (
    <div className="App">
        <Header/>
          <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/menu" component={menuPage}/>
            <Route path='/menu/:dishId' component={DishWithId} />
            <Route exact path="/aboutus" component={AboutComponent}/>
            <Route exact path="/contactus" component={Contact}/>
            <Route exact path="/todo" component={TodoList}/>
            <Redirect to="/home"/>
          </Switch>
        <Footer/>
    </div>
  );
    }
}
export default withRouter(connect(mapStateToProps)(MainComponent));
