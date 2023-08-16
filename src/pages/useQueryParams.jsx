import { useSearchParams } from "react-router-dom";

export function useQueryParams() {
  const [searchParams] = useSearchParams();

  const searchParamsObj = Object.fromEntries([...searchParams])

  return searchParamsObj;
}