import React from 'react';
import * as BooksAPI from '../BooksAPI';

export default class Book extends React.Component{

    // the shelf that the book is currently on
    state = {
        shelf: ''
    }

    // when the component unmounts, set this.mounted to false so that no calls to setState() will 
    // accidentally be called on a component that has already been unmounted
    componentWillUnmount(){
        this.mounted = false;
  }

    // upon being rendered, the select menu of each book will reflect the shelf it was 
    // assigned to originally
    componentDidMount = async () => {
        this.mounted = true;
        this.findShelf();
    }
        
    // since the search results do not have a "shelf" property, get the individual book's
    // shelf using BooksAPI.get(). Once that promise is complete, set the book's shelf 
    // set the shelf accordingly. The call to set the state will only be applied if the book instance
    // is currently mounted
    findShelf = async() => {
        let currentBook = await BooksAPI.get(this.props.book.id);
        if (this.mounted) {
            await this.setState({shelf: currentBook.shelf});
        }
    }

    // when the user selects a new shelf from the book's select menu, send the info back
    // to the handleMoveBook function in App.js so that the bookshelves can be re-rendered
    setBookshelf = (event) => {
        event.preventDefault();
        this.findShelf();
        
        this.props.switchBook(this.props.book, event.target.value);
    }

    render() {
        // determine whether the current book has a cover image. If so, set the URL here to be 
        // passed into the style attribute of book-cover. If not, set URL to an empty string
        let bookCoverURL = '';
        if(this.props.book.imageLinks) bookCoverURL = this.props.book.imageLinks.thumbnail;

        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookCoverURL})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.state.shelf} onChange={this.setBookshelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading"> Currently Reading </option>
                            <option value="wantToRead"> Want to Read </option>
                            <option value="read"> Read </option>
                            <option value="none"> None </option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors}</div>
            </div>
        );
    }
}