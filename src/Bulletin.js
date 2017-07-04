import React, { Component } from 'react';
import wp from './wp';

class Bulletin extends Component {

  constructor(props) {
    super(props);
    this.state = { post: null };
  }

  componentWillMount() {
    wp.fetchPage(71)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ post: json });
      });
  }

  buildPost(post) {

    let postBody = post.content.rendered;

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: postBody }} />
      </div>
    );
  }

  render() {

    if (!this.state.post || !this.state.post.content || !this.state.post.content.rendered) {
      return null;
    }

    return (
      <div className="bulletinPost">
        <div><h2>Bulletin Board</h2></div>
        <div>{ this.buildPost(this.state.post) }</div>
        <hr/>
      </div>
    );
  }
}

export default Bulletin;