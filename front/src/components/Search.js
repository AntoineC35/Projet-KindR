import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../reducers/authUser.reducer";
import { searchAround } from "../actions/users.action";
import { useEffect, useRef, useState } from "react";
import HomeCard from "./HomeCards";
import Map from "./Map";
import DateSelectionSearch from "./DateSelectionSearch";
import "../styles/search.css";

const Search = () => {
  const dispatch = useDispatch();
  const [isDropDownOpen1, setIsDropDownOpen1] = useState(false);
  const [isDropDownOpen2, setIsDropDownOpen2] = useState(false);
  const [isDropDownOpen3, setIsDropDownOpen3] = useState(false);
  const user = useSelector(selectCurrentUser);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([
    "assmat",
    "creche_public",
    "creche_privee",
    "babysitting",
  ]);
  const handleDropDown1 = () => {
    setIsDropDownOpen1(!isDropDownOpen1);
    setIsDropDownOpen2(false);
    setIsDropDownOpen3(false);
  };

  const handleDropDown2 = () => {
    setIsDropDownOpen2(!isDropDownOpen2);
    setIsDropDownOpen1(false);
    setIsDropDownOpen3(false);
  };

  const handleDropDown3 = () => {
    setIsDropDownOpen3(!isDropDownOpen3);
    setIsDropDownOpen1(false);
    setIsDropDownOpen2(false);
  };
  let menuRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsDropDownOpen1(false);
        setIsDropDownOpen2(false);
        setIsDropDownOpen3(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    const dropdownElement1 = document.querySelector(".bloc-links.dropdown-1");
    if (isDropDownOpen1 && dropdownElement1) {
      dropdownElement1.classList.add("open");
    } else if (!isDropDownOpen1 && dropdownElement1) {
      dropdownElement1.classList.remove("open");
    }

    const dropdownElement2 = document.querySelector(".bloc-links.dropdown-2");
    if (isDropDownOpen2 && dropdownElement2) {
      dropdownElement2.classList.add("open");
    } else if (!isDropDownOpen2 && dropdownElement2) {
      dropdownElement2.classList.remove("open");
    }

    const dropdownElement3 = document.querySelector(".bloc-links.dropdown-3");
    if (isDropDownOpen3 && dropdownElement3) {
      dropdownElement3.classList.add("open");
    } else if (!isDropDownOpen3 && dropdownElement3) {
      dropdownElement3.classList.remove("open");
    }
  }, [isDropDownOpen1, isDropDownOpen2, isDropDownOpen3]);

  function handleLocationSearch(params) {
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("distance", params);
    dispatch(searchAround(formData));
    setSelectedDistance(params);
  }

  function handleRoleChange(role) {
    const updatedRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((selectedRole) => selectedRole !== role)
      : [...selectedRoles, role];

    setSelectedRoles(updatedRoles);
  }

  return (
    <section className="search">
      <ul className="searchBar" ref={menuRef}>
        <li onClick={handleDropDown1} className="bloc-top top-1">
          <em>%</em>
          <h3>Ou ?</h3>
        </li>

        <ul className="bloc-links dropdown-1">
          <li
            onClick={() => handleLocationSearch(1)}
            style={{
              textDecoration: selectedDistance === 1 ? "underline" : "none",
            }}
          >
            <span>1 km</span>
          </li>
          <li
            onClick={() => handleLocationSearch(2)}
            style={{
              textDecoration: selectedDistance === 2 ? "underline" : "none",
            }}
          >
            <span>2 km</span>
          </li>
          <li
            onClick={() => handleLocationSearch(5)}
            style={{
              textDecoration: selectedDistance === 5 ? "underline" : "none",
            }}
          >
            <span>5 km</span>
          </li>
          <li
            onClick={() => handleLocationSearch(10)}
            style={{
              textDecoration: selectedDistance === 10 ? "underline" : "none",
            }}
          >
            <span>10 km</span>
          </li>
          <li
            onClick={() => handleLocationSearch(20)}
            style={{
              textDecoration: selectedDistance === 20 ? "underline" : "none",
            }}
          >
            <span>20 km</span>
          </li>
        </ul>

        <li onClick={handleDropDown2} className="bloc-top top-2">
          <em>&</em>
          <h3>Quoi ?</h3>
        </li>

        <ul className="bloc-links dropdown-2">
          <li>
            <input
              type="checkbox"
              id="assmat"
              checked={selectedRoles.includes("assmat")}
              onChange={() => handleRoleChange("assmat")}
            />
            <label htmlFor="assmat">Assistant(e) Maternel(le)</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="creche_public"
              checked={selectedRoles.includes("creche_public")}
              onChange={() => handleRoleChange("creche_public")}
            />
            <label htmlFor="creche_public">Crèche Municipale</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="creche_privee"
              checked={selectedRoles.includes("creche_privee")}
              onChange={() => handleRoleChange("creche_privee")}
            />
            <label htmlFor="creche_privee">Crèche Privée</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="babysitting"
              checked={selectedRoles.includes("babysitting")}
              onChange={() => handleRoleChange("babysitting")}
            />
            <label htmlFor="babysitting">Baby Sitting</label>
          </li>
        </ul>

        <li onClick={handleDropDown3} className="bloc-top top-3">
          <em>[</em>
          <h3>Quand ?</h3>
        </li>

        <ul className="bloc-links dropdown-3">
          <li>
            <DateSelectionSearch setIsDropDownOpen3={setIsDropDownOpen3} />
          </li>
        </ul>
      </ul>
      <Map />
      <HomeCard selectedRoles={selectedRoles} />
    </section>
  );
};

export default Search;
