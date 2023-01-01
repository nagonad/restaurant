import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryList extends Component {
  state = { categories: [] };

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  };

  render() {
    return (
      <>
        {this.state.categories && (
          <div>
            CategoryList
            <ListGroup>
              {this.state.categories.map((category) => (
                <ListGroupItem
                  active={
                    category.categoryname === this.props.currentCategory
                      ? true
                      : false
                  }
                  key={category.id}
                  onClick={() => this.props.changeCategory(category)}
                >
                  {category.categoryname}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        )}
      </>
    );
  }
}
