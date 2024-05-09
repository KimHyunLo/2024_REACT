import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [serachParams, setSearchParams] = useSearchParams();
  const sortBy = serachParams.get("sortBy") || options[0].value;

  function handleChange(e) {
    serachParams.set("sortBy", e.target.value);
    setSearchParams(serachParams);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
