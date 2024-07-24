import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectedItemsSlice } from '../../store/reducers/selectedItems.slice';
import './flyout.css';
import { useRef } from 'react';

const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(
    (state) => state.selectedItems.selectedItems
  );
  const isVisible = selectedItems.length > 0;
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  if (!isVisible) return null;

  const handleUnselectAll = () => {
    dispatch(selectedItemsSlice.actions.clearSelectedItems());
  };

  const handleDownload = () => {
    if (downloadLinkRef.current) {
      const csvContent =
        'data:text/csv;charset=utf-8,' +
        selectedItems
          .map((e) => `${e.title},${e.category},${e.description},${e.price}`)
          .join('\n');
      const encodedUri = encodeURI(csvContent);
      downloadLinkRef.current.setAttribute('href', encodedUri);
      downloadLinkRef.current.setAttribute(
        'download',
        `${selectedItems.length}_items.csv`
      );
      downloadLinkRef.current.click();
    }
  };

  return (
    <div className="flyout">
      <p className="flyout__desc">{selectedItems.length} items are selected</p>
      <button className="flyout__button" onClick={handleUnselectAll}>
        Unselect all
      </button>
      <a ref={downloadLinkRef} style={{ display: 'none' }}>
        Download
      </a>
      <button className="flyout__button" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default Flyout;
