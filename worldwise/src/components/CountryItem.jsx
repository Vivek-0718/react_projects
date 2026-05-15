import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>
        <img
          width="24px"
          src={`https://flagcdn.com/256x192/${country.emoji}.webp`}
          alt={country.country}
        />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
