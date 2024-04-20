import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  MenuItem,
  useTheme,
  Box,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { tabs } from "../../data/tabsData.menubar";
import { UilListUl, UilListUiAlt } from "@iconscout/react-unicons";
const MenuBar = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = anchorEl;
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(false);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };
  const theme = useTheme();
  return (
    <Box>
      <Box onClick={handleClickListItem} sx={{ cursor: "pointer", mt: 1 }}>
        {anchorEl == false ? (
          <UilListUl size="35" />
        ) : (
          <UilListUiAlt size="35" />
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        {tabs.map((tab, index) => (
          <NavLink
            key={index}
            to={tab.label}
            style={{
              color: `${
                theme.palette.mode == "dark"
                  ? "rgb(255, 255, 255)"
                  : "rgb(0, 0, 0)"
              }`,
              textDecoration: "none",
            }}
          >
            <MenuItem
              key={index}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              <ListItemIcon>{tab.icon}</ListItemIcon>
              <ListItemText>{tab.text}</ListItemText>
            </MenuItem>
          </NavLink>
        ))}
      </Menu>
    </Box>
  );
};
export default MenuBar;
