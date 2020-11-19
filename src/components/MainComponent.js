import React,{Component} from 'react';
import Home from './HomeComponent.js';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Redirect, Route, Switch } from 'react-router';
import Contact from './ContactComponent.js';

  class MainComponent extends Component{
  constructor(props) {
    super(props);
    this.state={
      dishes:DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      selectedDish:null
    }
  }

  onDishSelect(dishId){
    this.setState({selectedDish:dishId});
}

  render(){
    const menuPage=()=>(
      <React.Fragment>
        <Menu dishes={this.state.dishes}
            onClick={(dishId)=>this.onDishSelect(dishId)}
        />      
        <DishdetailComponent
            selectedDish={this.state.dishes.filter((dish)=>dish.id===this.state.selectedDish)[0]}
        />
      </React.Fragment>
    )

    const HomePage=()=>(
      <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
      promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
      leader={this.state.leaders.filter((leader) => leader.featured)[0]}></Home>
    )
  return (
    <div className="App">
        <Header/>
          <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/menu" component={menuPage}/>
            <Route exact path="/contactus" component={Contact}/>
            <Redirect to="/home"/>
          </Switch>
        <Footer/>
    </div>
  );
    }
}
export default MainComponent;
