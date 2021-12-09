import axios from "axios";

export interface DataList {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: string | null;
  };
  results: DataItem[];
}
export interface DataItem {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

// TODO: Error handling

export const fetchList = async (page = 1) => {
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  return data as DataList;
};

export const fetchCharacter = async (id = 0) => {
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  return data as DataItem;
};
