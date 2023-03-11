import Navi from "./Navi.js";

import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import Checkout from "./Checkout.js";
import { Routes, Route } from "react-router-dom";

import MenuControl from "./MenuControl";
import "./App.css";
import OrderHistoryComponent from "./OrderHistoryComponent.js";
import MenuItemAdd from "./MenuItemAdd.js";
import MenuList from "./MenuList";
import SizeControl from "./SizeControl.js";
import VariantControl from "./VariantControl.js";
import VariantGroupControl from "./VariantGroupControl.js";
import VariantGroupCostumize from "./VariantGroupCostumize.js";
import CreateOrder from "./CreateOrder";

export default class App extends Component {
  state = {
    products: [],
    cart: [],
    categories: [],
    sizes: [],
    variants: {},
    sizeVariant: [],
    sideBarOpen: false,
    categorizedProducts: [],
  };

  setSideBarOpen = (open) => {
    this.setState({ sideBarOpen: open });
  };

  toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setSideBarOpen(open);
  };

  getCostumerInfo = () => {
    let url = "http://localhost:5000/costumer_info/";

    const cevap = fetch(url);

    return cevap;
  };

  getCostumerInfoLike = (number) => {
    let url = "http://localhost:5000/costumer_info_like/";
    url += number;

    const cevap = fetch(url);

    return cevap;
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:5000/menu/";
    if (categoryId) {
      url += categoryId;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ categorizedProducts: data });
        });
    } else {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ products: data, categorizedProducts: data });
        });
    }
  };

  getProductsWithCategories = () => {
    let url = "http://localhost:5000/menuWithCategories/";

    const cevap = fetch(url);

    return cevap;
  };

  deleteProduct = (product) => {
    let url = "http://localhost:5000/menu/";
    url += product.id;

    const cevap = fetch(url, {
      method: "DELETE",
    });
    return cevap;
  };

  getSelectedProduct = (product) => {
    let url = "http://localhost:5000/product_sizes/";

    url += product.id;

    const cevap = fetch(url);

    return cevap;
  };

  getProductSizes = () => {
    let url = "http://localhost:5000/product_sizes/";

    const cevap = fetch(url);

    return cevap;
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
      .then((data) => {
        // console.log(data);
        this.setState({ sizeVariant: data });
      });
  };

  getSizeVariantById = (id) => {
    let url = "http://localhost:5000/productSizeVariant/";

    url += id;

    const cevap = fetch(url);

    return cevap;
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
    let url = "http://localhost:5000/order_history";

    const cevap = fetch(url);

    return cevap;
  };

  saveOrder = (order) => {
    let url = "http://localhost:5000/order_history";

    const cevap = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    return cevap;
  };

  deleteOrder = (order) => {
    let url = "http://localhost:5000/order_history/";
    url += order.orderhistoryid;

    const cevap = fetch(url, {
      method: "DELETE",
    });

    return cevap;
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
    document.body.style = "background: #F7F8FA;";
  }

  // categorizeProducts = (products) => {
  //   let categorizedProductList = [];

  //   let controller;

  //   for (let i = 0; i < products.length; i++) {
  //     controller = false;
  //     for (let k = 0; k < categorizedProductList.length; k++) {
  //       if (products[i].productid === categorizedProductList[k].productId) {
  //         if (products[i].productsize === "Klein") {
  //           categorizedProductList[k].unitPrice.Klein = products[i].unitprice;
  //         }
  //         if (products[i].productsize === "Mittel") {
  //           categorizedProductList[k].unitPrice.Mittel = products[i].unitprice;
  //         }
  //         if (products[i].productsize === "Groß") {
  //           categorizedProductList[k].unitPrice.Groß = products[i].unitprice;
  //         }
  //         if (products[i].productsize === "Grand") {
  //           categorizedProductList[k].unitPrice.Grand = products[i].unitprice;
  //         }
  //         controller = true;
  //       }
  //     }

  //     if (controller === false) {
  //       categorizedProductList[categorizedProductList.length] = {
  //         id: null,
  //         productName: null,
  //         productId: null,
  //         categoryId: null,
  //         productDescription: null,
  //         unitPrice: {
  //           Klein: null,
  //           Mittel: null,
  //           Groß: null,
  //           Grand: null,
  //         },
  //       };

  //       categorizedProductList[categorizedProductList.length - 1].productId =
  //         products[i].productid;

  //       categorizedProductList[categorizedProductList.length - 1].id =
  //         products[i].id;
  //       categorizedProductList[categorizedProductList.length - 1].categoryId =
  //         products[i].categoryid;
  //       categorizedProductList[categorizedProductList.length - 1].productName =
  //         products[i].productname;
  //       categorizedProductList[
  //         categorizedProductList.length - 1
  //       ].productDescription = products[i].productdescription;

  //       if (products[i].productsize === "Klein") {
  //         categorizedProductList[
  //           categorizedProductList.length - 1
  //         ].unitPrice.Klein = products[i].unitprice;
  //       }
  //       if (products[i].productsize === "Mittel") {
  //         categorizedProductList[
  //           categorizedProductList.length - 1
  //         ].unitPrice.Mittel = products[i].unitprice;
  //       }
  //       if (products[i].productsize === "Groß") {
  //         categorizedProductList[
  //           categorizedProductList.length - 1
  //         ].unitPrice.Groß = products[i].unitprice;
  //       }
  //       if (products[i].productsize === "Grand") {
  //         categorizedProductList[
  //           categorizedProductList.length - 1
  //         ].unitPrice.Grand = products[i].unitprice;
  //       }
  //     }
  //   }

  //   this.setState({ catProducts: categorizedProductList });
  // };

  render() {
    return (
      <div>
        <Navi
          sideBarOpen={this.state.sideBarOpen}
          setSideBarOpen={this.setSideBarOpen}
          toggleDrawer={this.toggleDrawer}
          getProducts={this.getProducts}
          categories={this.state.categories}
        />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <CreateOrder
                getProducts={this.getProducts}
                products={this.state.products}
                getSelectedProduct={this.getSelectedProduct}
                getSizeVariantById={this.getSizeVariantById}
                getCostumerInfo={this.getCostumerInfo}
                getCostumerInfoLike={this.getCostumerInfoLike}
                saveOrder={this.saveOrder}
                categories={this.state.categories}
                toggleDrawer={this.toggleDrawer}
                categorizedProducts={this.state.categorizedProducts}
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
                getOrderHistory={this.getOrderHistory}
                deleteOrder={this.deleteOrder}
              ></OrderHistoryComponent>
            }
          ></Route>
          <Route
            exact
            path="/menuControl"
            element={
              <MenuControl
                getProductSizes={this.getProductSizes}
                getProductsWithCategories={this.getProductsWithCategories}
                changeMenuControlIsOpen={this.changeMenuControlIsOpen}
                products={this.state.products}
                deleteProduct={this.deleteProduct}
                categories={this.state.categories}
                productSizes={this.state.productSizes}
                updateProduct={this.updateProduct}
                updatedProduct={this.state.updatedProduct}
                handleChangeNew={this.handleChangeNew}
                sizes={this.state.sizes}
                getSelectedProduct={this.getSelectedProduct}
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
      </div>
    );
  }
}
