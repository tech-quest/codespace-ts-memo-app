import { useEffect, useState } from 'react';

import { useMutateFetch } from '~/features/app/hooks/use-mutate-fetch';

type ApiResponseData = { id: string };

export const useDeleteMemoApi = (id?: string) => {
  const [success, setSuccess] = useState<boolean | null>(null);

  const { data, error, studyError, isLoading, mutate } = useMutateFetch<ApiResponseData>('delete', {
    url: id ? `/api/memos/${id}` : undefined,
  });

  useEffect(() => {
    if (!data) return;

    if (error) {
      setSuccess(false);
      return;
    }
    setSuccess(true);
  }, [data, error]);

  return { success, error, studyError, isDeleting: isLoading, deleteMemo: mutate };
};
