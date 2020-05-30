import React from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';
import SearchResults from './SearchResults';

// where our search form lives
export default class Search extends React.Component{
    // allows us to make sure that the state isn't being changed after <Search /> is unmounted
    _isMounted = false;

    // books returned by the search query
    state = {
        foundBooks: [],
    };

    componentDidMount = () => {
        this._isMounted = true;
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    // whenever the search input changes, we make another search() call to the BooksAPI
    // and update the list of found books stored in our state. If the input is empty,
    // then the array will be set to empty by default
    // The state is only updated if the component is confirmed to be mounted
    handleChange = (event) => {
        event.preventDefault();
        event.target.value === '' && this._isMounted === true
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
                {console.log(this.state.foundbooks)}
                <SearchResults books={this.state.foundBooks} moveBook={this.props.moveBook}/>
            </div>
        );
    }
}