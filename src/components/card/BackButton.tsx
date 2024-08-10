'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const details = searchParams.get('details');
  return (
    <button
      className={'back__button'}
      onClick={(e) => {
        e.stopPropagation();
        if (details) {
          e.stopPropagation();
          const params = new URLSearchParams(searchParams?.toString());
          params.delete('details');
          router.push(`?${params.toString()}`);
        }
      }}
    >
      Back
    </button>
  );
};

export default BackButton;
