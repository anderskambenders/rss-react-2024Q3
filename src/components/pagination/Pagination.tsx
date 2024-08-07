import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { query } = router;
  const page = +(query?.page || 1);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(page);
  const maxPages = Math.ceil(props.itemsCount / itemsPerPage);
  const pageNumbers = getPaginationNumbers(currentPage, maxPages);

  useEffect(() => {
    if (query.page) {
      setCurrentPage(+query?.page as unknown as number);
    }
  }, [router]);

  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
      delete query.details;
      router.push({ query: { ...query, page: `${currentPage + 1}` } });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      delete query.details;
      router.push({ query: { ...query, page: `${currentPage - 1}` } });
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
                  delete query.details;
                  router.push({ query: { ...query, page: `${pageNumber}` } });
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

// import { useEffect, useState } from 'react';
// import './pagination.css';
// import { LIMIT } from '../list-result/ListResult';
// import { useRouter } from 'next/router';

// type PaginationProps = {
//   itemsCount: number;
// };

// export const getPaginationNumbers = (currentPage: number, maxPages: number) => {
//   const pageNumbers: number[] = [];
//   let leftSide = currentPage - 2;
//   if (leftSide <= 0) leftSide = 1;
//   let rightSide = currentPage + 2;
//   if (rightSide > maxPages) rightSide = maxPages;
//   for (let number = leftSide; number <= rightSide; number++) {
//     pageNumbers.push(number);
//   }
//   return pageNumbers;
// };

// const Pagination = (props: PaginationProps) => {
//   const router = useRouter();
//   const { query } = router;
//   const page = +(query?.page || 1);
//   const [currentPage, setCurrentPage] = useState(+page);
//   const maxPages = Math.ceil(props.itemsCount / LIMIT);
//   const items = [];
//   let leftSide = currentPage - 2;
//   if (leftSide <= 0) leftSide = 1;
//   let rightSide = currentPage + 2;
//   if (rightSide > maxPages) rightSide = maxPages;
//   for (let number = leftSide; number <= rightSide; number++) {
//     items.push(
//       <div
//         key={number}
//         className={
//           number === currentPage ? 'round-effect active' : 'round-effect'
//         }
//         onClick={() => {
//           if (pathname === '/') {
//             setCurrentPage(number);
//             setSearch({ ...params, page: number.toString() });
//           }
//         }}
//       >
//         {number}
//       </div>
//     );
//   }

//   useEffect(() => {
//     if (query.page) {
//       setCurrentPage(+query?.page as unknown as number);
//     }
//   }, [router]);

//   const nextPage = () => {
//     if (currentPage < maxPages) {
//       setCurrentPage(currentPage + 1);
//       delete query.details;
//       router.push({ query: { ...query, page: `${currentPage + 1}` } });
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//       delete query.details;
//       router.push({ query: { ...query, page: `${currentPage - 1}` } });
//     }
//   };

//   return (
//     <>
//       <div className="pagination-container">
//         <div className="paginate-ctn">
//           <div className="round-effect" onClick={prevPage}>
//             {' '}
//             &lt;{' '}
//           </div>
//           {items}
//           <div className="round-effect" onClick={nextPage}>
//             {' '}
//             &gt;{' '}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Pagination;
