import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TextField, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RenderDialog(props) {
  const [variantGroupVariants, setVariantGroupVariants] = React.useState();

  const [availibleVariants, setAvailibleVariants] = React.useState();

  const handleChange = (e) => {
    props.setUpdatedVariantGroup({ [e.target.name]: e.target.value });
  };

  const saveVG = () => {
    if (props.updatedVariantGroup.variantgroupname) {
      if (
        props.selectedVariantGroup.variantgroupname !==
        props.updatedVariantGroup.variantgroupname
      ) {
        let newObj = props.updatedVariantGroup;
        delete newObj.variantgroupid;
        props
          .updateVariantGroup(props.selectedVariantGroup, newObj)
          .then(() => props.getVariantGroups());
      }
      props.setOpen(false);
    } else {
      alert("Variant Group ismi girmeniz gerekiyor");
    }
  };

  const deleteVGV = (variantGroupVariant) => {
    props.deleteVariantGroupVariant(variantGroupVariant).then(() => getVGV());
  };

  const getVGV = () => {
    props
      .getVariantGroup(props.selectedVariantGroup)
      .then((resp) => resp.json())
      .then((data) => {
        setVariantGroupVariants(data);
      });
  };

  const saveVGV = (variant) => {
    props
      .saveVariantGroupVariant(props.selectedVariantGroup, variant)
      .then(() => getVGV());
  };

  React.useEffect(() => {
    let searchArr = [];

    if (variantGroupVariants) {
      variantGroupVariants.forEach((variantGroupVariant) => {
        searchArr.push(variantGroupVariant.variantid);
      });
      let availibleVariants = props.variants.filter(
        (c) => !searchArr.includes(c.id)
      );

      setAvailibleVariants(availibleVariants);
    }
  }, [variantGroupVariants]);

  React.useEffect(() => {
    getVGV();
  }, [props.selectedVariantGroup]);

  return (
    <>
      <Dialog
        fullScreen
        onClose={() => {
          props.setSelectedVariantGroup();
        }}
        open={props.open}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => props.setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {props.selectedVariantGroup.variantgroupname.toUpperCase()}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => saveVG()}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <TextField
              sx={{ width: 300 }}
              label="Variant Name"
              variant="outlined"
              name="variantgroupname"
              InputLabelProps={{ shrink: true }}
              value={props.updatedVariantGroup.variantgroupname}
              onChange={handleChange}
            />
          </ListItem>
          <Divider></Divider>
        </List>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <Paper
            sx={{
              margin: "1rem",
              width: "100%",
              maxWidth: 360,
            }}
          >
            <List sx={{ overflow: "auto", height: 360 }}>
              {variantGroupVariants &&
                variantGroupVariants.map((variantGroupVariant) => (
                  <React.Fragment key={variantGroupVariant.vgvid}>
                    <ListItem
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box>
                        {variantGroupVariant.variantname}
                        {variantGroupVariant.price
                          ? "(" + variantGroupVariant.price + "€" + ")"
                          : null}
                      </Box>
                      <Delete
                        onClick={() => {
                          deleteVGV(variantGroupVariant);
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
                          saveVGV(variant);
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
    </>
  );
}

export default function VariantGroupControl(props) {
  const [open, setOpen] = React.useState(false);

  const [variantGroups, setVariantGroups] = React.useState();

  const [selectedVariantGroup, setSelectedVariantGroup] = React.useState({});

  const [updatedVariantGroup, setUpdatedVariantGroup] = React.useState();

  const getVariantGroups = () => {
    props
      .getVariantGroup()
      .then((resp) => resp.json())
      .then((data) => {
        setVariantGroups(data);
      });
  };

  React.useEffect(() => {
    getVariantGroups();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto 1rem auto" }}>
      {updatedVariantGroup && (
        <RenderDialog
          open={open}
          setOpen={setOpen}
          setSelectedVariantGroup={setSelectedVariantGroup}
          selectedVariantGroup={selectedVariantGroup}
          updatedVariantGroup={updatedVariantGroup}
          setUpdatedVariantGroup={setUpdatedVariantGroup}
          getVariantGroups={getVariantGroups}
          {...props}
        />
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Variant Group Name</TableCell>
              <TableCell align="right">#</TableCell>
              <TableCell align="right">#</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variantGroups?.map((variantGroup) => (
              <TableRow
                key={variantGroup.variantgroupid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row"></TableCell>
                <TableCell>{variantGroup.variantgroupname}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                      setUpdatedVariantGroup(variantGroup);
                      setSelectedVariantGroup(variantGroup);
                      setOpen(true);
                    }}
                  >
                    <EditIcon></EditIcon>
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {}}
                  >
                    <Delete></Delete>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
