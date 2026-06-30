import { useCallback, useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

interface UseUrlFiltersOptions<T extends Record<string, unknown>> {
  initialFilters: T;
  constantFilters?: Partial<T>;
  sortParams?: readonly (keyof T)[];
  updateMethod?: 'push' | 'replace';
  updateAllowed?: boolean;
}

const useUrlFilters = <T extends Record<string, unknown>>({
  initialFilters,
  constantFilters = {},
  sortParams = [],
  updateMethod = 'push',
  updateAllowed = true,
}: UseUrlFiltersOptions<T>) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [shouldUpdateUrl, setShouldUpdateUrl] = useState(false);
  const [filters, setFilters] = useState<T>(() => {
    const urlFilters = Object.fromEntries(searchParams.entries()) as Partial<T>;
    return { ...initialFilters, ...urlFilters } as T;
  });

  const handleFilterChange = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        Object.entries(constantFilters).forEach(([constKey, constValue]) => {
          if (constKey !== key) {
            (newFilters as Record<string, unknown>)[constKey] = constValue;
          }
        });

        return newFilters;
      });

      setShouldUpdateUrl(true);
    },
    [constantFilters]
  );

  const filtersRef = useRef<T>(filters);
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    if (!updateAllowed || !shouldUpdateUrl) return;

    const params = new URLSearchParams();

    const addParameter = (key: keyof T) => {
      const value = filtersRef.current[key];
      if (value !== null && value !== '' && value !== undefined) {
        params.append(key.toString(), value.toString());
      }
    };

    sortParams.forEach(addParameter);

    (Object.keys(filtersRef.current) as Array<keyof T>).forEach((key) => {
      if (!sortParams.includes(key)) {
        addParameter(key);
      }
    });

    if (updateMethod === 'replace') {
      navigate(`?${params.toString()}`, { replace: true });
    } else {
      navigate(`?${params.toString()}`);
    }

    setShouldUpdateUrl(false);
  }, [updateAllowed, shouldUpdateUrl, sortParams, updateMethod, navigate]);

  return {
    filters,
    handleFilterChange,
    setFilters,
  };
};

export default useUrlFilters;
