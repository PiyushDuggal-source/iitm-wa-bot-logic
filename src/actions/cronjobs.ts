import axios from "axios";
import { random } from "../common";
import { QuoteData } from "../types";

const TYPES = [
  "inspirational",
  "success",
  "humor",
  "movies",
  "life",
  "learning",
  "leadership",
  "knowledge",
  "intelligence",
  "computers",
  "attitude",
  "business",
  "communication",
  "cool",
  "courage",
  "education",
  "friendship",
];

export const getQuotes = async (): Promise<QuoteData> => {
  const res = await axios.get(`https://api.api-ninjas.com/v1/quotes?category=${TYPES[random(TYPES.length)]}`, {headers: { "X-Api-Key": process.env.QUOTES_API_KEY }})

  return {
    text: res.data[0].quote,
    author: res.data[0].author,
    category: res.data[0].category
  }
};
