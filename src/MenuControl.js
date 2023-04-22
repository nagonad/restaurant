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

            if (data.length > 0) {
              data.forEach((datum) => {
                let obj = {
                  variantgroupid: variantGroup.variantgroupid,
                  productsizesid: props.selectedProductSize.productsizesid,
                  variantid: datum.variantid,
                };
                arr.push(obj);
              });

              props.saveSizeVariantNewTry(arr);
            }
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
          updateProductSize={props.updateProductSize}
          getProductSizes={props.getProductSizes}
        ></RenderDialog>
      )}
      {dialogOpenSecond && (
        <RenderDialogSecond
          dialogOpenSecond={dialogOpenSecond}
          setDialogOpenSecond={setDialogOpenSecond}
          selectedProductSize={selectedProductSize}
          row={row}
          getSizeVariantById={props.getSizeVariantById}
          variants={props.variants}
          saveSizeVariant={props.saveSizeVariant}
          deleteSizeVariant={props.deleteSizeVariant}
        ></RenderDialogSecond>
      )}
      {dialogOpenThird && (
        <RenderDialogThird
          dialogOpenThird={dialogOpenThird}
          setDialogOpenThird={setDialogOpenThird}
          selectedProductSize={selectedProductSize}
          row={row}
          getProductSizeVariantGroup={props.getProductSizeVariantGroup}
          variantGroups={props.variantGroups}
          saveProductSizeVariantGroup={props.saveProductSizeVariantGroup}
          deleteProductSizeVariantGroup={props.deleteProductSizeVariantGroup}
          deleteSizeVariantNewTry={props.deleteSizeVariantNewTry}
          getVariantGroupVariant={props.getVariantGroupVariant}
          saveSizeVariantNewTry={props.saveSizeVariantNewTry}
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
                        {size.unitprice &&
                          parseFloat(size.unitprice).toFixed(2) + "€"}
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

  const getProductsWithCategorie = () => {
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
    getProductsWithCategorie();
    getProductSizes();
    fetchVariantGroups();
  }, []);

  return (
    <>
      <TableContainer
        sx={{ width: "80%", margin: "0 auto 2rem auto" }}
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
                    getProductsWithCategorie={getProductsWithCategorie}
                    updateProductSize={props.updateProductSize}
                    getSelectedProduct={props.getSelectedProduct}
                    product={product}
                    filterProductSizes={filterProductSizes}
                    deleteP={deleteP}
                    setProduct={setProduct}
                    getSizeVariantById={props.getSizeVariantById}
                    variants={props.variants}
                    saveSizeVariant={props.saveSizeVariant}
                    deleteSizeVariant={props.deleteSizeVariant}
                    getProductSizeVariantGroup={
                      props.getProductSizeVariantGroup
                    }
                    saveProductSizeVariantGroup={
                      props.saveProductSizeVariantGroup
                    }
                    deleteProductSizeVariantGroup={
                      props.deleteProductSizeVariantGroup
                    }
                    deleteSizeVariantNewTry={props.deleteSizeVariantNewTry}
                    getVariantGroupVariant={props.getVariantGroupVariant}
                    saveSizeVariantNewTry={props.saveSizeVariantNewTry}
                  />
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
