import React, { Component } from 'react';
import CarouselHost from './CarouselHost';
import wp from './wp';

class SidebarCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = { post: null };
  }

  componentWillMount() {
    wp.fetchPage(117)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ post: json });
      });
  }
  
  render() {

    if (!this.state.post) {
      return <div/>;
    }
    return (
      <div>
        <CarouselHost definition={this.state.post.content.rendered}></CarouselHost>
        <hr/>
      </div>
    );
  }
}

export default SidebarCarousel;