import React from 'react';
import './BusinessList.css';
import { Business } from '../Business/Business';
import { BusinessType } from "../App/App";

export interface BusinessListProps {
    businesses: BusinessType[];

}
export class BusinessList extends React.Component<BusinessListProps,{}> {
    
    render(){
        return (
            <div className='BusinessList'>
                {this.props.businesses.map(business => {
                    return (
                        <Business business={business} key={business.id} />
                    );
                })}
            </div>
        );
    }
}