import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  CssBaseline,
  Box,
  Drawer,
  Typography,
  IconButton,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import Navbar from "./components/Navbar";
import ControlsBar from "./components/ControlsBar";
import MainContent from "./components/MainContent";
import Favourites from "./Favourites";
import Footer from "./components/Footer";
import Filters from "./components/Filters";

import { pokemons } from "./data/pokemon";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#333333",
    },
  },
  typography: {
    fontFamily: "Figtree, system-ui, sans-serif",

    h2: {
      fontSize: "22px",
      fontWeight: "600",
      "@media (min-width:900px)": {
        fontSize: "28px",
        fontWeight: "600",
      },
    },

    h3: {
      fontSize: "20px",
      fontWeight: "600",
      "@media (min-width:900px)": {
        fontSize: "20px",
        fontWeight: "600",
      },
    },

    h4: {
      fontSize: "16px",
      fontWeight: "600",
      "@media (min-width:900px)": {
        fontSize: "20px",
        fontWeight: "600",
      },
    },

    h5: {
      fontSize: "24px",
      fontWeight: "600",
    },

    body1: {
      fontSize: "18px",
    },

    filterTitle: {
      fontSize: "20px",
      fontWeight: "600",
      "@media (min-width:900px)": {
        fontSize: "20px",
      },
    },

    cardTitle: {
      fontSize: "24px",
      fontWeight: "700",
      "@media (min-width:900px)": {
        fontSize: "22px",
      },
    },

    cardType: {
      fontSize: "18px",
      "@media (min-width:900px)": {
        fontSize: "18px",
      },
    },

    statValue: {
      fontSize: "20px",
      fontWeight: 700,
      "@media (min-width:900px)": {
        fontSize: "20px",
      },
    },

    statLabel: {
      fontSize: "14px",
      color: "rgba(51,51,51,0.75)",
      "@media (min-width:900px)": {
        fontSize: "14px",
      },
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "18px",
          fontWeight: 600,
          color: "#333333",
          borderColor: "rgba(51,51,51,0.35)",
          borderRadius: "999px",
          "&:hover": {
            backgroundColor: "rgba(255, 203, 5, 0.25)",
          },
        },

        contained: {
          backgroundColor: "#333333",
          color: "#fff",

          boxShadow: "none", // remove default shadow
          "&:hover": {
            boxShadow: "none", // prevent hover shadow
            backgroundColor: "#333",
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "20px",
          fontWeight: 600,
          borderRadius: "999px",
          "&:hover": {
            backgroundColor: "rgba(255, 203, 5, 0.25)",
          },
        },
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
          borderBottom: "1px solid rgba(51,51,51,0.15)",
        },
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          margin: "16px 0",

          "&.Mui-expanded": {
            margin: "16px 0", // prevent jump
          },
        },
        root: {
          paddingLeft: 0,
          paddingRight: 0,
          minHeight: 64,

          "&.Mui-expanded": {
            minHeight: 64, // override expanded state
          },
        },
      },
    },

    MuiAccordionDetails: {
      styleOverrides: {
        root: ({ theme }) => ({
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1),
          paddingLeft: 0,
          paddingRight: 0,
        }),
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(255, 203, 5, 0.25)",
          },
        },
      },
    },

    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            opacity: 0.4,
          },
        },
        label: {
          fontSize: "18px",
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: "20px",
          paddingRight: "40px",
        },
        icon: ({ theme }) => ({
          right: "16px",
          color: theme.palette.text.primary,
        }),
        "@media (min-width:900px)": {
          paddingLeft: "24px",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "999px",
          paddingRight: "16px",

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(51,51,51,0.35)",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.primary,
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.primary,
            borderWidth: "2px",
          },
        }),
      },
    }, //
  },
});

function Home({ favourites, toggleFavourite }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [filters, setFilters] = useState({
    // Filters are empty lists on page load - nothing is selected
    types: [],
    hp: [],
    attack: [],
  });

  const [filtersOpen, setFiltersOpen] = useState(false); // To deal with responsive filters

  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    setActiveFilter(null);
  }, [filters]);

  const [sort, setSort] = useState({
    field: "name",
    direction: "asc",
  }); // sort is now a dictionary-like object. setSort replaces the entire object, both field and name
  // We use useMemo so that the calculation is only run when needed e.g. in this case, when the 'sort' state is updated

  const [sortOpen, setSortOpen] = useState(false);

  const processedData = useMemo(() => {
    let result = [...pokemons]; // Create a copy of the pokemons array, to preserve the original data

    // TYPE FILTER
    if (filters.types.length > 0) {
      result = result.filter((p) => filters.types.includes(p.type)); // Keeps only pokemon that match type conditions
    }

    // HP FILTER
    if (filters.hp.length > 0) {
      result = result.filter((p) =>
        filters.hp.some((range) => {
          // Keep pokemon that meet any of the selected criteria
          if (range === "0-50") return p.hp <= 50;
          if (range === "51-100") return p.hp > 50 && p.hp <= 100;
          if (range === "101-150") return p.hp > 100 && p.hp <= 150;
          if (range === "151-200") return p.hp > 150 && p.hp <= 200;
          return false;
        }),
      );
    }

    // ATTACK FILTER
    if (filters.attack.length > 0) {
      result = result.filter((p) =>
        filters.attack.some((range) => {
          if (range === "0-50") return p.attack <= 50;
          if (range === "51-100") return p.attack > 50 && p.attack <= 100;
          if (range === "101-150") return p.attack > 100 && p.attack <= 150;
          return false;
        }),
      );
    }

    // SORTING
    result.sort((a, b) => {
      let compare;

      if (sort.field === "name") {
        compare = a.name.localeCompare(b.name);
      } else {
        compare = a[sort.field] - b[sort.field]; // A positive or negative result indicates which item has a higher HP or attack value
      }

      return sort.direction === "asc" ? compare : -compare; // sort.direction === "asc" should be read as one chunk. Reversing +/- reverses order of cards
    });

    return result; // This returned value becomes processedData
  }, [filters, sort]); // These are the states useMemo needs to keep an eye on

  // Disable filters that aren't applicable

  const availableOptions = useMemo(() => {
    const getFiltered = (excludeKey) => {
      let result = [...pokemons];

      if (excludeKey !== "types" && filters.types.length > 0) {
        result = result.filter((p) => filters.types.includes(p.type));
      }

      if (excludeKey !== "hp" && filters.hp.length > 0) {
        result = result.filter((p) =>
          filters.hp.some((range) => {
            if (range === "0-50") return p.hp <= 50;
            if (range === "51-100") return p.hp > 50 && p.hp <= 100;
            if (range === "101-150") return p.hp > 100 && p.hp <= 150;
            if (range === "151-200") return p.hp > 150 && p.hp <= 200;
            return false;
          }),
        );
      }

      if (excludeKey !== "attack" && filters.attack.length > 0) {
        result = result.filter((p) =>
          filters.attack.some((range) => {
            if (range === "0-50") return p.attack <= 50;
            if (range === "51-100") return p.attack > 50 && p.attack <= 100;
            if (range === "101-150") return p.attack > 100 && p.attack <= 150;
            return false;
          }),
        );
      }

      return result;
    };

    return {
      types: new Set(
        (activeFilter === "types" ? processedData : getFiltered("types")).map(
          (p) => p.type,
        ),
      ),

      hp: new Set(
        (activeFilter === "hp" ? processedData : getFiltered("hp")).flatMap(
          (p) => {
            if (p.hp <= 50) return ["0-50"];
            if (p.hp <= 100) return ["51-100"];
            if (p.hp <= 150) return ["101-150"];
            if (p.hp <= 200) return ["151-200"];
            return [];
          },
        ),
      ),

      attack: new Set(
        (activeFilter === "attack"
          ? processedData
          : getFiltered("attack")
        ).flatMap((p) => {
          if (p.attack <= 50) return ["0-50"];
          if (p.attack <= 100) return ["51-100"];
          if (p.attack <= 150) return ["101-150"];
          return [];
        }),
      ),
    };
  }, [filters, activeFilter, processedData]);

  return (
    <Box
      sx={{
        mt: { xs: 3, md: 5 },
        width: "100%",
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
        <ControlsBar
          count={processedData.length}
          sort={sort}
          setSort={setSort}
          isMobile={isMobile}
          onOpenFilters={() => setFiltersOpen(true)}
          onOpenSort={() => setSortOpen(true)}
        />

        <Box sx={{ height: 24 }} />

        <MainContent
          data={processedData}
          originalData={pokemons}
          filters={filters}
          setFilters={setFilters}
          favourites={favourites}
          toggleFavourite={toggleFavourite}
          availableOptions={availableOptions}
          setActiveFilter={setActiveFilter}
        />

        {/* Filters mobile sheet */}
        <Drawer
          anchor="bottom"
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          PaperProps={{
            sx: {
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              px: 2,
              pt: 2,
              pb: 3,
              maxHeight: "85vh",
            },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5">Filter</Typography>

            <IconButton onClick={() => setFiltersOpen(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          {/* Filters sheet */}
          <Box sx={{ overflowY: "auto", mb: 2 }}>
            <Filters
              data={pokemons}
              originalData={pokemons}
              filters={filters}
              setFilters={setFilters}
              availableOptions={availableOptions}
              setActiveFilter={setActiveFilter}
              variant="sheet"
            />
          </Box>

          {/* Apply button in sheet */}
          <Button
            fullWidth
            variant="contained"
            onClick={() => setFiltersOpen(false)}
            sx={{
              borderRadius: "999px",
              py: 1.5,
            }}
          >
            Apply
          </Button>
        </Drawer>

        {/* Sort mobile sheet */}
        <Drawer
          anchor="bottom"
          open={sortOpen}
          onClose={() => setSortOpen(false)}
          PaperProps={{
            sx: {
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              px: 2,
              pt: 2,
              pb: 3,
              maxHeight: "85vh",
            },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5">Sort</Typography>

            <IconButton onClick={() => setSortOpen(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          {/* Options */}
          <RadioGroup
            value={`${sort.field}-${sort.direction}`}
            onChange={(e) => {
              const [field, direction] = e.target.value.split("-");
              setSort({ field, direction });
              setSortOpen(false); // close immediately
            }}
            sx={{ gap: 1 }}
          >
            <FormControlLabel
              value="name-asc"
              control={<Radio />}
              label="Alphabetically"
            />
            <FormControlLabel
              value="hp-desc"
              control={<Radio />}
              label="HP (high to low)"
            />
            <FormControlLabel
              value="hp-asc"
              control={<Radio />}
              label="HP (low to high)"
            />
            <FormControlLabel
              value="attack-desc"
              control={<Radio />}
              label="Attack"
            />
            <FormControlLabel
              value="attack-asc"
              control={<Radio />}
              label="Attack (low to high)"
            />
          </RadioGroup>
        </Drawer>

        <Box sx={{ height: 40 }} />
      </Box>
    </Box>
  );
}

export default function App() {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  }); // favourites as a state is a list of all favourited cards, stored in browser. true/false would only support a single card

  // FAVOURITE FUNCTION - takes pokemon id and checks to see whether it is in the current state i.e. list of favourites
  const toggleFavourite = (id) => {
    setFavourites((prev) => {
      // prev is provided by React. It is the current favourites state
      const exists = prev.includes(id); // returns true or false

      return exists
        ? prev.filter((favId) => favId !== id) // .filter loops through the prev array and returns whatever is left after id has been removed
        : [...prev, id]; // Returns the prev array + the new id
    });
  };

  // Store favourites in browser
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  favourites={favourites}
                  toggleFavourite={toggleFavourite}
                />
              }
            />
            <Route
              path="/favourites"
              element={
                <Favourites
                  favourites={favourites}
                  toggleFavourite={toggleFavourite}
                />
              }
            />
          </Routes>
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
