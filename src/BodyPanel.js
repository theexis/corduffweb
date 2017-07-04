import React, { Component } from 'react';
import CarouselHost from './CarouselHost';
import wp from './wp';

class BodyPanel extends Component {

  constructor(props) {
    super(props);
    this.state = { posts:[] };
  }

  componentWillReceiveProps(nextProps) {
    this.fetchPosts(nextProps.cat);
  }

  componentWillMount() {
    this.fetchPosts(this.props.cat);
  }

  componentDidUpdate() {
    document.activeElement.blur();
  }

  fetchPosts(catId) {
    wp.fetchPosts(catId, 20)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ posts: json});
      });
  }

  buildPost(post) {

    let postBody = post.content.rendered;
    postBody = postBody.replace(new RegExp('[/]?wp-content/', 'g'), 'http://corduffweb.azurewebsites.net/wp-content/');

    let split = postBody.split("[[Carousel]]");

    let carousel = null;

    if (split.length > 1) {
      carousel = <div className="alignleft"><CarouselHost definition={split[1]} /></div>
    }

    return (
      <div className="bodyPost" key={post.title.rendered} ref={(r) => this.bodyDiv = r }>
        <h2>{post.title.rendered}</h2>
        <h4>{new Date(post.date).toLocaleDateString()}</h4>
        { carousel }
        <div dangerouslySetInnerHTML={{ __html: split[0] }} />
        <hr/>
      </div>
    );
  }
  
  render() {
    return (
      <div>
        <div>{ this.state.posts.map((post) => this.buildPost(post)) }</div>
      </div>
    );
  }
}

export default BodyPanel;