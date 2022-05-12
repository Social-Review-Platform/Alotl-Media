const React = require('react');
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Login from './routes/Login.jsx';
import SignUp from './routes/SignUp.jsx';
import NotFound from './routes/NotFound.jsx';
import CardContainer from './routes/CardContainer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      loggedIn: false,
      user_id: null
    };
    
  }
  
  componentDidMount(){
    fetch('/api/user/verifylogin')
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      this.setState({...data})
    });
  }

  render() {
    // this.checkLoginStatus();
    // console.log('running');
    // console.log(this.state);
    return (
      <Router>
        <Nav loggedIn = {this.state.loggedIn}/>
        <Routes>
          <Route path="/movie" element={<CardContainer loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} filter="Movie"/>}></Route>
          <Route path="/book" element={<CardContainer loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} filter="Book"/>}></Route>
          <Route path="/music" element={<CardContainer loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} filter="Music"/>}></Route>
          <Route path="/mypage" element={<CardContainer loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} filter={this.state.user_id}/>}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<CardContainer loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} filter=""/>}></Route>
          <Route path="/:id" element={<NotFound />}></Route>
        </Routes>
      </Router>
    )
  }
}

//movie
//book
//music
//about
//sign up 
//login

//movie
//book
//music
//friends
//my page
//logout

export default App;