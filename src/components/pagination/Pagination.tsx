'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  itemsCount: number;
};

const getPaginationNumbers = (currentPage: number, maxPages: number) => {
  const pageNumbers: number[] = [];
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > maxPages) rightSide = maxPages;
  for (let number = leftSide; number <= rightSide; number++) {
    pageNumbers.push(number);
  }
  return pageNumbers;
};

const Pagination = (props: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = +searchParams.get('page') || 1;
  const details = searchParams.get('details');
  const query = searchParams.get('query');
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(page);
  const maxPages = Math.ceil(props.itemsCount / itemsPerPage);
  const pageNumbers = getPaginationNumbers(currentPage, maxPages);

  useEffect(() => {
    console.log(`page: ${page}`);
    if (page !== 1) {
      setCurrentPage(+page as unknown as number);
    }
  }, [searchParams]);

  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
      const newQuery = new URLSearchParams({
        page: (currentPage + 1).toString(),
        query: query,
        ...(details && { details }),
      }).toString();
      router.push(`?${newQuery}`);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      const newQuery = new URLSearchParams({
        page: (currentPage - 1).toString(),
        query: query,
        ...(details && { details }),
      }).toString();
      router.push(`?${newQuery}`);
    }
  };

  return (
    <>
      <div className="pagination-container">
        <div className="paginate-ctn">
          <div className="round-effect" onClick={prevPage}>
            {' '}
            &lt;{' '}
          </div>
          {pageNumbers.map((pageNumber) => {
            return (
              <div
                key={pageNumber}
                className={
                  pageNumber === currentPage
                    ? 'round-effect active'
                    : 'round-effect'
                }
                onClick={() => {
                  setCurrentPage(pageNumber);
                  const newQuery = new URLSearchParams({
                    page: pageNumber.toString(),
                    query: query,
                    ...(details && { details }),
                  }).toString();
                  router.push(`?${newQuery}`);
                }}
              >
                {pageNumber}
              </div>
            );
          })}
          <div className="round-effect" onClick={nextPage}>
            {' '}
            &gt;{' '}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
