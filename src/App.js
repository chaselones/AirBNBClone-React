import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Unit from "./components/unit.js";
import GoogleMapReact from 'google-map-react';
import Marker from './components/marker';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      units:[],
      allUnits: [],
      selectedUnit: null,
      search: ""
    };
  }

  componentDidMount(){
   const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json";
   fetch(url) //AJAX
    .then(response => response.json())
    .then((data)=>{
      this.setState({
        units:data,
        allUnits:data
      });
    })
  }

  selectUnit = (unit)=>{
    this.setState({
      selectedUnit: unit
    });
  }

  handleSearch = (event)=>{
    this.setState({
      search: event.target.value,
      units: this.state.allUnits.filter((unit) => new RegExp(event.target.value,"i").exec(unit.name))
    })
  }


  render() {

    let center={
      lat:  48.8650,
      lng: 2.3432
    }

    if(this.state.selectedUnit!=null){
      center={
        lat: this.state.selectedUnit.lat,
        lng: this.state.selectedUnit.lng,
      }
    }

    return (
     <div className="app">
       <div className="main">
        <div className="search">
        <input
          type="text"
          placeholder="search..."
          value={this.state.search}
          onChange={this.handleSearch}
          />
        </div>
        <div className="units">
          {this.state.units.map((unit)=>{
            return(
                <Unit 
                key={unit.name} 
                unit={unit}
                selectUnit={this.selectUnit}/>
            );
          })}
        </div>
      </div>
     <div className="map">
     <GoogleMapReact
      center={center}
      zoom={13}
      >
       {this.state.units.map((unit)=>{
            return(
                <Marker key={unit.name} 
                lat={unit.lat} 
                lng={unit.lng} 
                text={unit.price}
                selected = {unit === this.state.selectedUnit}
                />
            );
          })}
      </GoogleMapReact>
     </div>
    </div>
    );
  }
}

export default App;
