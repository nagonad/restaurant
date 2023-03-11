import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Link } from "react-router-dom";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";

import CreateOrderAppBar from "./CreateOrderAppBar";

export default function Navi(props) {
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <List>
        <ListItem component={Link} to={"/"} disablePadding>
          <ListItemButton>
            {/* <ListItemIcon>
              <InboxIcon />
            </ListItemIcon> */}
            <ListItemText primary={"Create Order"}></ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem component={Link} to={"/orderHistory"} disablePadding>
          <ListItemButton>
            <ListItemText primary={"Order History"}></ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem component={Link} to={"/menuControl"} disablePadding>
          <ListItemButton>
            <ListItemText primary={"Menu Control"}></ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem component={Link} to={"/menuControl/itemAdd"} disablePadding>
          <ListItemButton>
            <ListItemText primary={"Add Item to Menu"}></ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem component={Link} to={"/variantControl"} disablePadding>
          <ListItemButton>
            <ListItemText primary={"Variant Control"}></ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem component={Link} to={"/VariantGroupControl"} disablePadding>
          <ListItemButton>
            <ListItemText primary={"Variant Group Control"}></ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem component={Link} to={"/VariantGroupCostumize"} disablePadding>
          <ListItemButton>
            <ListItemText primary={"Variant Group Costumize"}></ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <CreateOrderAppBar
          getProducts={props.getProducts}
          categories={props.categories}
          toggleDrawer={props.toggleDrawer}
        ></CreateOrderAppBar>
        <Drawer
          anchor={"left"}
          open={props.sideBarOpen}
          onClose={props.toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
