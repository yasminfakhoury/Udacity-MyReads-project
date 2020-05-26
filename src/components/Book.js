import React from 'react';
import * as BooksAPI from '../BooksAPI'

export default class Book extends React.Component{

    setBookshelf = (event) => {
        console.log(this.state.shelf)
        // when the shelf option for the book changes, we assign its new shelf in the database
        // and then change the state of the book component
        BooksAPI.update(this.props.book, event.target.value)
            .then(this.setState({ shelf: event.target.value }))
            .then(console.log('now shelf is ' + this.state.shelf))
            .then(this.props.switchBook(this.props.book, event.target.value));

        console.log(this.state.shelf + ' vs. ' + event.target.value);

        // update array of shelved books in App.js with the current book and its selected shelf
        //this.props.switchBook(this.props.book, event.target.value);
        //this.props.switchBook(this.props.book, this.state.shelf);

    }

    // get correct shelf information for each book when they are first rendered on the search page
    componentDidMount = () => {    
        BooksAPI.get(this.props.book.id).then(res => this.setState({shelf: res.shelf}));
    }

    render() {
        // determine whether the current book has a cover image. If so, set the URL here to be 
        // passed into the style attribute of book-cover. If not, set URL to an empty string
        let bookCoverURL = '';
        if(this.props.book.imageLinks) bookCoverURL = this.props.book.imageLinks.thumbnail;

        // the defauly value of the select form is the book's current shelf. When a new shelf option
        // is selected, the book's shelf state is changed and in turn the initially selected value
        // in the menu
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookCoverURL})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.props.book.shelf} onChange={this.setBookshelf}>
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