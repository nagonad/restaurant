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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Divider,
  Dialog,
  AppBar,
  Toolbar,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RenderDialog(props) {
  const [selectedProductSizes, setSelectedProductSizes] = React.useState();

  const getSelectedProductSizes = () => {
    if (props.product) {
      props
        .getSelectedProduct(props.product)
        .then((resp) => resp.json())
        .then((data) => {
          setSelectedProductSizes(data);
        });
    }
  };

  const handleChangeSize = (e, size) => {
    let obj = {};
    if (e.target.name === "selected") {
      obj[e.target.name] = e.target.checked;
    } else if (e.target.name === "unitprice") {
      obj[e.target.name] = e.target.value;
    }

    if (!e.target.value) {
      obj[e.target.name] = null;
    }

    props.updateProductSize(obj, size).then(() => {
      getSelectedProductSizes();
      props.getProductSizes();
    });
  };

  React.useEffect(() => {
    getSelectedProductSizes();
  }, [props.product]);

  return (
    <Dialog
      fullScreen
      open={props.dialogOpen}
      onClose={() => {}}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              props.setDialogOpen(false);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {props.row.productid} - {props.row.productname}
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={() => {
              props.setDialogOpen(false);
            }}
          >
            save
          </Button>
        </Toolbar>
      </AppBar>

      <TableContainer
        sx={{ maxWidth: "600px", margin: "1rem" }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Size</TableCell>
              <TableCell>Size Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProductSizes &&
              selectedProductSizes.map((size) => (
                <TableRow key={size.productsizesid}>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={"selected"}
                          checked={size.selected}
                          onChange={(e) => {
                            handleChangeSize(e, size);
                          }}
                        />
                      }
                      label={size.sizename}
                    ></FormControlLabel>
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={"unitprice"}
                      InputLabelProps={{ shrink: true }}
                      type={"number"}
                      label="Price"
                      variant="outlined"
                      value={size.unitprice || ""}
                      onChange={(e) => {
                        handleChangeSize(e, size);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
}

function RenderDialogSecond(props) {
  const [sizeVariants, setSizeVariants] = React.useState();
  const [availibleVariants, setAvailibleVariants] = React.useState();

  const freshSizeVariantById = () => {
    props
      .getSizeVariantById(props.selectedProductSize)
      .then((resp) => resp.json())
      .then((data) => {
        setSizeVariants(data);
      });
  };

  const deleteVariantFromSize = (variant) => {
    props.deleteSizeVariant(variant).then(() => freshSizeVariantById());
  };

  const addVariantToSize = (variant) => {
    props.saveSizeVariant(variant, props.selectedProductSize).then(() => {
      freshSizeVariantById();
    });
  };

  React.useEffect(() => {
    let searchArr = [];

    if (sizeVariants) {
      sizeVariants.forEach((variant) => {
        searchArr.push(variant.variantid);
      });
      let availibleVariants = props.variants.filter(
        (c) => !searchArr.includes(c.id)
      );

      setAvailibleVariants(availibleVariants);
    }
  }, [sizeVariants]);

  React.useEffect(() => {
    freshSizeVariantById();
  }, []);

  return (
    <Dialog
      fullScreen
      open={props.dialogOpenSecond}
      onClose={() => {
        props.setDialogOpenSecond(false);
      }}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              props.setDialogOpenSecond(false);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {props.row.productid} - {props.row.productname} (
            {props.selectedProductSize.sizename})
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={() => {
              props.setDialogOpenSecond(false);
            }}
          >
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Paper
          sx={{
            margin: "1rem",
            width: "100%",
            maxWidth: 360,
          }}
        >
          <List sx={{ overflow: "auto", height: 360 }}>
            {sizeVariants &&
              sizeVariants.map((variant) => (
                <React.Fragment key={variant.sizevariantid}>
                  <ListItem
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      {variant.variantname}
                      {variant.price ? "(" + variant.price + "€" + ")" : null}
                    </Box>
                    <Delete
                      onClick={() => {
                        deleteVariantFromSize(variant);
                      }}
                    ></Delete>
                  </ListItem>
                  <Divider></Divider>
                </React.Fragment>
              ))}
          </List>
        </Paper>
        <Paper
          sx={{
            margin: "1rem",
            width: "100%",
            maxWidth: 360,
          }}
        >
          <List sx={{ overflow: "auto", height: 360 }}>
            {availibleVariants &&
              availibleVariants.map((variant) => (
                <React.Fragment key={variant.id}>
                  <ListItem>
                    <ArrowBackIcon
                      onClick={() => {
                        addVariantToSize(variant);
                      }}
                    ></ArrowBackIcon>
                    {variant.variantname}
                    {variant.price ? "(" + variant.price + "€" + ")" : null}
                  </ListItem>
                  <Divider></Divider>
                </React.Fragment>
              ))}
          </List>
        </Paper>
      </Box>
    </Dialog>
  );
}

function RenderDialogThird(props) {
  const [sizeVariantGroups, setSizeVariantGroups] = React.useState();

  const [availibleVariantGroups, setAvailibleVariantGroups] = React.useState();

  const freshVariantGroup = () => {
    props
      .getProductSizeVariantGroup(props.selectedProductSize)
      .then((resp) => resp.json())
      .then((data) => setSizeVariantGroups(data));
  };

  const deletePSVG = (variantGroup) => {
    props.deleteProductSizeVariantGroup(variantGroup).then(() => {
      freshVariantGroup();
      props.deleteSizeVariantNewTry(variantGroup);
    });
  };

  const savePSVG = (variantGroup) => {
    props
      .saveProductSizeVariantGroup(props.selectedProductSize, variantGroup)
      .then(() => {
        freshVariantGroup();
        props
          .getVariantGroupVariant(variantGroup)
          .then((resp) => resp.json())
          .then((data) => {
            let arr = [];

            data.forEach((datum) => {
              let obj = {
                variantgroupid: variantGroup.variantgroupid,
                productsizesid: props.selectedProductSize.productsizesid,
                variantid: datum.variantid,
              };
              arr.push(obj);
            });
            props.saveSizeVariantNewTry(arr);
          });
      });
  };

  React.useEffect(() => {
    let searchArr = [];

    if (sizeVariantGroups) {
      sizeVariantGroups.forEach((variantGroup) => {
        searchArr.push(variantGroup.variantgroupid);
      });
      let availibleVariantGroups = props.variantGroups.filter(
        (c) => !searchArr.includes(c.variantgroupid)
      );

      setAvailibleVariantGroups(availibleVariantGroups);
    }
  }, [sizeVariantGroups]);

  React.useEffect(() => {
    freshVariantGroup();
  }, []);

  return (
    <Dialog
      fullScreen
      open={props.dialogOpenThird}
      onClose={() => {
        props.setDialogOpenThird(false);
      }}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              props.setDialogOpenThird(false);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {props.row.productid} - {props.row.productname} (
            {props.selectedProductSize.sizename})
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={() => {
              props.setDialogOpenThird(false);
            }}
          >
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Paper
          sx={{
            margin: "1rem",
            width: "100%",
            maxWidth: 360,
          }}
        >
          <List sx={{ overflow: "auto", height: 360 }}>
            {sizeVariantGroups &&
              sizeVariantGroups.map((variantGroup) => (
                <React.Fragment key={variantGroup.productsizevariantgroupid}>
                  <ListItem
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>{variantGroup.variantgroupname}</Box>
                    <Delete
                      onClick={() => {
                        deletePSVG(variantGroup);
                      }}
                    ></Delete>
                  </ListItem>
                  <Divider></Divider>
                </React.Fragment>
              ))}
          </List>
        </Paper>
        <Paper
          sx={{
            margin: "1rem",
            width: "100%",
            maxWidth: 360,
          }}
        >
          <List sx={{ overflow: "auto", height: 360 }}>
            {availibleVariantGroups &&
              availibleVariantGroups.map((variantGroup) => (
                <React.Fragment key={variantGroup.variantgroupid}>
                  <ListItem>
                    <ArrowBackIcon
                      onClick={() => {
                        savePSVG(variantGroup);
                      }}
                    ></ArrowBackIcon>
                    {variantGroup.variantgroupname}
                  </ListItem>
                  <Divider></Divider>
                </React.Fragment>
              ))}
          </List>
        </Paper>
      </Box>
    </Dialog>
  );
}

function Row(props) {
  const { row } = props;

  const [filteredProductSizes, setFilteredProductSizes] = React.useState(
    props.filterProductSizes(row.id)
  );

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogOpenSecond, setDialogOpenSecond] = React.useState(false);
  const [dialogOpenThird, setDialogOpenThird] = React.useState(false);

  const [selectedProductSize, setSelectedProductSize] = React.useState();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setFilteredProductSizes(
      props.filterProductSizes(row.id).sort((a, b) => {
        return a.productsizesid - b.productsizesid;
      })
    );
  }, [props.productSizes]);

  return (
    <React.Fragment>
      {dialogOpen && (
        <RenderDialog
          getSelectedProduct={props.getSelectedProduct}
          product={props.product}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          setFilteredProductSizes={setFilteredProductSizes}
          row={row}
          {...props}
        ></RenderDialog>
      )}
      {dialogOpenSecond && (
        <RenderDialogSecond
          dialogOpenSecond={dialogOpenSecond}
          setDialogOpenSecond={setDialogOpenSecond}
          selectedProductSize={selectedProductSize}
          row={row}
          {...props}
        ></RenderDialogSecond>
      )}
      {dialogOpenThird && (
        <RenderDialogThird
          dialogOpenThird={dialogOpenThird}
          setDialogOpenThird={setDialogOpenThird}
          selectedProductSize={selectedProductSize}
          row={row}
          {...props}
        ></RenderDialogThird>
      )}
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
            onClick={() => props.deleteP(row)}
            aria-label="expand row"
            size="small"
          >
            <Delete></Delete>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow sx={{ backgroundColor: "#e7ebf0" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Box>
                <Button
                  onClick={() => {
                    setDialogOpen(true);
                    props.setProduct(row);
                  }}
                  variant="outlined"
                  size="small"
                >
                  Edit Sizes
                </Button>
                <Button></Button>
              </Box>
              <Divider></Divider>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Size Name</TableCell>
                    <TableCell>Size Price</TableCell>
                    <TableCell align="right">#</TableCell>
                    <TableCell align="right">#</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProductSizes.map((size) => (
                    <TableRow key={size.productsizesid}>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell>{size.sizename}</TableCell>
                      <TableCell>
                        {size.unitprice && size.unitprice + "€"}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => {
                            setSelectedProductSize(size);
                            setDialogOpenSecond(true);
                          }}
                          variant="outlined"
                          size="small"
                        >
                          Add Variant
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => {
                            setSelectedProductSize(size);
                            setDialogOpenThird(true);
                          }}
                          variant="outlined"
                          size="small"
                        >
                          Add Variant Group
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function MenuControl(props) {
  const [products, setProducts] = React.useState();

  const [productSizes, setProductSizes] = React.useState();

  const [variantGroups, setVariantGroups] = React.useState();

  const [product, setProduct] = React.useState();

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

  const fetchVariantGroups = () => {
    props
      .getVariantGroup()
      .then((resp) => resp.json())
      .then((data) => setVariantGroups(data));
  };

  const deleteP = (product) => {
    props.deleteProduct(product).then(() => getProductsWithCategories());
  };

  React.useEffect(() => {
    getProductsWithCategories();
    getProductSizes();
    fetchVariantGroups();
  }, []);

  return (
    <>
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
                    variantGroups={variantGroups}
                    productSizes={productSizes}
                    getProductSizes={getProductSizes}
                    updateProductSize={props.updateProductSize}
                    getSelectedProduct={props.getSelectedProduct}
                    product={product}
                    filterProductSizes={filterProductSizes}
                    deleteP={deleteP}
                    setProduct={setProduct}
                    {...props}
                  />
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
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
