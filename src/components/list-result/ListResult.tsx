'use client';
import Card from './Card';
import { IProduct } from '../../types/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '../../context/ThemeContext';

export interface IData {
  cardsData: IProduct[];
  detailsData: IProduct | null;
  cardsCount: number;
}

const ListResult = ({ data }: { data: IProduct[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const details = searchParams.get('details');
  const theme = useTheme();

  return (
    <div
      onClick={(e) => {
        if (details) {
          e.stopPropagation();
          const params = new URLSearchParams(searchParams?.toString());
          params.delete('details');
          router.push(`?${params.toString()}`);
        }
      }}
      className="result__container"
    >
      <div className="list__container">
        <div>
          <div className={`list list-${theme}`}>
            {data.length === 0 && <p>Sorry, no items founded</p>}
            {data?.map((item: IProduct, ind: number) => (
              <div key={ind}>
                <Card product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListResult;
