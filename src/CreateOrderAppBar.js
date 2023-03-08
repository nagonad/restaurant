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

  return (
    <>
      <Box sx={{ flexGrow: 1, width: "70%" }}>
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
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
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
            <Box
              sx={{
                overflow: "hidden",
                display: "flex",
                height: "64px",
              }}
            >
              <Swiper watchSlidesProgress={true} slidesPerView={"auto"}>
                {props.categories.map((category) => (
                  <SwiperSlide
                    onClick={() => {
                      setSelectedCategory(category.id);
                      props.getProducts(category.id);
                    }}
                    key={category.id}
                    style={{
                      width: "auto",
                      display: "flex",
                    }}
                  >
                    <Button
                      sx={{
                        alignItems: "center",
                        marginX: "5px",
                      }}
                      variant={
                        selectedCategory === category.id ? "contained" : null
                      }
                    >
                      {category.categoryshortname}
                    </Button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
