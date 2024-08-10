import Home from './home';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return <Home searchParams={searchParams}></Home>;
}
