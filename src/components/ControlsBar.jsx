import { Box, Typography, Select, MenuItem, Button } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ImportExportRoundedIcon from "@mui/icons-material/ImportExportRounded";

export default function ControlsBar({
  count,
  isMobile,
  sort,
  setSort,
  title,
  onOpenFilters,
  onOpenSort,
}) {
  const isSimple = !!title;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      {/* Title / Count */}
      <Typography variant={title ? "h2" : "h3"}>
        {title || `${count} Pokémon`}
      </Typography>

      {/* RIGHT SIDE CONTAINER (ALWAYS PRESENT) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "stretch", md: "flex-end" },
          width: {
            xs: "100%",
            md: "clamp(160px, 20vw, 220px)",
          },
        }}
      >
        {/* ONLY show controls if NOT simple */}
        {!isSimple && (
          <>
            {/* MOBILE BUTTONS */}
            {isMobile && (
              <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
                {onOpenFilters && (
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<TuneRoundedIcon />}
                    onClick={onOpenFilters}
                    sx={{ borderRadius: "999px", py: 1.5 }}
                  >
                    Filter
                  </Button>
                )}

                {onOpenSort && (
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ImportExportRoundedIcon />}
                    onClick={onOpenSort}
                    sx={{ borderRadius: "999px", py: 1.5 }}
                  >
                    Sort
                  </Button>
                )}
              </Box>
            )}

            {/* DESKTOP SELECT */}
            {!isMobile && sort && setSort && (
              <Select
                value={`${sort.field}-${sort.direction}`}
                onChange={(e) => {
                  const [field, direction] = e.target.value.split("-");
                  setSort({ field, direction });
                }}
                IconComponent={ExpandMoreRoundedIcon}
                size="small"
                sx={{
                  borderRadius: "999px",
                  width: "100%",
                }}
              >
                <MenuItem value="name-asc">Sort by name (A - Z)</MenuItem>
                <MenuItem value="name-desc">Sort by name (Z - A)</MenuItem>
                <MenuItem value="hp-asc">Sort by HP (ascending)</MenuItem>
                <MenuItem value="hp-desc">Sort by HP (descending)</MenuItem>
                <MenuItem value="attack-asc">
                  Sort by attack (ascending)
                </MenuItem>
                <MenuItem value="attack-desc">
                  Sort by attack (descending)
                </MenuItem>
              </Select>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
