const React = require('react');
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Login from './routes/Login.jsx';
import SignUp from './routes/SignUp.jsx';
import NotFound from './routes/NotFound.jsx';
import CardContainer from './routes/CardContainer.jsx';
import Loading from './components/Loading.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      loggedIn: false,
      user_id: null,
      loading:true
    };
  }
  
  componentDidMount(){
    fetch('/api/user/verifylogin')
    .then(response => response.json())
    .then(data => {
      this.setState({...data, loading:false})
    });
  }

  render() {
    if (this.state.loading){
      return (<Loading />)
    } else {
      return (
        <Router>
          <Nav loggedIn = {this.state.loggedIn}/>
          <Routes>
            <Route path="/movie" element={<CardContainer loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} filter="Movie"/>}></Route>
            <Route path="/book" element={<CardContainer loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} filter="Book"/>}></Route>
            <Route path="/music" element={<CardContainer loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} filter="Music"/>}></Route>
            <Route path="/mypage" element={<CardContainer loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} filter={this.state.user_id}/>}></Route>
            <Route path="/signup" element={<SignUp loggedIn = {this.state.loggedIn}/>}></Route>
            <Route path="/login" element={<Login loggedIn = {this.state.loggedIn}/>}></Route>
            <Route path="/" element={<CardContainer loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} filter="Home"/>}></Route>
            <Route path="/:id" element={<NotFound />}></Route>
          </Routes>
        </Router>
      )
    }
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