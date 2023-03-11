import { RxPencil1, RxCrossCircled, RxPlusCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import AddSize from "./AddSize";
import AddVariant from "./AddVariant";
import AddVariantGroup from "./AddVariantGroup";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import * as React from "react";

function Row(props) {
  const { row } = props;

  const filteredProductSizes = props.filterProductSizes(row.id);

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.productid}
        </TableCell>
        <TableCell>{row.productname}</TableCell>
        <TableCell>
          {row.categoryid} - {row.categoryname}
        </TableCell>
        <TableCell>{filteredProductSizes.length}</TableCell>
        <TableCell align="right">
          <IconButton aria-label="expand row" size="small">
            <EditIcon></EditIcon>
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton
            onClick={() => props.deleteProduct(row)}
            aria-label="expand row"
            size="small"
          >
            <Delete></Delete>
          </IconButton>
        </TableCell>
      </TableRow>
      {/* <TableRow sx={{ backgroundColor: "#e7ebf0" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {row.delivery === "1" ? (
                <Typography variant="h6" gutterBottom component="div">
                  {row.costumername}, {row.costumeraddress}, {row.phonenumber}
                </Typography>
              ) : null}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Product Size</TableCell>
                    <TableCell align="right">Product Price</TableCell>
                    <TableCell align="right">Variants</TableCell>
                    <TableCell align="right">Variants Price</TableCell>
                    <TableCell align="right">Total price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((cartItem) => (
                    <TableRow key={cartItem.orderNumber}>
                      <TableCell component="th" scope="row">
                        {cartItem.orderNumber}
                      </TableCell>
                      <TableCell>{cartItem.quantity}</TableCell>
                      <TableCell>{cartItem.product.productname}</TableCell>

                      <TableCell align="right">
                        {cartItem.size.sizename}
                      </TableCell>
                      <TableCell align="right">
                        {cartItem.size.unitprice}
                      </TableCell>
                      <TableCell align="right">
                        {renderVariants(cartItem)}
                      </TableCell>
                      <TableCell align="right">
                        {cartItem.cartItemVariantsCost
                          ? cartItem.cartItemVariantsCost.toFixed(2)
                          : null}
                      </TableCell>
                      <TableCell align="right">
                        {cartItem.cartItemTotalCost.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}

export default function MenuControl(props) {
  const [products, setProducts] = React.useState();

  const [productSizes, setProductSizes] = React.useState();

  const filterProductSizes = (productid) => {
    const cevap = productSizes.filter((c) => c.menutableid === productid);

    return cevap;
  };

  const getProductsWithCategories = () => {
    props
      .getProductsWithCategories()
      .then((resp) => resp.json())
      .then((data) => setProducts(data));
  };

  const getProductSizes = () => {
    props
      .getProductSizes()
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        setProductSizes(data);
      });
  };

  const deleteProduct = (product) => {
    props.deleteProduct(product).then(() => getProductsWithCategories());
  };

  React.useEffect(() => {
    getProductsWithCategories();
    getProductSizes();
  }, []);

  return (
    <TableContainer
      sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
      component={Paper}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Product Id</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Category Name</TableCell>
            <TableCell>Product Sizes</TableCell>
            <TableCell align="right">#</TableCell>
            <TableCell align="right">#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products && productSizes
            ? products.map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  filterProductSizes={filterProductSizes}
                  deleteProduct={deleteProduct}
                />
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// export default class Menu extends Component {
//   state = {
//     addSizeIsOpen: 0,
//     selectedProduct: {},
//     selectedProductSizes: [],
//     selectedSize: {},
//   };

//   getSP = (product) => {
//     this.props
//       .getSelectedProduct(product)
//       .then((response) => response.json())
//       .then((data) => {
//         this.setState({ selectedProductSizes: data });
//       });
//   };

//   changeAddSizeIsOpen = (value) => {
//     this.setState({ addSizeIsOpen: value });
//   };

//   changeProductSizeChecked = (product) => {
//     let arr = this.state.selectedProductSizes;

//     let arrElement = arr.find((c) => c.id === product.id);

//     if (arrElement.selected) {
//       arrElement.selected = false;
//       arrElement.unitprice = null;
//     } else {
//       arrElement.selected = true;
//     }

//     this.setState({ selectedProductSizes: arr });
//   };

//   renderPopScreen = () => {
//     switch (this.state.addSizeIsOpen) {
//       case 1:
//         return (
//           <AddSize
//             selectedProductSizes={this.state.selectedProductSizes}
//             updateProductSize={this.props.updateProductSize}
//             changeProductSizeChecked={this.changeProductSizeChecked}
//             addSizeIsOpen={this.state.addSizeIsOpen}
//             changeAddSizeIsOpen={this.changeAddSizeIsOpen}
//           ></AddSize>
//         );

//       case 2:
//         return (
//           <AddVariant
//             selectedProduct={this.state.selectedProduct}
//             selectedSize={this.state.selectedSize}
//             variants={this.props.variants}
//             saveSizeVariant={this.props.saveSizeVariant}
//             getSizeVariantById={this.props.getSizeVariantById}
//             changeAddSizeIsOpen={this.changeAddSizeIsOpen}
//             deleteSizeVariant={this.props.deleteSizeVariant}
//           ></AddVariant>
//         );

//       case 3:
//         return (
//           <AddVariantGroup
//             getVariantGroup={this.props.getVariantGroup}
//             selectedSize={this.state.selectedSize}
//             selectedProduct={this.state.selectedProduct}
//             changeAddSizeIsOpen={this.changeAddSizeIsOpen}
//             saveProductSizeVariantGroup={this.props.saveProductSizeVariantGroup}
//             getProductSizeVariantGroup={this.props.getProductSizeVariantGroup}
//             deleteProductSizeVariantGroup={
//               this.props.deleteProductSizeVariantGroup
//             }
//             getVariantGroupVariant={this.props.getVariantGroupVariant}
//             saveSizeVariantNewTry={this.props.saveSizeVariantNewTry}
//             deleteSizeVariantNewTry={this.props.deleteSizeVariantNewTry}
//           ></AddVariantGroup>
//         );

//       default:
//         return null;
//     }
//   };

//   renderMenuControl = () => {
//     return (
//       <div style={{ width: "100%", overflow: "hidden" }}>
//         {this.state.addSizeIsOpen !== 0 && (
//           <Container
//             style={{
//               position: "fixed",
//               height: "100%",
//               width: "50%",
//               zIndex: "10",
//               background: "white",
//               top: "0",
//               right: "0",
//               border: "2px solid",
//               overflowY: "scroll",
//             }}
//           >
//             {this.renderPopScreen()}
//           </Container>
//         )}
//         <Row>
//           <Col sm={10}></Col>
//           <Col sm={2}>
//             <Link to={"/menuControl/itemAdd"}>
//               <RxPlusCircled style={{ fontSize: "25px" }}></RxPlusCircled>
//             </Link>
//           </Col>
//         </Row>

//         {this.props.products.map((product) => (
//           <React.Fragment key={product.id}>
//             <Row>
//               <Col>{product.productid}</Col>
//               <Col>{product.productname}</Col>
//               <Col>{product.unitprice ? product.unitprice : null}</Col>
//               <Col>
//                 <RxPencil1
//                   onClick={() => {
//                     this.setState({ selectedProduct: product });
//                     this.getSP(product);
//                     this.props.changeMenuControlIsOpen(product);
//                   }}
//                 ></RxPencil1>
//               </Col>
//               <Col>
//                 <RxCrossCircled
//                   onClick={() => {
//                     if (
//                       window.confirm(
//                         product.productid +
//                           " - " +
//                           product.productname +
//                           "\nÜrünü silmek istediginize emin misiniz?"
//                       )
//                     ) {
//                       this.props.deleteProduct(product);
//                     }
//                   }}
//                 ></RxCrossCircled>
//               </Col>
//             </Row>
//             {product.isOpen && (
//               <Form>
//                 <FormGroup row>
//                   <Label for="" sm={2}>
//                     Product Id
//                   </Label>
//                   <Col sm={4}>
//                     <Input
//                       type="number"
//                       name="productid"
//                       id=""
//                       placeholder={product.productid}
//                       onChange={this.props.handleChangeNew}
//                     />
//                   </Col>

//                   <Label for="" sm={2}>
//                     Product Name
//                   </Label>
//                   <Col sm={4}>
//                     <Input
//                       type=""
//                       name="productname"
//                       id=""
//                       placeholder={product.productname}
//                       onChange={this.props.handleChangeNew}
//                     />
//                   </Col>
//                 </FormGroup>
//                 <FormGroup row>
//                   <Label for="" sm={2}>
//                     Product Category
//                   </Label>
//                   <Col sm={4}>
//                     <Input
//                       type="select"
//                       name="categoryid"
//                       id=""
//                       placeholder=" Product Category"
//                       onClick={this.props.handleChangeNew}
//                     >
//                       {this.props.categories.map((category) => (
//                         <option key={category.id}>
//                           {category.categoryname}
//                         </option>
//                       ))}
//                     </Input>
//                   </Col>
//                 </FormGroup>
//                 <hr></hr>

//                 {this.state.selectedProductSizes.map((size) =>
//                   size.selected ? (
//                     <FormGroup key={size.id} row>
//                       <Col sm={2}>{size.sizename}</Col>
//                       <Col sm={2}>
//                         <Input
//                           type="number"
//                           placeholder={size.unitprice}
//                           onChange={(e) => {
//                             this.props.updateProductSizeUnitPrice(e, size);
//                           }}
//                         ></Input>
//                       </Col>
//                       <Col sm={2}>
//                         <Button
//                           onClick={() => {
//                             this.setState({ selectedSize: size });
//                             this.setState({ addSizeIsOpen: 2 });
//                           }}
//                         >
//                           Add Variant
//                         </Button>
//                       </Col>
//                       <Col sm={2}>
//                         <Button
//                           onClick={() => {
//                             this.setState({ selectedSize: size });
//                             this.setState({ addSizeIsOpen: 3 });
//                           }}
//                         >
//                           Add Variant Group
//                         </Button>
//                       </Col>
//                     </FormGroup>
//                   ) : null
//                 )}

//                 <FormGroup>
//                   <Col sm={10}></Col>
//                   <Col sm={2}>
//                     <Button
//                       onClick={() => {
//                         this.setState({ addSizeIsOpen: 1 });
//                       }}
//                     >
//                       Add Size
//                     </Button>
//                     <Button
//                       onClick={() =>
//                         this.props.updateProduct(
//                           this.props.updatedProduct,
//                           product
//                         )
//                       }
//                     >
//                       Save Changes
//                     </Button>
//                   </Col>
//                 </FormGroup>
//               </Form>
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//     );
//   };

//   renderVariantControl = () => {
//     return <></>;
//   };

//   render() {
//     return this.renderMenuControl();
//   }
// }
