import useSWR from "swr";
import mockBooks from "../mocks/books";

const fetcher = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(mockBooks), 450);
  });

export default function useBooks() {
  const { data, error } = useSWR("books", fetcher);
  return {
    books: data || null,
    isLoading: !error && !data,
    error,
  };
}
