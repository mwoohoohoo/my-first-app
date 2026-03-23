import { Box } from "@mui/material";
import PokemonCard from "./PokemonCard";

export default function PokemonGrid({ data, favourites, toggleFavourite }) {
  return (
    <Box
      sx={{
        display: "grid",
        width: "100%",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(auto-fill, minmax(220px, 1fr))",
        },
        gap: { xs: 2, md: 3 },
      }}
    >
      {data.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          favourites={favourites}
          toggleFavourite={toggleFavourite}
        />
      ))}
    </Box>
  );
}
