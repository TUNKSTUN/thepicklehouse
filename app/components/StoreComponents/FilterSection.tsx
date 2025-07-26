import { Form, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface FilterSectionProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  filterSpice: string;
  setFilterSpice: (value: string) => void;
  filterVeg: string;
  setFilterVeg: (value: string) => void;
  filterSize: string;
  setFilterSize: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
}

export default function FilterSection({
  sortBy,
  setSortBy,
  filterSpice,
  setFilterSpice,
  filterVeg,
  setFilterVeg,
  filterSize,
  setFilterSize,
  category,
  setCategory,
}: FilterSectionProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  // Sync local state with URL query params
  useEffect(() => {
    console.log(
      "FilterSection useEffect - searchParams:",
      Object.fromEntries(searchParams)
    );
    const params = Object.fromEntries(searchParams);
    setSortBy(params.sortBy || "popular");
    setFilterSpice(params.filterSpice || "all");
    setFilterVeg(params.filterVeg || "all");
    setFilterSize(params.filterSize || "all");
    setCategory(params.category || "all");
  }, [
    searchParams,
    setSortBy,
    setFilterSpice,
    setFilterVeg,
    setFilterSize,
    setCategory,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newParams = Object.fromEntries(formData);
    console.log("FilterSection handleSubmit - newParams:", newParams);
    setSearchParams(newParams, { replace: true });
  };

  return (
    <Form
      method="get"
      className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      ref={formRef}
      onSubmit={handleSubmit}
      key={searchParams.toString()}
    >
      <div>
        <Label
          htmlFor="sortBy"
          className="block text-sm font-medium text-foreground"
        >
          Sort By
        </Label>
        <Select name="sortBy" value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="spice-low">Spice: Low to High</SelectItem>
            <SelectItem value="spice-high">Spice: High to Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label
          htmlFor="filterSpice"
          className="block text-sm font-medium text-foreground"
        >
          Spice Level
        </Label>
        <Select
          name="filterSpice"
          value={filterSpice}
          onValueChange={setFilterSpice}
        >
          <SelectTrigger>
            <SelectValue placeholder="Spice Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="1">Mild</SelectItem>
            <SelectItem value="2">Medium</SelectItem>
            <SelectItem value="3">Hot</SelectItem>
            <SelectItem value="4">Extra Hot</SelectItem>
            <SelectItem value="5">Extreme</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label
          htmlFor="filterVeg"
          className="block text-sm font-medium text-foreground"
        >
          Type
        </Label>
        <Select name="filterVeg" value={filterVeg} onValueChange={setFilterVeg}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="veg">Vegetarian</SelectItem>
            <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label
          htmlFor="filterSize"
          className="block text-sm font-medium text-foreground"
        >
          Size
        </Label>
        <Select
          name="filterSize"
          value={filterSize}
          onValueChange={setFilterSize}
        >
          <SelectTrigger>
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label
          htmlFor="category"
          className="block text-sm font-medium text-foreground"
        >
          Category
        </Label>
        <Select name="category" value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pickle">Pickle</SelectItem>
            <SelectItem value="sauce">Sauce</SelectItem>
            <SelectItem value="chutney">Chutney</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-1 sm:col-span-2 lg:col-span-5 flex gap-4 mt-4">
        <Button
          type="submit"
          className="flex-1 bg-primary text-white hover:bg-primary/90"
        >
          Apply Filters
        </Button>
        <Button
          type="button"
          onClick={() => setSearchParams({}, { replace: true })}
          className="flex-1"
          variant="outline"
        >
          Clear Filters
        </Button>
      </div>
    </Form>
  );
}
