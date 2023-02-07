import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryList extends Component {
  render() {
    return (
      <>
        {this.props.categories && (
          <div>
            CategoryList
            <ListGroup>
              {this.props.categories.map((category) => (
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
