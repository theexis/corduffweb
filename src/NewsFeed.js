import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import wp from './wp';

class NewsFeed extends Component {

  constructor(props) {
    super(props);
    this.state = { posts:[] };
  }

  componentWillMount() {
    wp.fetchPosts(4, 4)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ posts: json});
      });
  }

  buildPost(post) {
    let postBody = post.content.rendered;

    if (postBody.length > 250) {
      postBody = postBody.substring(0, 250) + "...";
    }

    return (
      <Carousel.Item key={post.id}>
        <div className="postItem">
          <div><strong>{post.title.rendered}</strong></div>
          <div dangerouslySetInnerHTML={{ __html: postBody }} />
        </div>
      </Carousel.Item>
    );
  }

  render() {
    return (
      <div className="newsPost">
        <div><h2>Recent News</h2></div>
        <Carousel indicators={false} nextIcon={null} prevIcon={null} interval={12000}>{ this.state.posts.map((post) => this.buildPost(post)) }</Carousel>
        <a href="#/4">Read More News</a>
        <hr/>
      </div>
    );
  }
}

export default NewsFeed;