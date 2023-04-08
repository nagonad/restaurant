import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {
  IconButton,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Slide,
  Grid,
  TextField,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddVariant(props) {
  const [open, setOpen] = React.useState(false);

  const [newVariant, setNewVariant] = React.useState({});

  const handleChange = (e) => {
    let obj = newVariant;

    obj[e.target.name] = e.target.value;

    if (!obj[e.target.name]) {
      console.log(obj[e.target.name]);
      delete obj[e.target.name];
    }

    setNewVariant(obj);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (newVariant.variantname) {
      props.saveVariant(newVariant);
      setOpen(false);
      setNewVariant({});
    } else {
      alert("Variant ismi girmeniz gerekiyor");
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Variant
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Grid paddingTop={2} container>
          <Grid item xs={12} md={4}>
            <ListItem xs={4}>
              <TextField
                sx={{ width: 300 }}
                label="Variant Name"
                variant="outlined"
                name="variantname"
                onChange={handleChange}
              />
            </ListItem>
          </Grid>
          <Grid item xs={12} md={4}>
            <ListItem xs={4}>
              <TextField
                sx={{ width: 300 }}
                label="Price"
                variant="outlined"
                type="number"
                name="price"
                onChange={handleChange}
              />
            </ListItem>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

export default function VariantControl(props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [selectedVariant, setSelectedVariant] = React.useState();

  const [updatedVariant, setUpdatedVariant] = React.useState();

  const handleChange = (e) => {
    let obj = {};

    if (e.target.value) {
      obj[e.target.name] = e.target.value;
    } else {
      obj[e.target.name] = null;
    }
    setUpdatedVariant({ ...updatedVariant, ...obj });
  };

  const updateV = () => {
    let obj = updatedVariant;

    delete obj.id;

    if (obj.price) {
      obj.price = parseFloat(obj.price).toFixed(2);
    }

    props.updateVariant(selectedVariant, obj);
  };

  const deleteV = (variant) => {
    props.deleteVariant(variant).then(() => props.getVariants());
  };
  return (
    <div
      style={{ display: "flex", maxWidth: "800px", margin: "0 auto 1rem auto" }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Variant Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">#</TableCell>
              <TableCell align="right">#</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.variants &&
              props.variants.map((variant) => (
                <TableRow
                  key={variant.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    #
                  </TableCell>
                  <TableCell> {variant.variantname}</TableCell>

                  <TableCell>{variant.price}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => {
                        setUpdatedVariant(variant);
                        setSelectedVariant(variant);
                        setDialogOpen(true);
                      }}
                    >
                      <EditIcon></EditIcon>
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => deleteV(variant)}
                    >
                      <Delete></Delete>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {updatedVariant && (
        <Dialog
          fullScreen
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
          }}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  setDialogOpen(false);
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {selectedVariant.variantname} - {selectedVariant.price}
              </Typography>
              <Button
                autoFocus
                color="inherit"
                onClick={() => {
                  updateV();
                  setDialogOpen(false);
                }}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <Grid paddingTop={2} container>
            <Grid item xs={12} md={4}>
              <ListItem xs={4}>
                <TextField
                  sx={{ width: 300 }}
                  label="Variant Name"
                  variant="outlined"
                  name="variantname"
                  InputLabelProps={{ shrink: true }}
                  value={updatedVariant.variantname || ""}
                  onChange={handleChange}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <ListItem xs={4}>
                <TextField
                  sx={{ width: 300 }}
                  label="Price"
                  variant="outlined"
                  type="number"
                  name="price"
                  InputLabelProps={{ shrink: true }}
                  value={updatedVariant.price || ""}
                  onChange={handleChange}
                />
              </ListItem>
            </Grid>
          </Grid>
        </Dialog>
      )}
      <AddVariant {...props}></AddVariant>
    </div>
  );
}
