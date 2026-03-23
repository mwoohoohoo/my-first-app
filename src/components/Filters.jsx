import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Filters({
  data,
  filters,
  setFilters,
  originalData,
  variant = "desktop",
  availableOptions,
  setActiveFilter,
}) {
  const isMobileSheet = variant === "sheet";

  availableOptions = availableOptions || {
    types: new Set(),
    hp: new Set(),
    attack: new Set(),
  };

  const uniqueTypes = [...new Set(originalData.map((p) => p.type))].sort(
    (a, b) => a.localeCompare(b),
  ); // Returns the unqiue pokemon types from the dataset

  const handleTypeChange = (type) => {
    setActiveFilter("types");
    setFilters((prev) => {
      // Takes previous state and returns a new one as per the function. Remember, 'prev' is a dictionary containing types, hp and attack as lists
      const exists = prev.types.includes(type); // Checks if the list 'types' in the state contains this new type

      return {
        ...prev, // This line preserves whatever was in the previous filter state and means that the next line only changes what was changed
        types: exists
          ? prev.types.filter((t) => t !== type) // If this new 'type' is already in the types list, remove it
          : [...prev.types, type], // Otherwise, add it
      };
    });
  };

  const handleHpChange = (range) => {
    setActiveFilter("hp");
    setFilters((prev) => {
      const exists = prev.hp.includes(range);

      return {
        ...prev,
        hp: exists ? prev.hp.filter((r) => r !== range) : [...prev.hp, range],
      };
    });
  };

  const handleAttackChange = (range) => {
    setActiveFilter("attack");
    setFilters((prev) => {
      const exists = prev.attack.includes(range);

      return {
        ...prev,
        attack: exists
          ? prev.attack.filter((r) => r !== range)
          : [...prev.attack, range],
      };
    });
  };

  //Desktop
  if (!isMobileSheet) {
    return (
      <>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="filterTitle">Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {uniqueTypes.map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={filters.types.includes(type)} // checked state
                    onChange={() => handleTypeChange(type)} // onchange
                    disabled={
                      !availableOptions.types.has(type) &&
                      !filters.types.includes(type)
                    } // disable unavailable filters
                  />
                }
                label={type}
              />
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="filterTitle">HP</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {["0-50", "51-100", "101-150", "151-200"].map((range) => (
              <FormControlLabel
                key={range}
                control={
                  <Checkbox
                    checked={filters.hp.includes(range)}
                    onChange={() => handleHpChange(range)}
                    disabled={
                      !availableOptions.hp.has(range) &&
                      !filters.hp.includes(range)
                    }
                  />
                }
                label={range}
              />
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="filterTitle">Attack</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {["0-50", "51-100", "101-150"].map((range) => (
              <FormControlLabel
                key={range}
                control={
                  <Checkbox
                    checked={filters.attack.includes(range)}
                    onChange={() => handleAttackChange(range)}
                    disabled={
                      !availableOptions.attack.has(range) &&
                      !filters.attack.includes(range)
                    }
                  />
                }
                label={range}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      </>
    );
  }
  // Mobile
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* TYPE */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="filterTitle" sx={{ mb: 1 }}>
          Type
        </Typography>

        {uniqueTypes.map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox
                checked={filters.types.includes(type)}
                onChange={() => handleTypeChange(type)}
              />
            }
            label={type}
          />
        ))}
      </Box>

      {/* HP */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="filterTitle" sx={{ mb: 1 }}>
          HP
        </Typography>

        {["0-50", "51-100", "101-150", "151-200"].map((range) => (
          <FormControlLabel
            key={range}
            control={
              <Checkbox
                checked={filters.hp.includes(range)}
                onChange={() => handleHpChange(range)}
              />
            }
            label={range}
          />
        ))}
      </Box>

      {/* ATTACK */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="filterTitle" sx={{ mb: 1 }}>
          Attack
        </Typography>

        {["0-50", "51-100", "101-150"].map((range) => (
          <FormControlLabel
            key={range}
            control={
              <Checkbox
                checked={filters.attack.includes(range)}
                onChange={() => handleAttackChange(range)}
              />
            }
            label={range}
          />
        ))}
      </Box>
    </Box>
  );
}
