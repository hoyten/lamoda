import { useMemo, useState } from "react";
import Good from "./Good";
import Search from "./Search";
import generateGoods from "../data/generate";
import "./App.css";
import MultiSelect from "./MultiSelect";
import { useDebounce } from "../hooks/useDebounce";
import RangeSelect from "./RangeSelect";
import { sorters } from "../data/sortings";
import Selectors from "./Selectors";

function App() {
  const [goods] = useState(generateGoods(500));
  const [sortKey, setSortKey] = useState("us");
  const [filters, setFilters] = useState({
    price: () => true,
    color: () => true,
    search: () => true,
    gender: () => true,
    sizes: () => true,
  });

  const defFilters = useDebounce(filters);

  const handleSearchValue = (searchString) => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      search: (g) => g.name.toLowerCase().includes(searchString.toLowerCase()),
    }));
  };

  const handleColorsSelection = (selected) => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      color: selected.size ? (g) => selected.has(g.color) : () => true,
    }));
  };

  const handleGenderSelection = (selected) => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      gender: selected.size ? (g) => selected.has(g.gender) : () => true,
    }));
  };

  const handleSizesSelection = (selected) => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      sizes: selected.size
        ? (g) =>
            selected.size === g.sizes.length &&
            g.sizes.every((size) => selected.has(size))
        : () => true,
    }));
  };

  const handlePriceChange = (min, max) => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      price: (g) =>
        (min ? g.price >= min : true) && (max ? g.price <= max : true),
    }));
  };

  const showGoods = useMemo(() => {
    return goods
      .filter((g) => Object.values(defFilters).every((f) => f(g)))
      .sort(sorters[sortKey] || (() => 0));
  }, [defFilters, goods, sortKey]);

  const existColors = useMemo(
    () => [...new Set(goods.map((g) => g.color))],
    [goods]
  );
  const existGenders = useMemo(
    () => [...new Set(goods.map((g) => g.gender))],
    [goods]
  );
  const existSizes = useMemo(
    () => [...new Set(goods.flatMap((g) => g.sizes))],
    [goods]
  ); // Получаем уникальные размеры

  return (
    <div className="wrapper">
      <Search onChange={handleSearchValue} />
      <Selectors
        options={Object.keys(sorters)}
        onSelect={setSortKey}
        active={sortKey}
      />
      <div className="columns">
        <div className="filters">
          <h3>Цвет:</h3>
          <MultiSelect options={existColors} onSelect={handleColorsSelection} />
          <h3>Пол:</h3>
          <MultiSelect
            options={existGenders}
            onSelect={handleGenderSelection}
          />
          <h3>Размер:</h3>
          <MultiSelect options={existSizes} onSelect={handleSizesSelection} />
          <h3>Цена:</h3>
          <RangeSelect onChange={handlePriceChange} />
          <h4>Всего товаров: {showGoods.length}</h4>
        </div>
        <div className="grid_goods">
          {showGoods.map((good) => (
            <Good {...good} key={good.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
