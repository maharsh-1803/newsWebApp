import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, description , imageUrl, newsUrl , author,date} = this.props;
    return (
      <div>
        <div className="card my-3" >
          <img className="card-img-top" src={imageUrl} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
                {description}
            </p>
            <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl}  className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
