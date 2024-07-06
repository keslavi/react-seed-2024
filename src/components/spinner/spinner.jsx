import React, { useEffect, useState } from "react";
import spinner from "./spinner.gif";

const sessionRequestCount = () => {
  return sessionStorage.getItem("httpRequestCount") || 0;
};

export const Spinner = (props) => {
  const [reqCount, setReqCount] = useState(sessionRequestCount());

  useEffect(() => {
    //todo: fix this.   /store/api.js increments and removes, but the listener isn't working.
    const storage = (event) => {
      if (event.originalEvent.storageArea === sessionStorage) {
        const data = sessionRequestCount();
        if (data) setReqCount(data);
      }
    };
    window.addEventListener("storage", storage);

    return () => {
      window.removeEventListener("storage", storage);
    };
  }, []);

  return (
    <>
      (todo: fix /components/spinner)
      <div className={reqCount < 1 ? "hidden" : "spinner"}>
        <img id="spinner-image" src={spinner} alt="Loading..." />
      </div>
    </>
  );
};

export default Spinner;
