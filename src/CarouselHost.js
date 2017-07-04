import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import './App.css';

class CarouselHost extends Component {

  renderItem(image) {
    return (
      <Carousel.Item key={image}>
        <div dangerouslySetInnerHTML={{ __html: image }} />
      </Carousel.Item>
    );
  }

  render() {

    if (!this.props.definition) {
      return <div/>;
    }

    let images = [];
    this.props.definition.replace(/<img[^>]+>/g, (match) => images.push(match));

    return (
      <div className="carouselHost">
        <Carousel indicators={false}>
          { images.map((image) => this.renderItem(image)) }
        </Carousel>
      </div>
    );
  }
}

export default CarouselHost;