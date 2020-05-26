import React from 'react';
import Book from './Book';

export default class SearchResults extends React.Component{

    render() {
        return(
            <div className='search-books-results'>
                <ol className='books-grid'>
                    {this.props.books.map(book => 
                        <li><Book key={book.id} book={book} switchBook={this.props.moveBook}/></li>
                    )}
                </ol>
            </div>
        );
    }
}