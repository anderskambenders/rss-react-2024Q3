import '../index.css';
import '../app.css';
import './not-found.css';
import '../components/card/card-detail.css';
import '../components/flyout/flyout.css';
import '../components/list-result/card.css';
import '../components/list-result/list-result.css';
import '../components/loader/loader.css';
import '../components/pagination/pagination.css';
import '../components/search/search.css';
import '../components/theme-toggler/theme-toggler.css';
import StoreProvider from './StoreProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
