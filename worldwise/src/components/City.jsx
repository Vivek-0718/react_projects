import { useData } from "../context/Contextprovider";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import Button from "./Button";
import { useEffect } from "react";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currCities, setcity } = useData();
  const currentCity = currCities.find((i) => i.id === id);
  const { cityName, emoji, date, notes } = currentCity;

  useEffect(
    function name() {
      setcity(currentCity);
    },
    [setcity, currentCity],
  );
  return (
    <div className={styles.city}>
      <div>
        <Button
          type={"back"}
          onClick={() => {
            navigate("/app/city");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
              fill="currentColor"
            />
          </svg>{" "}
        </Button>
      </div>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>
            <img
              width="24px"
              src={`https://flagcdn.com/256x192/${emoji}.webp`}
              alt={cityName}
            />
          </span>
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
    </div>
  );
}

export default City;
