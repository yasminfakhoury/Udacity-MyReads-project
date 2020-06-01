import React from 'react';
import Book from './Book';

export default class SearchResults extends React.Component{

    // for each of the found books passed in from Search.js, we will render an ordered list
    // with each list item containing an instance of <Book />
    render() {

        return(
            <div className='search-books-results'>
                <ol className='books-grid'>
                    {this.props.books.map(book => 
                        <li key={book.id}><Book book={book} switchBook={this.props.moveBook}/></li>
                    )}
                </ol>
            </div>
        );
    }
}