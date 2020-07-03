import React from "react";
import "./Business.css";
import { BusinessType } from "../App/App";

export interface BusinessProps {
    business: BusinessType;
    key: string;
}
export class Business extends React.Component<BusinessProps, {}> {
    render () {
        return (
            <div className="Business">
                <div className="image-container">
                    <a href={this.props.business.yelpLink} target="_blank">
                        <img src={ this.props.business.imageSrc } alt={`Picture for ${ this.props.business.name }`} />
                    </a>
                </div>
                <h2>{ this.props.business.name }</h2>
                <div className="Business-information">
                    <a href={this.props.business.directionsLink} target="_blank">
                        <div className="Business-address">
                            <p>{ this.props.business.address }</p>
                            <p>{ this.props.business.city }</p>
                            <p>
                                { `${ this.props.business.state } ${ this.props.business.zipcode }` }
                            </p>
                        </div>
                    </a>
                    <div className="Business-reviews">
                        <h3>{ this.props.business.category }</h3>
                        <h3 className="rating">{ this.props.business.rating }</h3>
                        <p>{ `${ this.props.business.reviewCount } reviews` }</p>
                    </div>
                </div>
            </div>
        );
    }
}
