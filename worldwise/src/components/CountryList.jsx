import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useData } from "../context/Contextprovider";
function CountryList() {
  const { currCities } = useData();
  const country = currCities.reduce((agg, val) => {
    return agg.some((i) => i.country === val.country)
      ? [...agg]
      : [...agg, { emoji: val.emoji, country: val.country }];
  }, []);

  return (
    <ul className={styles.countryList}>
      {country.map((c) => (
        <CountryItem country={c} key={c.country}></CountryItem>
      ))}
    </ul>
  );
}

export default CountryList;
