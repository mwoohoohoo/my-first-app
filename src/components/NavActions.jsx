import { Link } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

export default function NavActions({ isMobile }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {isMobile ? (
        // MOBILE: icon only
        <IconButton
          component={Link}
          to="/favourites"
          color="inherit"
          aria-label="favourites"
          sx={{ fontSize: 30 }}
        >
          <FavoriteBorderRoundedIcon />
        </IconButton>
      ) : (
        // DESKTOP: icon + label
        <Button
          component={Link}
          to="/favourites"
          startIcon={<FavoriteBorderRoundedIcon />}
          color="inherit"
          size="large"
          sx={{
            textTransform: "none",
            color: "text.primary",
            "& .MuiSvgIcon-root": {
              fontSize: 30,
            },
            px: 2.5,
            py: 1.2,
          }}
        >
          Favourites
        </Button>
      )}
    </Box>
  );
}
