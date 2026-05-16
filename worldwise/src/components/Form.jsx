import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useData } from "../context/Contextprovider";
import React from "react";
import DatePicker from "react-datepicker";

function Form() {
  const { setcities } = useData();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [contrycode, setcontrycode] = useState("");
  const [cityData, setCityData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [nocity, setNocity] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
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
          setcontrycode(data.countryCode);
          const cityname = data.city;
          if (cityname) {
            setCityName(cityname);
            setCityData({
              cityName: data.city,
              country: data.countryName,
              emoji: data.countryCode.toLowerCase(),
              position: {
                lat: data.latitude,
                lng: data.longitude,
              },
            });
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

  function addCity(e) {
    e.preventDefault();
    if (!selectedDate || !cityName) return;
    const newcity = {
      ...cityData,
      id: crypto.randomUUID(),
      date: selectedDate,
      notes: notes,
    };
    setcities((cities) => [...cities, newcity]);
    navigate("/app/city");
  }
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
            <span className={styles.flag}>
              <img
                width="24px"
                src={`https://flagcdn.com/256x192/${contrycode.toLowerCase()}.webp`}
                alt={cityName}
              />
            </span>
          </div>

          <div className={styles.row}>
            <label htmlFor="date">When did you go to {cityName}?</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat={"dd/MM/yy"}
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
            <Button
              type={"primary"}
              onClick={(e) => {
                addCity(e);
              }}
            >
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
