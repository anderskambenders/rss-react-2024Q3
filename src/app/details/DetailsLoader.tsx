import CardDetail from '../../components/card/CardDetail';
import Loader from '../../components/loader/Loader';
import { Suspense } from 'react';

export default async function DetailsWithLoader({ id }: { id: string }) {
  return (
    <Suspense key="details" fallback={<Loader />}>
      <CardDetail id={id} />
    </Suspense>
  );
}
