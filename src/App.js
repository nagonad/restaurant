import Navi from "./Navi.js";

import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import Checkout from "./Checkout.js";
import { Routes, Route } from "react-router-dom";
import OrderLayout from "./OrderLayout.js";
import MenuControl from "./MenuControl";
import "./App.css";
import OrderHistoryComponent from "./OrderHistoryComponent.js";
import MenuItemAdd from "./MenuItemAdd.js";
import MenuList from "./MenuList";
import SizeControl from "./SizeControl.js";
import VariantControl from "./VariantControl.js";
import VariantGroupControl from "./VariantGroupControl.js";
import VariantGroupCostumize from "./VariantGroupCostumize.js";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    catProducts: [],
    cart: [],
    orderNumber: 0,
    checkoutInformation: {
      phoneNumber: "",
      costumerName: "",
      address: "",
      checkoutNote: "",
      delivery: false,
      deliveryTarget: "",
    },
    locations: {
      ort1: 3,
      ort2: 4,
      ort3: 5,
      ort4: 6,
      ort5: 6.5,
    },
    costumerInfo: [],
    phoneNumberValue: "",
    orderHistory: [],
    categories: [],
    productSizes: ["Klein", "Mittel", "Groß", "Party"],
    updatedProduct: {},
    sizes: [],
    variants: {},
    sizeVariant: [],
  };

  changeCostumerName = (value) => {
    let newCheckoutInformation = this.state.checkoutInformation;

    newCheckoutInformation.costumerName = value;

    this.setState({ checkoutInformation: newCheckoutInformation });
  };

  changeAddress = (value) => {
    let newCheckoutInformation = this.state.checkoutInformation;

    newCheckoutInformation.address = value;

    this.setState({ checkoutInformation: newCheckoutInformation });
  };

  changePhoneNumber = (value) => {
    let newCheckoutInformation = this.state.checkoutInformation;

    newCheckoutInformation.phoneNumber = value;

    this.setState({ checkoutInformation: newCheckoutInformation });
  };

  changePhoneNumberValue = (value) => {
    this.setState({ phoneNumberValue: value });
  };

  changeDeliveryTarget = (e) => {
    let newCheckoutInformation = this.state.checkoutInformation;

    newCheckoutInformation.deliveryTarget = e.target.value;

    this.setState({ checkoutInformation: newCheckoutInformation });
  };

  changeExtraProductCost = (event, orderNumber) => {
    let newCart = this.state.cart;
    let newCartItem = newCart.find((c) => c.orderNumber === orderNumber);
    newCartItem.extraProductCost = event.target.value;

    this.setState({ cart: newCart });
  };

  changeCostumerInfo = (costumer) => {
    this.setState({ costumerInfo: costumer });
  };

  changeCheckoutInformation = (e) => {
    let newCheckoutInformation = this.state.checkoutInformation;

    if (e.target.name === "delivery") {
      if (e.target.value === "Lieferung") {
        newCheckoutInformation[e.target.name] = true;
        newCheckoutInformation.deliveryTarget = Object.keys(
          this.state.locations
        )[0];
      }
      if (e.target.value === "Abholung") {
        newCheckoutInformation[e.target.name] = false;
        newCheckoutInformation.deliveryTarget = "";
      }
    } else {
      newCheckoutInformation[e.target.name] = e.target.value;
    }

    this.setState({ checkoutInformation: newCheckoutInformation });
  };

  setOrderNumber = () => {
    this.setState({ orderNumber: this.state.orderNumber + 1 });
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(
      (c) => c.orderNumber !== product.orderNumber
    );
    this.setState({ cart: newCart });
  };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryname });
    this.getProducts(category.id);
  };

  addToCart = (product, productSize, orderNote) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => {
      return (
        c.product.productId === product.productId &&
        c.productSize === productSize &&
        c.orderNote === orderNote
      );
    });
    if (addedItem) {
      if (addedItem.quantity < 9) {
        addedItem.quantity += 1;
      } else {
        addedItem.quantity = 9;
      }
    } else {
      newCart.push({
        product: product,
        quantity: 1,
        orderNote: orderNote,
        productSize: productSize,
        orderNumber: this.state.orderNumber,
      });
    }

    this.setState({ cart: newCart });
  };
  handleSelect = (e, orderNumber) => {
    let newCart = this.state.cart;
    let newCartElement = newCart.find((c) => c.orderNumber === orderNumber);
    newCartElement.quantity = parseInt(e.target.value);
    this.setState({ cart: newCart });
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:5000/menu";
    if (categoryId) {
      url += "/" + categoryId;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let newData = data.map((obj) => ({ ...obj, isOpen: false }));
        this.setState({ products: newData });
        this.categorizeProducts(data);
      });
  };

  deleteProduct = (product) => {
    let url = "http://localhost:5000/menu/";
    url += product.id;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        this.getProducts();
      });
  };

  saveProductSize = (bodyJson) => {
    fetch("http://localhost:5000/product_sizes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyJson),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  };

  updateProductSize = (e, bodyJson) => {
    let url = "http://localhost:5000/product_sizes/";

    url += bodyJson.id;

    let query = `selected=${e.target.checked}, unitprice=null`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  };

  updateProductSizeUnitPrice = (e, size) => {
    let url = "http://localhost:5000/product_sizes/";

    url += size.id;

    let query = "";

    let price = parseFloat(e.target.value).toFixed(2);

    if (!e.target.value || parseFloat(e.target.value) === 0) {
      query = `unitprice=null`;
    } else {
      query = `unitprice=${price}`;
    }

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  };

  deleteVariant = (variant) => {
    let url = "http://localhost:5000/variantControl/";

    url += variant.id;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        this.getVariants();
      });
  };

  saveVariant = (bodyJson) => {
    let url = "http://localhost:5000/variantControl/";

    fetch(url, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyJson),
    }).then((data) => {
      this.getVariants();
    });
  };

  getVariants = () => {
    fetch("http://localhost:5000/variantControl")
      .then((response) => response.json())
      .then((data) => this.setState({ variants: data }));
  };

  updateVariant = (variant, editedVariant) => {
    let url = "http://localhost:5000/variantControl/";

    url += variant.id;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedVariant),
    })
      .then((response) => response.json())
      .then((data) => this.getVariants());
  };

  saveSizeVariant = (variantid, size) => {
    let obj = {};

    obj.variantid = variantid;
    obj.productsizeid = size.id;

    let url = "http://localhost:5000/productSizeVariant";

    fetch(url, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  };

  saveSizeVariantNewTry = (obj) => {
    let url = "http://localhost:5000/productSizeVariant";

    const cevap = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    return cevap;
  };

  getSizeVariant = () => {
    let url = "http://localhost:5000/productSizeVariant/";

    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ sizeVariant: data }));
  };

  getSizeVariantById = (id) => {
    let url = "http://localhost:5000/productSizeVariant/";

    url += id;

    fetch(url)
      .then((response) => response.json())
      .then((data) => data);
  };

  deleteSizeVariant = (id) => {
    let url = "http://localhost:5000/productSizeVariant/";

    url += id;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {});
  };

  deleteSizeVariantNewTry = (psvgelement) => {
    let url = "http://localhost:5000/productSizeVariantNewTry/";

    url += psvgelement.variantgroupid;

    const cevap = fetch(url, {
      method: "DELETE",
    });
    return cevap;
  };

  saveVariantGroup = (obj) => {
    let url = "http://localhost:5000/variantGroupControl";

    const promise = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    return promise;
  };

  getVariantGroup = (variantGroup) => {
    let url = "http://localhost:5000/variantGroupControl/";

    if (variantGroup) {
      url += variantGroup.variantgroupid;
    }

    const cevap = fetch(url);

    return cevap;
  };

  deleteVariantGroup = (variantGroup) => {
    const id = variantGroup.variantgroupid;

    let url = "http://localhost:5000/variantGroupControl/";

    url += id;

    const cevap = fetch(url, {
      method: "DELETE",
    });

    return cevap;
  };

  updateVariantGroup = (variantGroup, editedVariantGroup) => {
    let url = "http://localhost:5000/variantGroupControl/";

    url += variantGroup.variantgroupid;

    const cevap = fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedVariantGroup),
    });

    return cevap;
  };

  saveVariantGroupVariant = (variantGroup, variant) => {
    let query = {
      variantgroupid: variantGroup.variantgroupid,
      variantid: variant.id,
    };

    let url = "http://localhost:5000/variantGroupVariants";

    const cevap = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    return cevap;
  };

  getVariantGroupVariant = (variantGroup) => {
    let url = "http://localhost:5000/variantGroupVariants/";
    url += variantGroup.variantgroupid;

    const cevap = fetch(url);

    return cevap;
  };

  deleteVariantGroupVariant = (vgv) => {
    let url = "http://localhost:5000/variantGroupVariants/";

    url += vgv.vgvid;

    const cevap = fetch(url, {
      method: "DELETE",
    });

    return cevap;
  };

  saveProductSizeVariantGroup = (productSize, variantGroup) => {
    let query = {
      productsizeid: productSize.id,
      variantgroupid: variantGroup.variantgroupid,
    };

    let url = "http://localhost:5000/productSizeVariantGroup";

    const cevap = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    return cevap;
  };

  getProductSizeVariantGroup = (productSize) => {
    let url = "http://localhost:5000/productSizeVariantGroup/";

    if (productSize) {
      url += productSize.id;
    }

    const cevap = fetch(url);

    return cevap;
  };

  deleteProductSizeVariantGroup = (psvg) => {
    let url = "http://localhost:5000/productSizeVariantGroup/";

    url += psvg.productsizevariantgroupid;

    const cevap = fetch(url, {
      method: "DELETE",
    });

    return cevap;
  };

  saveProduct = (bodyJson) => {
    fetch("http://localhost:5000/menu", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyJson),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ updatedProduct: {} });
        this.getProducts();

        let bodyJson = [];

        let sizes = this.state.sizes;

        sizes.forEach((size) => {
          let jsonObj = {};
          jsonObj.menutableid = data[0].id;
          jsonObj.sizename = size.size;
          bodyJson.push(jsonObj);
        });

        return this.saveProductSize(bodyJson);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  updateProduct = (updatedProduct, productInfo) => {
    let query = "";
    if (updatedProduct.unitprice) {
      updatedProduct.unitprice = updatedProduct.unitprice.replace(/,/g, ".");
      updatedProduct.unitprice = parseFloat(updatedProduct.unitprice).toFixed(
        2
      );
    }

    if (updatedProduct.categoryid) {
      let categories = this.state.categories;

      categories.forEach((category) => {
        if (category.categoryname === updatedProduct.categoryid) {
          updatedProduct.categoryid = category.id;
        }
      });
    }

    if (updatedProduct.productid) {
      updatedProduct.productid = parseInt(updatedProduct.productid);
    }

    for (const property in updatedProduct) {
      if (typeof updatedProduct[property] === "string") {
        updatedProduct[property] = "'" + updatedProduct[property] + "'";
      }

      query += property + "=" + updatedProduct[property] + ", ";
    }
    query = query.trim();

    if (query.charAt(query.length - 1) === ",") {
      query = query.substring(0, query.length - 1);
    }

    let url = "http://localhost:5000/menu/";

    url += productInfo.id;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.getProducts();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  handleChangeNew = (e) => {
    let newUpdatedProduct = this.state.updatedProduct;

    if (e.target.value) {
      newUpdatedProduct[e.target.name] = e.target.value;
    } else {
      delete newUpdatedProduct[e.target.name];
    }

    this.setState({ updatedProduct: newUpdatedProduct });
  };

  getOrderHistory = () => {
    fetch("http://localhost:5000/order_history")
      .then((response) => response.json())
      .then((data) => {
        let newData = [];
        let perObject = {};
        data.forEach((perData) => {
          perObject = {};
          perObject.id = perData.id;
          perObject.data = JSON.parse(perData.data);
          perObject.isOpen = false;
          newData.push(perObject);
        });
        this.setState({ orderHistory: newData });
      });
  };

  deleteOrder = (order) => {
    let url = "http://localhost:5000/order_history/";
    url += order.id;

    let data = this.state.orderHistory;
    data = data.filter((c) => c.id !== order.id);
    this.setState({ orderHistory: data });

    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        this.getOrderHistory();
      });
  };

  changeIsOpen = (order) => {
    let orderHistory = this.state.orderHistory;
    let orderHistoryItem = orderHistory.find(
      (element) => element.id === order.id
    );
    if (order.isOpen === false) {
      orderHistoryItem.isOpen = true;
    } else {
      orderHistoryItem.isOpen = false;
    }

    this.setState({ orderHistory: orderHistory });
  };

  changeMenuControlIsOpen = (menuItem) => {
    let products = this.state.products;

    let otherProducts = products.filter((c) => c.id !== menuItem.id);

    otherProducts.map((product) => (product.isOpen = false));

    let product = products.find((c) => c.id === menuItem.id);

    if (product.isOpen === true) {
      product.isOpen = false;
    } else {
      product.isOpen = true;
    }

    this.setState({ products: products });
  };

  getCategories = () => {
    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  };

  getSize = () => {
    fetch("http://localhost:5000/size")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ sizes: data });
      });
  };

  saveSize = (size) => {
    fetch("http://localhost:5000/size", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ size: size }),
    })
      .then((res) => res.json())
      .then(() => {
        this.getSize();
      });
  };

  deleteSize = (size) => {
    let url = "http://localhost:5000/size/" + size.id;

    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        this.getSize();
      });
  };

  componentDidMount() {
    this.getProducts();
    this.getOrderHistory();
    this.getCategories();
    this.getSize();
    this.getVariants();
    this.getSizeVariant();
  }

  categorizeProducts = (products) => {
    let categorizedProductList = [];

    let controller;

    for (let i = 0; i < products.length; i++) {
      controller = false;
      for (let k = 0; k < categorizedProductList.length; k++) {
        if (products[i].productid === categorizedProductList[k].productId) {
          if (products[i].productsize === "Klein") {
            categorizedProductList[k].unitPrice.Klein = products[i].unitprice;
          }
          if (products[i].productsize === "Mittel") {
            categorizedProductList[k].unitPrice.Mittel = products[i].unitprice;
          }
          if (products[i].productsize === "Groß") {
            categorizedProductList[k].unitPrice.Groß = products[i].unitprice;
          }
          if (products[i].productsize === "Grand") {
            categorizedProductList[k].unitPrice.Grand = products[i].unitprice;
          }
          controller = true;
        }
      }

      if (controller === false) {
        categorizedProductList[categorizedProductList.length] = {
          id: null,
          productName: null,
          productId: null,
          categoryId: null,
          productDescription: null,
          unitPrice: {
            Klein: null,
            Mittel: null,
            Groß: null,
            Grand: null,
          },
        };

        categorizedProductList[categorizedProductList.length - 1].productId =
          products[i].productid;

        categorizedProductList[categorizedProductList.length - 1].id =
          products[i].id;
        categorizedProductList[categorizedProductList.length - 1].categoryId =
          products[i].categoryid;
        categorizedProductList[categorizedProductList.length - 1].productName =
          products[i].productname;
        categorizedProductList[
          categorizedProductList.length - 1
        ].productDescription = products[i].productdescription;

        if (products[i].productsize === "Klein") {
          categorizedProductList[
            categorizedProductList.length - 1
          ].unitPrice.Klein = products[i].unitprice;
        }
        if (products[i].productsize === "Mittel") {
          categorizedProductList[
            categorizedProductList.length - 1
          ].unitPrice.Mittel = products[i].unitprice;
        }
        if (products[i].productsize === "Groß") {
          categorizedProductList[
            categorizedProductList.length - 1
          ].unitPrice.Groß = products[i].unitprice;
        }
        if (products[i].productsize === "Grand") {
          categorizedProductList[
            categorizedProductList.length - 1
          ].unitPrice.Grand = products[i].unitprice;
        }
      }
    }

    this.setState({ catProducts: categorizedProductList });
  };

  render() {
    return (
      <Container>
        <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />

        <Row>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <OrderLayout
                  currentCategory={this.state.currentCategory}
                  changeCategory={this.changeCategory}
                  catProducts={this.state.catProducts}
                  addToCart={this.addToCart}
                  orderNumber={this.orderNumber}
                  setOrderNumber={this.setOrderNumber}
                  categories={this.state.categories}
                />
              }
            ></Route>
            <Route
              exact
              path="/checkout"
              element={
                <Checkout
                  changeAddress={this.changeAddress}
                  changeCostumerName={this.changeCostumerName}
                  changePhoneNumber={this.changePhoneNumber}
                  changePhoneNumberValue={this.changePhoneNumberValue}
                  phoneNumberValue={this.state.phoneNumberValue}
                  changeCostumerInfo={this.changeCostumerInfo}
                  costumerInfo={this.state.costumerInfo}
                  locations={this.state.locations}
                  changeDeliveryTarget={this.changeDeliveryTarget}
                  changeCheckoutInformation={this.changeCheckoutInformation}
                  checkoutInformation={this.state.checkoutInformation}
                  removeFromCart={this.removeFromCart}
                  handleSelect={this.handleSelect}
                  cart={this.state.cart}
                  changeExtraProductCost={this.changeExtraProductCost}
                />
              }
            ></Route>
            <Route
              exact
              path="/orderHistory"
              element={
                <OrderHistoryComponent
                  orderHistory={this.state.orderHistory}
                  changeIsOpen={this.changeIsOpen}
                  deleteOrder={this.deleteOrder}
                ></OrderHistoryComponent>
              }
            ></Route>
            <Route
              exact
              path="/menuControl"
              element={
                <MenuControl
                  changeMenuControlIsOpen={this.changeMenuControlIsOpen}
                  products={this.state.products}
                  deleteProduct={this.deleteProduct}
                  categories={this.state.categories}
                  productSizes={this.state.productSizes}
                  updateProduct={this.updateProduct}
                  updatedProduct={this.state.updatedProduct}
                  handleChangeNew={this.handleChangeNew}
                  sizes={this.state.sizes}
                  updateProductSize={this.updateProductSize}
                  updateProductSizeUnitPrice={this.updateProductSizeUnitPrice}
                  variants={this.state.variants}
                  saveSizeVariant={this.saveSizeVariant}
                  getSizeVariantById={this.getSizeVariantById}
                  deleteSizeVariant={this.deleteSizeVariant}
                  getVariantGroup={this.getVariantGroup}
                  saveProductSizeVariantGroup={this.saveProductSizeVariantGroup}
                  getProductSizeVariantGroup={this.getProductSizeVariantGroup}
                  deleteProductSizeVariantGroup={
                    this.deleteProductSizeVariantGroup
                  }
                  getVariantGroupVariant={this.getVariantGroupVariant}
                  saveSizeVariantNewTry={this.saveSizeVariantNewTry}
                  deleteSizeVariantNewTry={this.deleteSizeVariantNewTry}
                ></MenuControl>
              }
            ></Route>
            <Route
              exact
              path="/menuControl/itemAdd"
              element={
                <MenuItemAdd
                  categories={this.state.categories}
                  saveProduct={this.saveProduct}
                ></MenuItemAdd>
              }
            ></Route>
            <Route
              exact
              path="/menuControl/sizeControl"
              element={
                <SizeControl
                  sizes={this.state.sizes}
                  saveSize={this.saveSize}
                  deleteSize={this.deleteSize}
                ></SizeControl>
              }
            ></Route>
            <Route
              exact
              path="/variantControl"
              element={
                <VariantControl
                  variants={this.state.variants}
                  saveVariant={this.saveVariant}
                  deleteVariant={this.deleteVariant}
                  updateVariant={this.updateVariant}
                ></VariantControl>
              }
            ></Route>
            <Route
              exact
              path="/VariantGroupControl"
              element={
                <VariantGroupControl
                  saveVariantGroup={this.saveVariantGroup}
                  getVariantGroup={this.getVariantGroup}
                  deleteVariantGroup={this.deleteVariantGroup}
                  updateVariantGroup={this.updateVariantGroup}
                ></VariantGroupControl>
              }
            ></Route>
            <Route
              exact
              path="/variantGroupCostumize"
              element={
                <VariantGroupCostumize
                  getVariantGroup={this.getVariantGroup}
                  variants={this.state.variants}
                  saveVariantGroupVariant={this.saveVariantGroupVariant}
                  deleteVariantGroupVariant={this.deleteVariantGroupVariant}
                ></VariantGroupCostumize>
              }
            ></Route>
          </Routes>
        </Row>
      </Container>
    );
  }
}
