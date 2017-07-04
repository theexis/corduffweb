import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import Navigation from './Navigation';
import BodyPanel from './BodyPanel';
import Bulletin from './Bulletin';
import NewsFeed from './NewsFeed';
import SidebarCarousel from './SidebarCarousel';
import './App.css';

export class App extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = { homecat: 15 };

    this.context.router.history.listen((location, action) => {
      this.setState({ homecat: location.pathname.substring(1) });
    });
  }

  navigate(category) {

    this.context.router.history.push(`/${category}`);
  }

  render() {
    return (
      <div className="App">
        <div className="crest">
          <img className="crest-img" src="/wp-content/uploads/crest.png" />
        </div>
        <div className="App-header">
          <h2 className="title">Scoil Phádraig National School</h2>
          <h3 className="subTitle">Corduff, Monaghan</h3>
        </div>
        <div className="siteBodyContainer">
          <div className="siteBody">
            <Navigation onNavChange={cat => this.navigate(cat)}/>
            <Grid>
              <Row className="show-grid">
                <Col xs={12} md={8}>
                  <div>
                    <div className="refreshOverlay">
                      <i className="fa fa-refresh fa-spin fa-3x fa-fw" aria-hidden="true"></i>
                    </div>
                    <BodyPanel cat={this.state.homecat} />
                  </div>
                </Col>
                <Col xs={6} md={4}>
                  <div className="sidebar">
                    <Bulletin />
                    <NewsFeed />
                    <SidebarCarousel />
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
