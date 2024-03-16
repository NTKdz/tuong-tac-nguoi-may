import axios from "axios";
import fs from "fs";

axios
  .get(
    "https://www.newsapi.ai/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22locationUri%22%3A%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FUnited_States%22%7D%2C%22%24filter%22%3A%7B%22forceMaxDataTimeWindow%22%3A%2231%22%7D%7D&resultType=articles&articlesSortBy=rel&includeArticleSocialScore=true&includeArticleCategories=true&includeArticleLocation=true&includeArticleImage=true&apiKey=80e6dfda-35b9-4e5c-9a4d-80a83b945586"
  )
  .then((response) => {
    const json = response.data;
    const dataToSave = json;

    // Convert the data to JSON string
    const jsonData = JSON.stringify(dataToSave, null, 2);

    // Write the JSON data to a file
    fs.writeFile("src/mockdata/data3.json", jsonData, (err) => {
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
