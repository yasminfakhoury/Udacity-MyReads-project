import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './components/Bookshelf.js'
import Search from './components/Search.js'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default class BooksApp extends React.Component {

  // "books" refers to all of the books that are currently on one of the three shelves
  state = {
    books: []
  };

   // update the list of books to be rendered on this shelf
  loadShelves = () => BooksAPI.getAll().then(newBooks => this.setState({ books: newBooks }));
  

  // retreive all of the currently shelved books at start of application
  componentDidMount = () => this.loadShelves();
  

  // update the book's info in the API, then re-render the bookshelves
  handleMoveBook = async (newBook, shelf) => {
    await BooksAPI.update(newBook, shelf);
    await this.loadShelves();
  }

  // render 2 routes/pages, one for the home page and one for the search page
  render() {

    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf
                name='Currently Reading'
                category='currentlyReading'
                books={this.state.books}
                moveBook={this.handleMoveBook} />
              <Bookshelf
                name='Want to Read'
                category='wantToRead'
                books={this.state.books}
                moveBook={this.handleMoveBook} />
              <Bookshelf
                name='Read'
                category='read'
                books={this.state.books}
                moveBook={this.handleMoveBook} />
            </div>

            <Link to='/search' className='open-search'><button className='open-search button'></button></Link> />

          </div>
          )}  />

          <Route exact path='/search' render={() => 
              <Search 
                moveBook={this.handleMoveBook}
              />
              } />
     </div>
    );
  }
}
