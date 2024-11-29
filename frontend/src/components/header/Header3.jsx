import {
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
  IconButton,
  MenuList,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import WindowIcon from "@mui/icons-material/Window";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  BikeScooter,
  BookSharp,
  Close,
  Computer,
  Gamepad,
} from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Links from "./Links";

function Header3() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        my: 4,
      }}
    >
      <Stack>
        <Box>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: theme.palette.myColor.main,
              borderRadius: "4px",
              width: "220px",
              textTransform: "capitalize",
            }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            color={theme.palette.text.secondary}
          >
            <WindowIcon />
            <Typography variant="body1">categories</Typography>
            <Box flexGrow={1}></Box>
            <KeyboardArrowRightIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              ".MuiPaper-root": {
                width: "220px",
                bgcolor: theme.palette.myColor.main,
              },
            }}
          >
            <MenuList>
              <MenuItem>
                <ListItemIcon>
                  <BikeScooter fontSize="small" />
                </ListItemIcon>
                <ListItemText>Bikes</ListItemText>
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <Computer fontSize="small" />
                </ListItemIcon>
                <ListItemText>Electronic</ListItemText>
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <BookSharp fontSize="small" />
                </ListItemIcon>
                <ListItemText>Books</ListItemText>
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <Gamepad fontSize="small" />
                </ListItemIcon>
                <ListItemText>Gamming</ListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Stack>
      {/* Start Links  */}
      {useMediaQuery("(min-width:1000px)") && (
        <Box sx={{display:"flex" , alignItems:"center",gap:1,}}>
          <Links title="Home" />
          <Links title="Mage Menu" />
          <Links title="Full Screen Menu" />
          <Links title="Pages" />
          <Links title="User Account" />
          <Links title="Vendor Account" />
        </Box >
      )}

      {/* End Links  */}
      {/*=========== For Drawer ========= */}
      {useMediaQuery("(max-width:1000px)") && (
        <IconButton onClick={toggleDrawer("top", true)}>
          <MenuIcon sx={{ color: theme.palette.text.primary }} />
        </IconButton>
      )}
      <Drawer
        anchor={"top"}
        open={state["top"]}
        onClose={toggleDrawer("top", false)}
        sx={{
          ".MuiPaper-root.css-k1yagv-MuiPaper-root-MuiDrawer-paper": {
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            mt: 6,
            mx: "auto",
            width: "360px",
            position: "relative",
            pt: 6,
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 10,
              "&:hover": { rotate: "180deg", transition: "0.3s", color: "red" },
            }}
            onClick={toggleDrawer("top", false)}
          >
            <Close />
          </IconButton>
          {[
            { title: "Home", links: ["link1", "link2", "link3"] },
            { title: "Mage menu", links: ["link1", "link2", "link3"] },
            { title: "Full screen menu", links: ["link1", "link2", "link3"] },
            { title: "pages", links: ["link1", "link2", "link3"] },
            { title: "use account", links: ["link1", "link2", "link3"] },
            { title: "vendor account", links: ["link1", "link2", "link3"] },
          ].map((item) => {
            return (
              <Accordion
                key={item.title}
                elevation={0}
                sx={{ bgcolor: "initial", my: 0 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {item.title}
                </AccordionSummary>
                <List sx={{ my: 0, py: 0 }}>
                  {item.links.map((link) => {
                    return (
                      <ListItem key={link} sx={{ my: 0, py: 0 }}>
                        <ListItemButton>
                          <ListItemText primary={link} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Accordion>
            );
          })}
        </Box>
      </Drawer>
    </Container>
  );
}

export default Header3;
