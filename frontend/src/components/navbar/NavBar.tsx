import React from "react";
import { Button } from "../button/Button";
import "./styles.css";
import SearchBar from "../searchbar/SearchBar";

const pageRoutes = [
  { name: "art", route: "art" },
  { name: "Business", route: "art" },
  { name: "Computers", route: "art" },
  { name: "Health", route: "art" },
  { name: "Home", route: "art" },
  { name: "Science", route: "art" },
  { name: "Sports", route: "art" },
  { name: "Weather", route: "art" },
];

const style: React.CSSProperties = {
  flex: "1",
  backgroundColor: "transparent",
  border: "0px transparent",
  borderRadius: "0px",
};

export default function NavBar() {
  function navigatingRoute(
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    console.log(e?.currentTarget.name);
  }
  return (
    <div className="navbar-container">
      <div className="navbar-logo-container">
        <img id="navbar-logo" src="src/assets/logos/logo-black.svg" alt="" />
      </div>
      <div className="navbar-routes">
        {pageRoutes.map((route, key) => {
          return (
            <Button
              key={key}
              content={route.name}
              name={route.route}
              onClick={navigatingRoute}
              style={style}
            />
          );
        })}
      </div>
      <div className="navbar-searchBar-container">
        <SearchBar />
      </div>

      <div className="navbar-setting-container">
        <Button content="login" onClick={navigatingRoute} style={style} />
      </div>
    </div>
  );
}
