import styles from "./CityList.module.css";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import CityItem from "./CityItem";
import { useCities } from "../context/CitiesContext";

function CityList() {
  const { cities, isLoaidng } = useCities();

  if (isLoaidng) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;

  return (
    <div className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </div>
  );
}

export default CityList;
