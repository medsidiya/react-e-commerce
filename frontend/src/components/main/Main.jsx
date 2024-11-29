import {
  Box,
  Container,
  IconButton,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Close } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";
import { useGetproductByNameQuery } from "../../Redux/Product";

function Main() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newData) => {
    setMyData(newData);
  };
  const allProducts = "products?populate=*";
  const menProduct = "products?populate=*&filters[category][$eq]=men";
  const womenProduct = "products?populate=*&filters[category][$eq]=women";
  const theme = useTheme();
  // const [value, setValue] = useState(2);
  const [mydata, setMyData] = useState(allProducts);
  const { data, error, isLoading } = useGetproductByNameQuery(mydata);
  if (isLoading) {
    return <Typography variant="h6">Loading.............</Typography>;
  }
  if (error) {
    return <Typography variant="h6">{error.message}</Typography>;
  }
  if (data) {
    return (
      <Container sx={{ py: 9 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Box>
            <Typography variant="h6">Selected Products</Typography>
            <Typography fontWeight={300} variant="body1">
              All our new arrivals in a exclusive brand selection
            </Typography>
          </Box>
          <ToggleButtonGroup
            value={mydata}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
              ".Mui-selected": {
                border: "1px solid rgba(233, 69, 96, 0.5) !important",
                color: "#e94560 !important",
                backgroundColor: "initial !important",
              },
            }}
          >
            <ToggleButton
              sx={{ color: theme.palette.text.primary }}
              className="myButton"
              value={allProducts}
              aria-label="left aligned"
            >
              all Categories
            </ToggleButton>
            <ToggleButton
              sx={{ mx: "16px !important", color: theme.palette.text.primary }}
              className="myButton"
              value={menProduct}
              aria-label="centered"
            >
              MEN catogorie
            </ToggleButton>
            <ToggleButton
              sx={{ color: theme.palette.text.primary }}
              className="myButton"
              value={womenProduct}
              aria-label="right aligned"
            >
              Wonen Categorie
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Stack
          direction={"row"}
          gap={2}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          {data.data.map((item) => {
            return (
              <Card
                key={item.productTitile}
                sx={{
                  maxWidth: 343,
                  mt: 2,
                  ":hover .MuiCardMedia-root": {
                    scale: 1.1,
                    rotate: "2deg",
                    transition: "0.3S",
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 277 }}
                  image={`${
                    item.productImg[0].formats.medium.url
                  }`}
                  title="green iguana"
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1">
                      {item.productTitile}
                    </Typography>
                    <Typography variant="body1">
                      $ {item.productPrice}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.productDescription}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    onClick={handleClickOpen}
                    sx={{ textTransform: "capitalize" }}
                    size="medium"
                  >
                    <AddShoppingCartOutlinedIcon />
                    add to cart
                  </Button>

                  <Rating
                    name="read-only"
                    precision={0.5}
                    value={item.productRating}
                    readOnly
                  />
                </CardActions>
              </Card>
            );
          })}
        </Stack>
        <Dialog
          sx={{ ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } } }}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 10,
              "&:hover": {
                rotate: "180deg",
                transition: "0.3s",
                color: "red",
              },
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          <ProductDetails />
        </Dialog>
      </Container>
    );
  }
}

export default Main;
