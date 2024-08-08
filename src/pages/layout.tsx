import Flyout from '../components/flyout/Flyout';
import ListResult, { IData } from '../components/list-result/ListResult';
import Search from '../components/search/Search';
import ThemeToggleButton from '../components/theme-toggler/ThemeToggler';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ data }: { data: IData }) => {
  const { theme } = useTheme();
  return (
    <div className={`app app-${theme}`}>
      <div style={{ colorScheme: `${theme}`, position: 'relative' }}>
        <ThemeToggleButton />
        <Search />
        <Flyout />
        <div>
          <ListResult data={data} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
