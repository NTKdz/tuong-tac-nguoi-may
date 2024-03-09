import axios from "axios";
import fs from "fs";

axios
  .get(
    "https://www.newsapi.ai/api/v1/article/getArticles?apiKey=80e6dfda-35b9-4e5c-9a4d-80a83b945586&locationUri=http://en.wikipedia.org/wiki/Vietnam&forceMaxDataTimeWindow=31&articlesSortBy=date&lang=vie"
  )
  .then((response) => {
    const json = response.data;
    const dataToSave = json;

    // Convert the data to JSON string
    const jsonData = JSON.stringify(dataToSave, null, 2);

    // Write the JSON data to a file
    fs.writeFile("src/mockdata/data2.json", jsonData, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Data saved to file successfully.");
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
