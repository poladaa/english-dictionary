"use strict";
const inputEl = document.querySelector(".input");
const info = document.querySelector(".info");
const meaningContainer = document.querySelector(".meaning-container");
const title = document.querySelector(".title");
const meaning = document.querySelector(".meaning");
const audio = document.querySelector(".audio");

async function fetchApi(word) {
  try {
    info.style.display = "block";
    info.textContent = `Searching the meaning of the ${word}`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((response) => response.json());
    if (result.title) {
      meaningContainer.style.display = "block";
      info.style.display = "none";
      title.textContent = word;
      meaning.textContent = "N/A";
      audio.style.display = "none";
    } else {
      info.style.display = "none";
      meaningContainer.style.display = "block";
      audio.style.display = "inline-block";
      title.textContent = word;
      meaning.textContent = result[0].meanings[0].definitions[0].definition;
      audio.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    info.textContent = "Error";
  }
}

inputEl.addEventListener("keyup", (e) => {
  // console.log(e.key);
  if (e.target.value && e.key === "Enter") {
    fetchApi(e.target.value);
  }
});
