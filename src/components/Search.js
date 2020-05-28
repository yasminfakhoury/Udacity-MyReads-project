import React from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';
import SearchResults from './SearchResults';

// where our search form lives
export default class Search extends React.Component{

    state = {
        foundBooks: [],
    };

    // 
    handleChange = (event) => {
        event.preventDefault();
        event.target.value === ''
            ? this.setState({ foundbooks: [] })
            : BooksAPI.search(event.target.value).then(res => {
                res.error ? 
                    this.setState({foundBooks: []}) : 
                    this.setState({ foundBooks: res });
            })
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