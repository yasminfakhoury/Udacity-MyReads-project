import React from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';
import SearchResults from './SearchResults';

// where our search form lives
export default class Search extends React.Component{

    // books returned by the search query
    state = {
        foundBooks: [],
    };

    // whenever the search input changes, we make another search() call to the BooksAPI
    // and update the list of found books stored in our state. If the input is empty,
    // then the array will be set to empty by default
    // The state is only updated if the component is confirmed to be mounted
    handleChange = (event) => {
        event.preventDefault();
        // if there is any content in the search bar, then we will set the query to ba passed to
        // the API call equal to what was passed in. Otherwise, we will just set it to a single space ' '
        const query = event.target.value === '' ? ' ' : event.target.value;
        // set the state of foundBooks to whatever was returned from the search. If there were no results,
        // set foundBooks back to an empty array so that nothing gets rendered
        BooksAPI.search(query).then(res => {
                    res.error ? 
                        this.setState({ foundBooks: [] }) : 
                        this.setState({ foundBooks: res });
                });
    }

    render() {
        return(
            <div className='search-books'>

                <div className='search-books-bar'>
                    <Link to='/'>
                        <button className='close-search'>Close</button>
                    </Link>
                    <div className='search-books-input-wrapper'>
                        <form>
                            <input 
                                type="text"
                                placeholder="Search for a book..."
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                        </form>
                    </div>
                    
                </div>
                <SearchResults books={this.state.foundBooks} moveBook={this.props.moveBook}/>
            </div>
        );
    }
}