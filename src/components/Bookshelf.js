import React from 'react';
import Book from './Book.js';

export default class Bookshelf extends React.Component{

    // calls the handleMoveBook() method from App.js
    switchBook = (book, shelf) => {
        this.props.moveBook(book, shelf);
    }

    render() {
        console.log(this.props.books);

        // filters the array of shelved books to determine whether they belong on the shelf category
        // that was passed in, then renders an instance of <Book /> for each object in the new arra
        return (
            <div className='bookshelf-books'>
                <h2>{this.props.name}</h2>
                <ol className='books-grid'>
                    {this.props.books
                        .filter(book => book.shelf === this.props.category)
                        .map(book => <Book key={book.id} book={book} switchBook={this.switchBook} />)}
                </ol>
            </div>
        );
    }
}