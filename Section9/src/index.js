import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
// import "./index.css";
// import App from "./components/App";

import StarRating from "./components/StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating
        color="blue"
        defaultRating={movieRating}
        maxRating={10}
        onSetRating={setMovieRating}
      />
      <p> This Movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Test />
    <StarRating maxRating={5} messages={["a", "b", "c", "d", "e"]} />
    <StarRating color="red" size={24} className="test" defaultRating={4} />
  </React.StrictMode>
);
