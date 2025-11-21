'use client';

import { useEffect, useState } from 'react';
import { fetchStatus, type StatusResult } from '@/lib/status';

type StatusState = {
  data: StatusResult | null;
  loading: boolean;
  error: string | null;
};

const initialState: StatusState = {
  data: null,
  loading: true,
  error: null
};

export function useStatusData() {
  const [state, setState] = useState<StatusState>(initialState);

  useEffect(() => {
    let active = true;

    async function load() {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        const result = await fetchStatus();
        if (!active) return;

        if (result.source === 'error') {
          setState({ data: null, loading: false, error: result.message ?? 'Unable to fetch status' });
          return;
        }

        setState({ data: result, loading: false, error: null });
      } catch (error) {
        if (!active) return;
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Unable to fetch status'
        });
      }
    }

    load();
    const interval = setInterval(load, 20000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return state;
}
