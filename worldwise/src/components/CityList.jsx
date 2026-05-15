import { Link } from "react-router-dom";
import { useData } from "../context/Contextprovider";
import styles from "./CityList.module.css";
import itemStyles from "./CityItem.module.css";
function CityList() {
  const { currCities, handleRemoveCity } = useData();
  return currCities.length > 0 ? (
    <ul className={styles.cityList}>
      {currCities.map((c, i) => {
        return <Li c={c} handleRemoveCity={handleRemoveCity} key={c.id}></Li>;
      })}
    </ul>
  ) : (
    <p className={styles.message}>
      👋 Add your first city by clicking on a city on the map
    </p>
  );
}

export default CityList;

function Li({ c, handleRemoveCity }) {
  const { currCity } = useData();

  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  });

  const visitedDate = formatter.format(new Date(c.date));
  return (
    <li>
      <Link
        to={`${c.id}?lat=${c.position.lat}&lng=${c.position.lng}`}
        className={`${itemStyles.cityItem} ${currCity.id === c.id ? itemStyles["cityItem--active"] : ""}`}
      >
        <div className={itemStyles.emoji}>
          <img
            width="24px"
            src={`https://flagcdn.com/256x192/${c.emoji}.webp`}
            alt={c.country}
          />
        </div>
        <h3 className={itemStyles.name}>{c.cityName}</h3>
        <div className={itemStyles.date}>({visitedDate})</div>
        <button
          className={itemStyles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            handleRemoveCity(c);
          }}
        >
          ×
        </button>
      </Link>
    </li>
  );
}
