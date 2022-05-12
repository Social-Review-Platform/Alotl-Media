const React = require('react');
import CreateReviewCard from '../components/CreateReviewCard.jsx';
import ReviewCard from '../components/ReviewCard.jsx';

class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      loggedIn: this.props.loggedIn,
      cards: []
    };
    // console.log(this.props.filter);
  }

  componentDidMount = () => {
    const filter = this.props.filter || '';
    fetch('/api/review/recentreview?filter='+filter)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      this.setState({...this.state, cards:data});
    });
  }

  render() {
    const cards = [];
    if (this.props.loggedIn && (this.props.filter === 'book' || this.props.filter === 'movie' || this.props.filter === 'music' || this.props.filter === '' || this.props.filter === this.props.user_id)){
      cards.push(<CreateReviewCard key={0} user_id={this.props.user_id} className='card'/>);
    }
    for (let i = 0; i < this.state.cards.length; i++){
      const ratingStr = (this.state.cards[i].rating === 1) ? 'ALOTL' : 'NOTALOTL'
      cards.push(
        <ReviewCard
          key={i+1} 
          {...this.state.cards[i]}
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

export default CardContainer;