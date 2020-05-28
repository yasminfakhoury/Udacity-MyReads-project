import React from 'react';
import * as BooksAPI from '../BooksAPI';

export default class Book extends React.Component{

    state = {
        shelf: ''
    }

    componentDidMount = async () => this.findShelf();

    findShelf = async () => {
        let currentBook = await BooksAPI.get(this.props.book.id);
        await this.setState({shelf: currentBook.shelf})
    }

    setBookshelf =  (event) => {
         event.preventDefault();

        this.findShelf();
        
        // update array of shelved books in App.js with the current book and its selected shelf
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