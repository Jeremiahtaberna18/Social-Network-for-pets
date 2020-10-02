import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: null }
  }
  loadUserData() {
      this.fetchID = fetchUserData(this.props.username, (userData) => {
  this.setState({ userData });
});
  componentDidMount() {
      this.loadUserData();
    }
  render() {
    const isLoading = true;
    let name;
if (isLoading === true) {
  name = 'Loading...';
} else {
  name = this.state.userData.name;
}
    let bio;
    if (isLoading === true) {
      bio = 'OKOK'
    } else {
      bio = this.state.userData.bio
    }
     let friends;
     if (isLoading === true) {
       friends = []
     } else {
       friends = this.state.userData.friends
     }

    let className = 'Profile';
    if (this.state.userData === null) {
      className += ' loading';
    }
    componentWillUnmount() {
      cancelFetch(this.fetchID)
    }
    componentDidUpdate(prevProps) {
      if(this.props.username !== prevProps.username) {
        return this.loadUserData()
      } else {
        return null
      }
    }
  }
    return (
      <div className={className}>
        <div className="profile-picture"></div>
         {!isLoading && (
    <img src={this.state.userData.profilePictureUrl} alt="" />
  )}
        <div className="profile-body">
          <h2>{name} goes here</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio} goes here</p>
          <h3>My friends</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }
}
