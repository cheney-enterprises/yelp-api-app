import React from 'react';
import './SearchBar.css';

// Props interface
export interface SearchBarProps {
    [index: string]: any;
    searchYelp: (term: string, location: string, sortBy: string) => void;
}

// State interface
export interface SearchBarState {
    term: string;
    location: string;
    sortBy: string;
}

export class SearchBar extends React.Component<SearchBarProps,SearchBarState> {
    //sortByOptions Delaration to allow it to be a member property of the component
    sortByOptions: {[index: string]:string};
    constructor(props:SearchBarProps){
        super(props);
        // bind renderSortByOptions
        this.renderSortByOptions = this.renderSortByOptions.bind(this);
        // sortByOptions object
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rating': 'rating',
            'Most Reviewed': 'review_count'
        };
        // State Object
        this.state = {
            term:"",
            location:"",
            sortBy:this.sortByOptions['Best Match']
        };
        // bind location change handler
        this.handleLocationChange = this.handleLocationChange.bind(this);
        // bind term change handler
        this.handleTermChange = this.handleTermChange.bind(this);
        // bind search handler
        this.handleSearch = this.handleSearch.bind(this);
        

    };

    // this will return '' or 'active', which will be used later to change the className from '' to 'active'. This compares the sortBy contained in state to the selected sortByOptions
    getSortByClass(sortByOption: string){
        if(this.state.sortBy === sortByOption){
            return 'active';
        } else {
            return '';
        }
    };

    // sortBy change handler - changes the state, which will refresh the component
    handleSortByChange(sortByOption: string){
        this.setState({sortBy: sortByOption});
    };

    // term changer handler - changes the state, which will refresh the component
    handleTermChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({term: e.target.value})
    };

    // location change handler - changes the state, which will refresh the component
    handleLocationChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({location: e.target.value})
    };

    
    handleSearch(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
        e.preventDefault();

        this.props.searchYelp(this.state.term,this.state.location,this.state.sortBy);
    };

    // renders list elements to show the sort by options
    renderSortByOptions(){
        // lists the keys of sortByOptions, and then maps to each one returning a li tag
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (
                // className will be either 'active' or '', calculated at component refresh based off of state change onClick
                // key will be the value of sortBy
                // onClick will change the state of sortBy on click, based off of sortByOptionValue
                <li className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue} onClick={this.handleSortByChange.bind(this,sortByOptionValue)}>{sortByOption}</li>
            );
        });
    };

    // render is called any time the state changes - this includes renderSortByOptions()
    render(){
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input onChange={this.handleTermChange} placeholder="Search Businesses" />
                    <input onChange={this.handleLocationChange} placeholder="Where?" />
                </div>
                <div className="SearchBar-submit">
                    <a type="submit" onClick={this.handleSearch}>Let's Go</a>
                </div>
            </div>
        );
    };
}
