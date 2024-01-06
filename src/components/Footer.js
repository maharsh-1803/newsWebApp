import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    const style = {
        width:"100%",
        height:"20vh",
        backgroundColor:"#313336",
        color:"white"
    }
    return (
      <div  style={style}>
        <h5 style={{padding:"3.5% 37%"}}>All rights recieved by maharsh patel , 2023</h5>
      </div>
    )
  }
}

export default Footer