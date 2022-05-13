const React = require('react');
import { userParams } from 'react-router-dom'
import CreateReviewCard from '../components/CreateReviewCard.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import Loading from '../components/Loading.jsx';
import PleaseLogIn from '../components/PleaseLogIn.jsx';

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      loggedIn: this.props.loggedIn,
      username: this.props.username,
      cards: [],
      filter: this.props.filter,
      loading: true,
    };
    console.log(this.props.filter);
  }

  componentDidMount = () => {
    let filter = this.props.filter || '';
    if (filter === "Book" || filter === "Movie" || filter === "Music"){
      filter = 'media/'+filter;
    } else {
      filter = 'user/'+filter;
    }
    console.log('make request', filter);
    fetch('/api/review/recentreview/'+filter)
    .then(response => response.json())
    .then(data => {
      this.setState({...this.state, cards:data, loading:false});
    });
  }

  render() {
  
    if (this.state.loading){
      return(
        <Loading />
      )
    } else if (!this.loggedIn && this.state.filter === "") {
      return (
        <PleaseLogIn />
      )
    } else {
      const cards = [];
      console.log(this.props.filter);
      //user should only see createcard 
      //if they are logged in AND
      //if the pages is not book, movie, music, 
      if (this.props.loggedIn && this.props.filter !== 'Book' && this.props.filter !== 'Movie' && this.props.filter !== 'Music'){
        cards.push(<CreateReviewCard key={0} user_id={this.props.user_id} className='card'/>);
      }
      for (let i = 0; i < this.state.cards.length; i++){
        const ratingStr = (this.state.cards[i].rating === 1) ? 'ALOTL' : 'NOTALOTL'
        cards.push(
          <ReviewCard
            key={i+1} 
            {...this.state.cards[i]}
            loggedInUsername = {this.state.username}
            ratingStr={ratingStr} />
        )
      }
  
      return (
        <div className="card-container">
          {cards}
        </div>
      )
    }
  }
}

export default Cards;