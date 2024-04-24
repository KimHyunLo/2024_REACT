import styles from "./CountryList.module.css";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import CountryItem from "./CountryItem";
import { useCities } from "../context/CitiesContext";

function CountryList() {
  const { cities, isLoaidng } = useCities();

  if (isLoaidng) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);

  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.emoji} />
      ))}
    </div>
  );
}

export default CountryList;
