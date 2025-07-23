import PropTypes from "prop-types";
import { Filter, X } from "lucide-react";
import { useState } from "react";

const FilterSection = ({
  sortBy,
  setSortBy,
  filterSpice,
  setFilterSpice,
  filterVeg,
  setFilterVeg,
  filterNonVegType,
  setFilterNonVegType,
  filterSize,
  setFilterSize,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const resetFilters = () => {
    setSortBy("popular");
    setFilterSpice("all");
    setFilterVeg("all");
    setFilterNonVegType("all");
    setFilterSize("all");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-primary border border-border rounded-lg p-4 mb-8">
        {/* Mobile Filter Toggle */}
        <div className="sm:hidden flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary-foreground" />
            <span className="font-semibold text-primary-foreground">
              Filters & Sort
            </span>
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="text-primary-foreground hover:text-primary-foreground/80"
            aria-label={isFilterOpen ? "Close filters" : "Open filters"}
          >
            {isFilterOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Filter className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Filter Content */}
        <div className={`${isFilterOpen ? "block" : "hidden"} sm:block`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary-foreground flex items-center gap-1">
                <span>Sort By</span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent hover:bg-background/90 transition-colors"
                aria-label="Sort products"
              >
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="spice-low">Spice: Mild to Hot</option>
                <option value="spice-high">Spice: Hot to Mild</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary-foreground flex items-center gap-1">
                <span>Spice Level</span>
              </label>
              <select
                value={filterSpice}
                onChange={(e) => setFilterSpice(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent hover:bg-background/90 transition-colors"
                aria-label="Filter by spice level"
              >
                <option value="all">All Levels</option>
                <option value="1">Mild (1🌶️)</option>
                <option value="2">Medium (2🌶️)</option>
                <option value="3">Hot (3🌶️)</option>
                <option value="4">Very Hot (4🌶️)</option>
                <option value="5">Extremely Hot (5🌶️)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary-foreground flex items-center gap-1">
                <span>Diet</span>
              </label>
              <select
                value={filterVeg}
                onChange={(e) => setFilterVeg(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent hover:bg-background/90 transition-colors"
                aria-label="Filter by diet type"
              >
                <option value="all">All</option>
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary-foreground flex items-center gap-1">
                <span>Non-Veg Type</span>
              </label>
              <select
                value={filterNonVegType}
                onChange={(e) => setFilterNonVegType(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent hover:bg-background/90 transition-colors"
                aria-label="Filter by non-vegetarian type"
              >
                <option value="all">All</option>
                <option value="Chicken">Chicken</option>
                <option value="Seafood">Seafood</option>
                <option value="Mutton">Mutton</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-primary-foreground flex items-center gap-1">
                <span>Size</span>
              </label>
              <select
                value={filterSize}
                onChange={(e) => setFilterSize(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent hover:bg-background/90 transition-colors"
                aria-label="Filter by size"
              >
                <option value="all">All Sizes</option>
                <option value="250g">250g</option>
                <option value="300g">300g</option>
                <option value="400g">400g</option>
                <option value="500g">500g</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="bg-white text-primary px-4 py-2 rounded-md border border-border hover:bg-background/90 transition-colors text-sm font-medium"
              aria-label="Reset all filters"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

FilterSection.propTypes = {
  sortBy: PropTypes.oneOf([
    "popular",
    "price-low",
    "price-high",
    "spice-low",
    "spice-high",
    "rating",
  ]).isRequired,
  setSortBy: PropTypes.func.isRequired,
  filterSpice: PropTypes.oneOf(["all", "1", "2", "3", "4", "5"]).isRequired,
  setFilterSpice: PropTypes.func.isRequired,
  filterVeg: PropTypes.oneOf(["all", "veg", "non-veg"]).isRequired,
  setFilterVeg: PropTypes.func.isRequired,
  filterNonVegType: PropTypes.oneOf(["all", "Chicken", "Seafood", "Mutton"])
    .isRequired,
  setFilterNonVegType: PropTypes.func.isRequired,
  filterSize: PropTypes.oneOf(["all", "250g", "300g", "400g", "500g"])
    .isRequired,
  setFilterSize: PropTypes.func.isRequired,
};

export default FilterSection;
