import fetch from "node-fetch";

const datas = {
  access_key: "9af2f705-2974-4340-8b55-d69040b944ab",

  argument: {
    date: "2021-08-30",
    provider: [],
  },
};

const url = "http://tools.kinds.or.kr:8888/search/news";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(datas),
};
// fetch(url, options)
//   .then((response) => console.log("response:", response))
//   .catch((error) => console.log("error:", error));

fetch(url, options)
  .then((response) => response.json())
  .then((data) => console.log(data));
