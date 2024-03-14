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
  };

  const handleDropDown2 = () => {
    setIsDropDownOpen2(!isDropDownOpen2);
  };

  const handleDropDown3 = () => {
    setIsDropDownOpen3(!isDropDownOpen3);
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
      <div className="searchBar" ref={menuRef}>
        <button onClick={handleDropDown1} className="bloc-top">
          <em>%</em>
          <h3>Ou ?</h3>
        </button>
        {isDropDownOpen1 && (
          <div className="bloc-links dropdown-1">
            <ul>
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
                  textDecoration:
                    selectedDistance === 10 ? "underline" : "none",
                }}
              >
                <span>10 km</span>
              </li>
              <li
                onClick={() => handleLocationSearch(20)}
                style={{
                  textDecoration:
                    selectedDistance === 20 ? "underline" : "none",
                }}
              >
                <span>20 km</span>
              </li>
            </ul>
          </div>
        )}
        <button onClick={handleDropDown2} className="bloc-top">
          <em>&</em>
          <h3>Quoi ?</h3>
        </button>
        {isDropDownOpen2 && (
          <div className="bloc-links dropdown-2">
            <ul>
              <li
                onClick={() => handleRoleChange("assmat")}
                style={{
                  fontWeight: selectedRoles.includes("assmat")
                    ? "bold"
                    : "normal",
                }}
              >
                Assistant(e) Maternel(le)
              </li>
              <li
                onClick={() => handleRoleChange("creche_public")}
                style={{
                  fontWeight: selectedRoles.includes("creche_public")
                    ? "bold"
                    : "normal",
                }}
              >
                Crèche Municipale
              </li>
              <li
                onClick={() => handleRoleChange("creche_privee")}
                style={{
                  fontWeight: selectedRoles.includes("creche_privee")
                    ? "bold"
                    : "normal",
                }}
              >
                Crèche Privée
              </li>
              <li
                onClick={() => handleRoleChange("babysitting")}
                style={{
                  fontWeight: selectedRoles.includes("babysitting")
                    ? "bold"
                    : "normal",
                }}
              >
                Baby Sitting
              </li>
            </ul>
          </div>
        )}
        <button onClick={handleDropDown3} className="bloc-top">
          <em>[</em>
          <h3>Quand ?</h3>
        </button>
        {isDropDownOpen3 && (
          <div className="bloc-links dropdown-3">
            <DateSelectionSearch />
          </div>
        )}
      </div>
      <Map />
      <HomeCard selectedRoles={selectedRoles} />
    </section>
  );
};

export default Search;
