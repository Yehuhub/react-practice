import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

type Method = "get" | "post" | "put" | "delete" | "patch";

interface UseApiProps<TRequset = unknown> {
  url: string;
  method?: Method;
  body?: TRequset;
  headers?: AxiosRequestConfig["headers"];
  manual?: boolean; // if true, don't auto-trigger
}

export function useApi<TResponse = unknown>({
  url,
  method = "get",
  body = null,
  headers = {},
  manual = false,
}: UseApiProps) {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<TResponse> = await axios({
        url,
        method,
        data: method === "get" ? undefined : body,
        headers,
      });
      setData(response.data);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, headers]);

  useEffect(() => {
    if (!manual) {
      fetchData();
    }
  }, [fetchData, manual]);

  return { data, loading, error, refetch: fetchData };
}
