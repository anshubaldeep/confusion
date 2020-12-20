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
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';



const mapStateToProps=state=>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders    
  }
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm:()=>dispatch(actions.reset('feedback'))
});

  class MainComponent extends Component{
    componentDidMount() {
      this.props.fetchDishes();
    }
    
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
          <DishdetailComponent dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment} />
      );
    };

    const HomePage=()=>(
      <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
      dishesLoading={this.props.dishes.isLoading}
      dishesErrMess={this.props.dishes.errMess}
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
            <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
            <Route exact path="/todo" component={TodoList}/>
            <Redirect to="/home"/>
          </Switch>
        <Footer/>
    </div>
  );
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainComponent));
