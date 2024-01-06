import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    console.log("hii i am news component constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title = `${this.props.category} - news by maharsh`;
  }
  async newsUpdate()
  {
    this.props.setProgress(0)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=fd684025695d44dab7acbc9b12841fca&page=${this.props.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData =await data.json();
      console.log(parsedData);
      this.setState({articles : parsedData.articles,
        totalResults : parsedData.totalResults,
        loading:false
      })
      this.props.setProgress(100)
  }
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=fd684025695d44dab7acbc9b12841fca&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    this.newsUpdate()
  }
  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apikey=fd684025695d44dab7acbc9b12841fca&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false,
    });
    // this.setState ({page:this.state.page+1})
    // this.newsUpdate();
  };
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apikey=fd684025695d44dab7acbc9b12841fca&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
    // this.setState ({page:this.state.page-1})
    // this.newsUpdate();
  };
  fetchMoreData = async()=>
  {
    this.setState({page:this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=fd684025695d44dab7acbc9b12841fca&page=${this.props.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData =await data.json();
      console.log(parsedData);
      this.setState({articles : this.state.articles.concat(parsedData.articles),
        totalResults : parsedData.totalResults,
        loading:false
      })
  };
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{margin:"70px"}}>News by maharsh top headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}
        {/* <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        > */}
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        {/* </InfiniteScroll> */}
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            class="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 6)
            }
            class="btn btn-dark "
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
