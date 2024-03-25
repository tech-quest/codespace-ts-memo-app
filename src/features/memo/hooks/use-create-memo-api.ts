import { useEffect, useState } from 'react';

import { useMutateFetch } from '~/features/app/hooks/use-mutate-fetch';

type ApiResponseData = { id: string };

export const useCreateMemoApi = () => {
  const [success, setSuccess] = useState<boolean | null>(null);

  const { data, error, studyError, isLoading, mutate } = useMutateFetch<ApiResponseData>('post', {
    url: '/api/memos',
  });

  useEffect(() => {
    if (!data) return;

    if (error) {
      setSuccess(false);
      return;
    }
    setSuccess(true);
  }, [data, error]);

  return { success, error, studyError, isCreating: isLoading, createMemo: mutate };
};
