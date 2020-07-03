import React from 'react';
import { BusinessList } from '../BusinessList/BusinessList';
import { SearchBar } from '../SearchBar/SearchBar';
import { Loader } from '../Loading/Loader';
import yelp from '../../util/yelp';
import './App.css';

export interface BusinessType {
    id: string;
    imageSrc: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    category: string;
    rating: number;
    reviewCount: number;
    directionsLink: string;
    yelpLink: string;
}

interface AppProps {
    [ index: string ]: any;
}

interface AppState {
    businesses: BusinessType[];
    isSearching: boolean;
}

export class App extends React.Component<AppProps, AppState> {

    constructor ( props: any ) {
        super( props );
        this.state = {
            businesses: [],
            isSearching: false
        };
        this.searchYelp = this.searchYelp.bind( this );
    }
    searchYelp ( term: string = '', location: string = '', sortBy: string ) {
        // console.log(`Searching Yelp with search term ${term}, in location ${location}, sorted by ${sortBy}`);
        this.setState( { isSearching: true } );
        yelp.search( term, location, sortBy ).then( ( businesses: BusinessType[] ) => {
            this.setState( { businesses: businesses || [], isSearching: false } );
        } );
    };
    render () {
        return (
            <div className="App">
                <h1>ravenous</h1>
                <SearchBar searchYelp={ this.searchYelp } />
                { this.state.isSearching ? (
                    <Loader />
                ) : (
                        <BusinessList businesses={ this.state.businesses } />
                    ) }
            </div>
        );
    }
}

