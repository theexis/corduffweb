import React, { Component } from 'react';
import { Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import './App.css';

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = { categories:[] };
  }

  onClick(categoryId) {
    this.props.onNavChange(categoryId);
  }

  buildNavItem(root) {

    if (root.children.length === 0) {
      return <NavItem eventKey={root.def.id}>{root.def.name}</NavItem>;
    }

    return (
      <NavDropdown eventKey={root.def.id} title={root.def.name}>
        {root.children.map((child) =>
          <MenuItem eventKey={child.id}>{child.name}</MenuItem>)}
      </NavDropdown>
    );
  }

  componentWillMount() {
    fetch('http://corduffweb.azurewebsites.net/wp-json/wp/v2/categories?per_page=50&orderby=slug')
      .then((response) => response.json())
      .then((json) => {

        let lookup = {};

        let roots = json
          .filter((category) => category.parent === 0)
          .map((category) => {
            let root = { def: category, children: [] };
            lookup[category.id] = root;
            return root;
          });

        json
          .filter((category) => category.parent > 0)
          .map((category) => lookup[category.parent].children.push(category));

        this.setState({ categories: roots });
      });
  }

  render() {

    let navItems = this.state.categories.map((root) => this.buildNavItem(root)); 
    return <Nav bsStyle="tabs" onSelect={(id) => this.onClick(id)}>{navItems}</Nav>;
  }
}

export default Navigation;