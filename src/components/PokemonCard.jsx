import { Box, Typography, IconButton } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { typeColors } from "../data/typeColors";

export default function PokemonCard({ pokemon, favourites, toggleFavourite }) {
  const color = typeColors[pokemon.type.toLowerCase()];
  const isFavourited = favourites.includes(pokemon.id);

  return (
    <Box
      sx={{
        aspectRatio: "3 / 4",
        backgroundColor: color,
        borderRadius: "clamp(16px, 2vw, 24px)",
        p: "clamp(6px, 0.8vw, 8px)",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.12)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "clamp(12px, 1.5vw, 16px)",
          height: "100%",
          px: 2,
          pt: 2,
          pb: 2.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 0.25, md: 0.2 },
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between">
            <Typography variant="cardTitle">{pokemon.name}</Typography>

            <IconButton
              size="small"
              onClick={() => toggleFavourite(pokemon.id)}
            >
              {isFavourited ? <FavoriteIcon /> : <FavoriteBorderRoundedIcon />}
            </IconButton>
          </Box>
          <Typography variant="cardType">{pokemon.type}</Typography>
        </Box>

        {/* Image */}
        <Box
          component="img"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />

        {/* Stats */}
        <Box display="flex" justifyContent="space-between">
          {/* Attack */}
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
            <Typography variant="statValue">{pokemon.attack}</Typography>
            <Typography variant="statLabel">attack</Typography>
          </Box>

          {/* HP */}
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
            <Typography variant="statLabel">HP</Typography>
            <Typography variant="statValue">{pokemon.hp}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
