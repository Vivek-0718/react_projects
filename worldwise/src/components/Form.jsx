// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [nocity, setNocity] = useState(false);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [search] = useSearchParams();
  const lat = parseFloat(search.get("lat"));
  const lng = parseFloat(search.get("lng"));
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchData() {
        try {
          setNocity(false);
          setLoading(true);
          let res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
            { signal: controller.signal },
          );
          if (!res.ok) throw new Error("Something went working");
          let data = await res.json();
          const cityname = data.city;
          if (cityname) {
            setCityName(cityname);
          } else {
            setNocity(true);
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
      fetchData();

      return () => {
        controller.abort();
      };
    },
    [lat, lng],
  );
  return (
    <>
      {isLoading ? (
        <Spinner></Spinner>
      ) : nocity ? (
        <p className={styles.message}>
          👋 That doesn't seem to be a city. Click somewhere else 😉
        </p>
      ) : (
        <form className={styles.form}>
          <div className={styles.row}>
            <label htmlFor="cityName">City name</label>
            <input
              id="cityName"
              onChange={(e) => setCityName(e.target.value)}
              value={cityName}
            />
            {/* <span className={styles.flag}>{emoji}</span> */}
          </div>

          <div className={styles.row}>
            <label htmlFor="date">When did you go to {cityName}?</label>
            <input
              id="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="notes">Notes about your trip to {cityName}</label>
            <textarea
              id="notes"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            />
          </div>

          <div className={styles.buttons}>
            <Button type={"primary"} onClick={() => navigate("city")}>
              Add
            </Button>
            <Button
              type={"back"}
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              &larr; Back
            </Button>
          </div>
        </form>
      )}
    </>
  );
}

export default Form;
