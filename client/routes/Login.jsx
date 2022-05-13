const React = require('react');
import YouAreLoggedIn from '../components/YouAreLoggedIn.jsx';


export default function(props) {
  if (props.loggedIn){
    return (
      <YouAreLoggedIn />
    )
  } else {
    return (
      <div className="usercred-box">
        <div className="usercred-title">ALOTL</div>
        <form className="usercred-form" method="POST" action='/api/user/login'>
          <input type="text" placeholder="username" name="username" id="username" required />
          <input type="password" placeholder="password" name="password" id="password" required />
          <input type="submit" value="Log in" />
        </form>
      </div>
    )
  }
}