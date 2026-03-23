import Grid from "@mui/material/Grid";
import Filters from "./Filters";
import PokemonGrid from "./PokemonGrid";

export default function MainContent({
  data,
  filters,
  setFilters,
  originalData,
  favourites,
  toggleFavourite,
  availableOptions,
  setActiveFilter,
}) {
  return (
    <Grid container spacing={{ xs: 2, md: 5 }}>
      {/* Filters */}
      <Grid
        size={{ xs: 12, md: 2 }}
        sx={{
          display: { xs: "none", md: "block" }, // Hide on mobile
        }}
      >
        <Filters
          data={data}
          originalData={originalData}
          filters={filters}
          setFilters={setFilters}
          availableOptions={availableOptions}
          setActiveFilter={setActiveFilter}
        />
      </Grid>

      {/* Grid */}
      <Grid size={{ xs: 12, md: 10 }}>
        <PokemonGrid
          data={data}
          favourites={favourites}
          toggleFavourite={toggleFavourite}
        />
      </Grid>
    </Grid>
  );
}
