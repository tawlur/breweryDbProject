import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap'

class Beer extends Component {
    constructor(){
        super();
        this.state = {
            beers: []
        }
    }
    componentDidMount(){
            this.getAllBeers() 
    }

    getAllBeers = async () => {
        try {
            const allBeers = await fetch(process.env.REACT_APP_BACKEND_URL + '/beers');
            // console.log(allBeers)
            const parsedAllBeers = await allBeers.json(); 
            // console.log(parsedAllBeers)
            this.setState ({
                beers: parsedAllBeers.data
            })
        } catch(err){
            console.log(err)
        }
    }

    
    render() {
        const beersList = this.state.beers.map((beers) => {
            // console.log(beers.labels)
           
            const myLabels = []
            if(beers.labels === undefined){
                console.log('No image')
            } else{
                // console.log(beers.labels.medium)
                myLabels.push(beers.labels.medium)
                // labels.toString()
                console.log(myLabels)
            }

           
            return(
            <Card style={{ width: '25rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }} key={beers.id} className='card'>
                <Card.Img variant="top" src={myLabels}  style={{height: '100px', width: '100px'}}/>
                <Card.Body>
                    <Card.Title style={{textAlign: 'center', fontSize: '3em'}}>{beers.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">ABV: {beers.abv}</Card.Subtitle>
                    <Card.Text>
                    {beers.description}
                    </Card.Text>
                </Card.Body>
                <Button variant="primary" style={{width: '50%'}}>Click to learn more</Button>
            </Card>
            )
        })
    
        return (
            <div>
                <h1 className='beerListHeader'>BEER's</h1>
                <ul className='beersList'>{beersList}</ul>
            </div>
        );
    }
}

export default Beer;