import React,{Component} from 'react';
import Home from './HomeComponent.js';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { Redirect, Route, Switch } from 'react-router';

  class MainComponent extends Component{
  constructor(props) {
    super(props);
    this.state={
      dishes:DISHES,
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
      <Home></Home>
    )
  return (
    <div className="App">
        <Header/>
          <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/menu" component={menuPage}/>
            <Redirect to="/home"/>
          </Switch>
        <Footer/>
    </div>
  );
    }
}
export default MainComponent;
