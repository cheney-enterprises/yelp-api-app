import {BusinessType} from '../components/App/App';
import { env } from "./env";

const apiKey = env.yelpApiKey;

const yelp = {
    async search ( term: string, location: string, sortBy: string ) {
        console.log(
            `yelp.search() results: term-${ term },location-${ location },sortBy-${ sortBy }`
        );
        try
        {
            let response = await fetch(
                `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${ term }&location=${ location }&sort_by=${ sortBy }`,
                {
                    headers: {
                        Authorization: `Bearer ${ apiKey }`,
                    },
                }
            );

            let jsonResponse = await response.json();
            if ( jsonResponse.businesses )
            {
                console.log( jsonResponse );
                return jsonResponse.businesses.map( ( business: any ) => {
                    console.log( business.location.zip_code );
                    return <BusinessType>{
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipcode: business.location.zip_code,
                        category: business.categories[ 0 ].title,
                        rating: business.rating,
                        reviewCount: business.review_count,
                        directionsLink: `https://www.yelp.com/map/${business.alias}`,
                        yelpLink: business.url
                    };
                } );
            }
        } catch ( err )
        {
            return console.log( err );
        }
    },
};

export default yelp;
