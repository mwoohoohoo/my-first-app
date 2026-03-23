import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import logo from "../assets/PokeballLogo.svg";

export default function Logo({ isMobile }) {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Pokedex icon"
        sx={{
          height: isMobile ? 32 : 48,
          width: "auto",
          display: "block",
        }}
      />
    </Box>
  );
}
