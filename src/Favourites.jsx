import { Box, Typography, Button } from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";

import ControlsBar from "./components/ControlsBar";
import PokemonGrid from "./components/PokemonGrid";
import { pokemons } from "./data/pokemon";

export default function Favourites({ favourites, toggleFavourite }) {
  const favouriteData = useMemo(() => {
    return pokemons.filter((p) => favourites.includes(p.id));
  }, [favourites]);

  const isEmpty = favouriteData.length === 0;

  return (
    <Box
      sx={{
        mt: { xs: 3, md: 5 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1728px",
          px: { xs: 2, md: 5 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <ControlsBar title="Favourites" count={favouriteData.length} />

        <Box sx={{ height: 24 }} />

        {/* Empty state */}
        {isEmpty ? (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
            }}
          >
            <Typography variant="h3" mb={2}>
              No favourites yet
            </Typography>

            <Typography fontSize={18} mb={3}>
              You haven’t favourited any Pokémon yet. Start exploring and add
              some!
            </Typography>

            <Button
              variant="contained"
              sx={{ py: 1.5 }}
              component={Link}
              to="/"
            >
              Go to home
            </Button>
          </Box>
        ) : (
          <PokemonGrid
            data={favouriteData}
            favourites={favourites}
            toggleFavourite={toggleFavourite}
          />
        )}

        <Box sx={{ height: 40 }} />
      </Box>
    </Box>
  );
}
