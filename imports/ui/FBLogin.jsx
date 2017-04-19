import React, { Component } from 'react';


const requestPermissions = ['public_profile', 'user_friends'];

export default class FBLogin extends Component {
  login() {
    Meteor.loginWithFacebook({
      requestPermissions:requestPermissions
    }, function(err){
        if (err) {
            throw new Meteor.Error("Facebook login failed");
        }
        // successful
    });
  }

  logout() {
    Meteor.logout(function(err){
        if (err) {
            throw new Meteor.Error("Logout failed");
        }
    })
  }

  render() {
    const user = Meteor.user();

    return (
      <div>
        { user ?
          <div>
            <span> {user.profile.name} </span>
            <button onClick={this.logout}>
              Log Out
            </button>
          </div>
          :
          <button onClick={this.login}>
            Log In
          </button>
        }
      </div>
    )
  }

}
