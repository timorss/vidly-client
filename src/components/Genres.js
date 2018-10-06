import React, { Component } from 'react';
import axios from 'axios'
const jwt = require('jsonwebtoken');


// const axios = _axios.create({
//   // baseURL: 'http://localhost:3000/api',
//   headers: { 'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEyYTQ4NmFjMWNmMDIxYmM0MTBjNGUiLCJpYXQiOjE1MzczODY1Njd9.mFsZBtGJZqRz9fhMbvf5ImcgHU2mluWNVYx7WXOVpuo' }
// })

class Genres extends Component {
  constructor (props) {
    super(props);
    this.state = {
      genres: [],
      searchValue: '',
      name: '',
      user: ''
    }
    this.onChangeName = this.onChangeName.bind(this)
    this.onSearchValueChange = this.onSearchValueChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.getGenres()
  }

  getUserFromToken() {
    let userFromToken = jwt.verify(localStorage.getItem('token'), '1234')
    console.log('userFromToken', userFromToken);
    this.setState({ user: userFromToken.email });
    return userFromToken
  }

  getGenres() {
    let userFromToken = this.getUserFromToken()
    axios.get(`http://localhost:3000/api/genres/${userFromToken._id}`)
      .then((res) => {
        const genres = res.data
        console.log('genres are', genres);
        this.setState({ genres: genres })
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  renderGenres(genres) {
    const filterEdGenres = genres.filter((genre) => {
      return genre.name.indexOf(this.state.searchValue.toLowerCase()) > -1
    })
    return filterEdGenres.map((genre) => {
      return <div key={genre._id}>{genre.name}</div>
    })
  }

  onChangeName(event) {
    this.setState({ name: event.target.value })
  }

  onSearchValueChange(event) {
    this.setState({ searchValue: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('function works!');
    let userFromToken = this.getUserFromToken()
    const { name } = this.state
    axios.post(`http://localhost:3000/api/genres`, {           //continue here with props and then pass the userId somehow
      name,
      user: userFromToken._id
    },
      { headers: { 'x-auth-token': localStorage.getItem('token') } }
    )
      .then((res) => {
        // this.getUserById(res.data._id)
        console.log('genres are: ', res);
        this.getGenres()
      })
      .catch(function (err) {
        console.log(err.response.data);
      })
  }

  render() {
    const { name, user, searchValue, genres } = this.state
    return (
      <div className="App">
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <h5>Hello {user}</h5>
          <h5>Add a Genre</h5>
          <input type="text"
            value={searchValue}
            placeholder={'Search'}
            onChange={this.onSearchValueChange} />
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
            <input type="text" 
            value={name}   
            placeholder={'Post a genre'} 
            onChange={this.onChangeName} />
            <input type="submit" value="post" className="calculate-button" />
          </form>
          {this.renderGenres(genres)}
        </div>
      </div>
    );
  }
}

export default Genres;