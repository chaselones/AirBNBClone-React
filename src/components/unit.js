import React from "react";
import "./unit.css";

// const unit = {
//   name: "Great Unit",
//   price: 100,
//   //etc...
// }

class Unit extends React.Component{

  handleClick = ()=>{
    //Call parent method selectFlat
    this.props.selectUnit(this.props.unit);
  }
  render(){
    
  const title = this.props.unit.price +"  "+ this.props.unit.priceCurrency +" - "+ this.props.unit.name;

  const style = {
    //template literal with es6:
    backgroundImage: `url('${this.props.unit.imageUrl}')`
  };
    return(
      <div className="unit" onClick={this.handleClick}>
        <div className="unit-image" style = {style}></div>
        <div className="unit-title">
          {title}
        </div>
      </div>
    );
  }
}

export default Unit;