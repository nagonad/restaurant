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
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VariantControl(props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const deleteV = (variant) => {
    props.deleteVariant(variant).then(() => props.getVariants());
  };
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ width: "60%", margin: "0 0 1rem 1rem" }}
      >
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
                    <IconButton aria-label="expand row" size="small">
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
      <Dialog
        fullScreen
        open={dialogOpen}
        onClose={() => {
          console.log("dialog kapandi");
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {}}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={() => {}}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
      {/* <Container style={{ display: "flex" }}>
        <Container style={{ width: "50%" }}>
          <Form>
            {props.variants.length > 0 ? (
              <>
                {props.variants.map((variant) => (
                  <FormGroup key={variant.id} row>
                    <Label sm={4}>{variant.variantname}</Label>
                    <Col>
                      <Input sm={4} value={variant.price} readOnly></Input>
                    </Col>
                    <Col sm={4}>
                      <RxPencil1
                        onClick={() => {
                          changeSelectedVariantController(variant);
                        }}
                      ></RxPencil1>{" "}
                      <RxCrossCircled
                        onClick={() => {
                          props.deleteVariant(variant);
                        }}
                      ></RxCrossCircled>
                    </Col>
                  </FormGroup>
                ))}
              </>
            ) : null}
          </Form>
        </Container>
        <Form style={{ width: "50%" }}>
          <Container>
            <FormGroup row>
              <Label sm={4}>Variant Name</Label>
              <Col sm={8}>
                <Input
                  onChange={handleChange}
                  type="text"
                  name="variantname"
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Variant Price</Label>
              <Col sm={8}>
                <Input
                  onChange={handleChange}
                  type="number"
                  name="price"
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col style={{ display: "flex" }}>
                <Button onClick={() => saveVariant()}>Add Variant</Button>
              </Col>
            </FormGroup>
          </Container>
          {selectedVariantController && (
            <>
              <hr></hr>
              <Container>
                <FormGroup row>
                  <Label sm={4}>Variant Name</Label>
                  <Col sm={8}>
                    <Input
                      value={editName}
                      onChange={handleChangeEdit}
                      type="text"
                      name="variantname"
                    ></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Variant Price</Label>
                  <Col sm={8}>
                    <Input
                      value={editPrice}
                      onChange={handleChangeEdit}
                      type="number"
                      name="price"
                    ></Input>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col style={{ display: "flex" }}>
                    <Button onClick={() => editVariant()}>Edit Variant</Button>
                  </Col>
                </FormGroup>
              </Container>
            </>
          )}
        </Form>
      </Container> */}
    </>
  );
}
