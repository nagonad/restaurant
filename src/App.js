import Navi from "./Navi.js";

import React, { Component } from "react";

import { Routes, Route } from "react-router-dom";
import MenuControl from "./MenuControl";
import "./App.css";
import OrderHistoryComponent from "./OrderHistoryComponent.js";
import MenuItemAdd from "./MenuItemAdd.js";
import SizeControl from "./SizeControl.js";
import VariantControl from "./VariantControl.js";
import VariantGroupControl from "./VariantGroupControl.js";
import CreateOrder from "./CreateOrder";

export default class App extends Component {
  state = {
    products: [],
    cart: [],
    categories: [],
    sizes: [],
    variants: [],
    sideBarOpen: false,
    categorizedProducts: [],
    isLoading: true,
  };

  setIsloading = (value) => {
    this.setState({ isLoading: value });
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
    let url = process.env.REACT_APP_BASE_URL + "/costumer_info/";

    const cevap = fetch(url);

    return cevap;
  };

  getCostumerInfoLike = (number) => {
    let url = process.env.REACT_APP_BASE_URL + "/costumer_info_like/";
    url += number;

    const cevap = fetch(url);

    return cevap;
  };

  getProducts = (categoryId) => {
    let url = process.env.REACT_APP_BASE_URL + "/menu/";

    if (categoryId) {
      url += categoryId;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ categorizedProducts: data });
          this.setIsloading(false);
        });
    } else {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ products: data, categorizedProducts: data });
          this.setIsloading(false);
        });
    }
  };

  getProductsWithCategories = () => {
    let url = process.env.REACT_APP_BASE_URL + "/menuWithCategories/";

    const cevap = fetch(url);

    return cevap;
  };

  deleteProduct = (product) => {
    let url = process.env.REACT_APP_BASE_URL + "/menu/";
    url += product.id;

    const cevap = fetch(url, {
      method: "DELETE",
    });
    return cevap;
  };

  getSelectedProduct = (product) => {
    let url = process.env.REACT_APP_BASE_URL + "/product_sizes/";

    url += product.id;

    const cevap = fetch(url);

    return cevap;
  };

  getProductSizes = () => {
    let url = process.env.REACT_APP_BASE_URL + "/product_sizes/";

    const cevap = fetch(url);

    return cevap;
  };

  saveProductSize = (bodyJson) => {
    let url = process.env.REACT_APP_BASE_URL + "/product_sizes";

    fetch(url, {
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

  updateProductSize = (body, size) => {
    let url = process.env.REACT_APP_BASE_URL + "/product_sizes/";

    url += size.productsizesid;

    const cevap = fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return cevap;
  };

  deleteVariant = (variant) => {
    let url = process.env.REACT_APP_BASE_URL + "/manageVariant/";

    url += variant.id;

    const cevap = fetch(url, {
      method: "DELETE",
    });

    return cevap;
  };

  saveVariant = (bodyJson) => {
    let url = process.env.REACT_APP_BASE_URL + "/manageVariant/";

    fetch(url, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyJson),
    }).then(() => {
      this.getVariants();
    });
  };

  getVariants = () => {
    let url = process.env.REACT_APP_BASE_URL + "/manageVariant";

    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ variants: data }));
  };

  updateVariant = (variant, editedVariant) => {
    let url = process.env.REACT_APP_BASE_URL + "/manageVariant/";

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

  saveSizeVariant = (variant, size) => {
    let obj = {};

    obj.variantid = variant.id;
    obj.productsizesid = size.productsizesid;

    let url = process.env.REACT_APP_BASE_URL + "/productSizeVariant";

    console.log(url);

    const cevap = fetch(url, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    return cevap;
  };

  saveSizeVariantNewTry = (obj) => {
    let url = process.env.REACT_APP_BASE_URL + "/productSizeVariant";

    const cevap = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    return cevap;
  };

  getSizeVariantById = (size) => {
    let url = process.env.REACT_APP_BASE_URL + "/productSizeVariant/";

    url += size.productsizesid;

    const cevap = fetch(url);

    return cevap;
  };

  deleteSizeVariant = (variant) => {
    let url = process.env.REACT_APP_BASE_URL + "/productSizeVariant/";

    url += variant.sizevariantid;

    const cevap = fetch(url, {
      method: "DELETE",
    });

    return cevap;
  };

  deleteSizeVariantNewTry = (psvgelement, productSize) => {
    let url = process.env.REACT_APP_BASE_URL + "/productSizeVariantNewTry/";

    url += psvgelement.variantgroupid;

    const cevap = fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productSize),
    });
    return cevap;
  };

  saveProductSizeVariantGroup = (productSize, variantGroup) => {
    let query = {
      productsizesid: productSize.productsizesid,
      variantgroupid: variantGroup.variantgroupid,
    };

    let url = process.env.REACT_APP_BASE_URL + "/productSizeVariantGroup";

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
    let url = process.env.REACT_APP_BASE_URL + "/productSizeVariantGroup/";

    if (productSize) {
      url += productSize.productsizesid;
    }

    const cevap = fetch(url);

    return cevap;
  };

  deleteProductSizeVariantGroup = (psvg) => {
    let url = process.env.REACT_APP_BASE_URL + "/productSizeVariantGroup/";

    url += psvg.productsizevariantgroupid;

    const cevap = fetch(url, {
      method: "DELETE",
    });

    return cevap;
  };

  saveVariantGroup = (obj) => {
    let url = process.env.REACT_APP_BASE_URL + "/manageVariantGroup";

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
    let url = process.env.REACT_APP_BASE_URL + "/manageVariantGroup/";

    if (variantGroup) {
      url += variantGroup.variantgroupid;
    }

    const cevap = fetch(url);

    return cevap;
  };

  deleteVariantGroup = (variantGroup) => {
    const id = variantGroup.variantgroupid;

    let url = process.env.REACT_APP_BASE_URL + "/manageVariantGroup/";

    url += id;

    const cevap = fetch(url, {
      method: "DELETE",
    });

    return cevap;
  };

  updateVariantGroup = (variantGroup, editedVariantGroup) => {
    let url = process.env.REACT_APP_BASE_URL + "/variantGroupControl/";

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

    let url = process.env.REACT_APP_BASE_URL + "/variantGroupVariants";

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
    let url = process.env.REACT_APP_BASE_URL + "/variantGroupVariants/";
    url += variantGroup.variantgroupid;

    const cevap = fetch(url);

    return cevap;
  };

  deleteVariantGroupVariant = (vgv) => {
    let url = process.env.REACT_APP_BASE_URL + "/variantGroupVariants/";

    url += vgv.vgvid;

    const cevap = fetch(url, {
      method: "DELETE",
    });

    return cevap;
  };

  saveProduct = (bodyJson) => {
    let url = process.env.REACT_APP_BASE_URL + "/menu";

    fetch(url, {
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

  getOrderHistory = () => {
    let url = process.env.REACT_APP_BASE_URL + "/order_history";

    const cevap = fetch(url);

    return cevap;
  };

  saveOrder = (order) => {
    let url = process.env.REACT_APP_BASE_URL + "/order_history";

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
    let url = process.env.REACT_APP_BASE_URL + "/order_history/";
    url += order.orderhistoryid;

    const cevap = fetch(url, {
      method: "DELETE",
    });

    return cevap;
  };

  getCategories = () => {
    let url = process.env.REACT_APP_BASE_URL + "/categories";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  };

  getSize = () => {
    let url = process.env.REACT_APP_BASE_URL + "/size";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ sizes: data });
      });
  };

  saveSize = (size) => {
    let url = process.env.REACT_APP_BASE_URL + "/size";
    fetch(url, {
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
    let url = process.env.REACT_APP_BASE_URL + "/size/" + size.id;

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

    document.body.style = "background: #F7F8FA;";
  }

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
                isLoading={this.state.isLoading}
                setIsloading={this.setIsloading}
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
                deleteProduct={this.deleteProduct}
                // sizes={this.state.sizes}
                getSelectedProduct={this.getSelectedProduct}
                updateProductSize={this.updateProductSize}
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
            path="/itemAdd"
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
                getVariants={this.getVariants}
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
                variants={this.state.variants}
                saveVariantGroup={this.saveVariantGroup}
                getVariantGroup={this.getVariantGroup}
                deleteVariantGroup={this.deleteVariantGroup}
                updateVariantGroup={this.updateVariantGroup}
                deleteVariantGroupVariant={this.deleteVariantGroupVariant}
                saveVariantGroupVariant={this.saveVariantGroupVariant}
              ></VariantGroupControl>
            }
          ></Route>
        </Routes>
      </div>
    );
  }
}
