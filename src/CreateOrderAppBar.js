import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";

export default function CreateOrderAppBar() {
  return (
    <>
      <Box sx={{ flexGrow: 1, width: "70%" }}>
        <AppBar
          position="static"
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
            <Box
              sx={{
                overflow: "hidden",
                display: "flex",
                height: "64px",
              }}
            >
              <Swiper
                watchSlidesProgress={true}
                slidesPerView={"auto"}
                spaceBetween={40}
              >
                <SwiperSlide
                  style={{
                    width: "auto",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    Lorem ipsum dolor sit amet
                  </Box>
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    width: "auto",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    Lorem ipsum dolor sit amet
                  </Box>
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    width: "auto",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    Lorem ipsum dolor sit amet
                  </Box>
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    width: "auto",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    Lorem ipsum dolor sit amet
                  </Box>
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    width: "auto",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    Lorem ipsum dolor sit amet
                  </Box>
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    width: "auto",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    Lorem ipsum dolor sit amet
                  </Box>
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    width: "auto",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    Lorem ipsum dolor sit amet
                  </Box>
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    width: "auto",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    Lorem ipsum dolor sit amet
                  </Box>
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    width: "auto",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    Lorem ipsum dolor sit amet
                  </Box>
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    width: "auto",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    Lorem ipsum dolor sit amet
                  </Box>
                </SwiperSlide>
              </Swiper>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
