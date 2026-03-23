import { AppBar, Toolbar, Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

import Logo from "./Logo";
import NavActions from "./NavActions";

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        py: { xs: 1, md: 2.5 },
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: { xs: 2, md: 5 },
          maxWidth: "1728px",
          width: "100%",
          mx: "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Logo isMobile={isMobile} />

        <Box sx={{ flexGrow: 1 }} />

        <NavActions isMobile={isMobile} />
      </Toolbar>
    </AppBar>
  );
}
