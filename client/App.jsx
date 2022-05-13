const React = require('react');
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Login from './routes/Login.jsx';
import SignUp from './routes/SignUp.jsx';
import NotFound from './routes/NotFound.jsx';
import Cards from './routes/Cards.jsx';
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
            <Route path="/movie" element={<Cards key="Movie" loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} username = {this.state.username} filter="Movie"/>}></Route>
            <Route path="/book" element={<Cards key="Book" loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} username = {this.state.username} filter="Book"/>}></Route>
            <Route path="/music" element={<Cards key="Music" loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} username = {this.state.username} filter="Music"/>}></Route>
            <Route path="/mypage" element={<Cards key="MyPage" loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} username = {this.state.username} filter={this.state.user_id}/>}></Route>
            <Route path="/signup" element={<SignUp loggedIn = {this.state.loggedIn}/>}></Route>
            <Route path="/login" element={<Login loggedIn = {this.state.loggedIn}/>}></Route>
            <Route exact path="/" element={<Cards key="Home" loggedIn = {this.state.loggedIn} user_id = {this.state.user_id} username = {this.state.username} filter="Home"/>}></Route>
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