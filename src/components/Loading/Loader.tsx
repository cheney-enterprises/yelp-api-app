import * as React from "react";



interface LoaderState {
    count: number;
    colorArr: string[];
}

export class Loader extends React.Component<{}, LoaderState> {
    element: HTMLDivElement[] | null;
    constructor ( props: any ) {
        super( props );
        this.state = {
            count: 0,
            colorArr: [ "primary", "success", "warning" ],
        };
        this.addCount = this.addCount.bind( this );
        this.renderCorrectComponent = this.renderCorrectComponent.bind( this );
        this.element = [];
    }
    addCount () {
        let curr = this.state.count;
        this.setState( { count: curr++ } );
    }
    renderCorrectComponent ( color: string, delay: string ) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={ { height: '50vh' } }>
                <div
                    key={ color }
                    style={ { 
                        animationDelay: delay + "ms",
                        height: '5rem',
                        width: '5rem'
                    } }
                    className={ "spinner-grow text-" + color + " m-4" }
                    role="status"
                    
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
    render () {
        let count = 0;

        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={ { height: "75%" } }
            >
                { this.state.colorArr.map( ( color: string ) => {
                    let currCount = count.toString();
                    count += 200;
                    return this.renderCorrectComponent( color, currCount );
                } ) }
            </div>
        );
    }
}
