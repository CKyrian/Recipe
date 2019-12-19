import React from "react";

function formatText(string) {
  const arr = string.split(".");
  return arr.map(sentence => (
    <>
      <p>{sentence}</p>
    </>
  ));
}

export default formatText;
