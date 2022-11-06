import axios from "axios";
import { getItem, setItem } from "../utils/storage";
import { getDate, getTime } from "../utils/time";
const BASE_URL = "https://pokeapi.co/api/v2";

const getListPokemon = async () => {
  let dataFromStorage = getItem("list");
  if (dataFromStorage) {
    return dataFromStorage;
  } else {
    try {
      const res: any = await axios.get(
        `${BASE_URL}/pokemon?limit=100000&offset=0`
      );
      const formattedData = res?.data?.results.map((e: object) => ({
        ...e,
        current_stock: "0",
        history_update: [
          {
            date: getDate(),
            time: getTime(),
            status: "Stok awal",
            note: "",
            current_stock: "0",
            added_stock: "0",
          },
        ],
      }));
      setItem("list", formattedData);
      return formattedData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};

const getDetailPokemon = (payload: string) => {
  let dataFromStorage = getItem("list");
  if (dataFromStorage) {
    let findData = dataFromStorage.find((e: any) => e.name === payload);
    return findData;
  }
  return null;
};

export { getListPokemon, getDetailPokemon };
