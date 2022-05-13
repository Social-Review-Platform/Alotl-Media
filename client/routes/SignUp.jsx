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
        <form className="usercred-form" method="POST" action='/api/user/signup'>
          <input type="text" placeholder="username" name="username" required />
          <input type="password" placeholder="password" name="password" required />
          <input type="password" placeholder="comfirm password" name="password2" required />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }
}