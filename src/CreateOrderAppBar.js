import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";

export default function CreateOrderAppBar(props) {
  const [selectedCategory, setSelectedCategory] = React.useState();

  const [href, setHref] = React.useState();

  const renderAppBar = () => {
    if (!href) {
      return (
        <>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setSelectedCategory(null);
              props.getProducts();
            }}
          >
            <MenuBookIcon></MenuBookIcon>
          </IconButton>

          <Swiper watchSlidesProgress={true} slidesPerView={"auto"}>
            {props.categories.map((category) => (
              <SwiperSlide
                onClick={() => {
                  setSelectedCategory(category.categoryid);
                  props.getProducts(category.categoryid);
                }}
                key={category.categoryid}
                style={{
                  width: "auto",
                  display: "flex",
                  flexDirection: "row",
                  overflow: "hidden",
                  height: "64px",
                }}
              >
                <Button
                  sx={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginX: "5px",
                  }}
                  variant={
                    selectedCategory === category.categoryid
                      ? "contained"
                      : null
                  }
                >
                  {category.categoryshortname}
                </Button>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      );
    }
  };
  React.useEffect(() => {
    let parts = window.location.href.split("/");

    let lastPart = parts[parts.length - 1];

    setHref(lastPart);
  }, [window.location.href]);

  return (
    <>
      <Box sx={{ flexGrow: 1, width: href ? "100%" : "70%" }}>
        <AppBar
          position="relative"
          style={{
            backgroundColor: "#E7EBF0",
            color: "black",
          }}
          elevation={1}
        >
          <Toolbar>
            <IconButton
              onClick={props.toggleDrawer(true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            {renderAppBar()}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
