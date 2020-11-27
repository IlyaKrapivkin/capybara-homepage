import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLayout } from '../app/store/states/appState/slices/layout/layout';
import { LayoutItem } from '../app/store/states/appState/slices/layout/types';
import { nanoid } from 'nanoid';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const impAll = () => {
    chrome.bookmarks.getChildren('1', function (result) {
      const arr = result.filter((i) => i.url);
      const arrTiles: LayoutItem[] = [];
      for (let i = 0; i < arr.length; i += 1) {
        const newTile = {
          type: 'link',
          data: {
            grid: {
              i: nanoid(),
              x: (i * 2) % 20,
              y: 0,
              w: 2,
              h: 1,
            },
            content: {
              title: arr[i].title,
              url: arr[i].url || arr[i].title,
            },
            styles: {
              backgroundColor: '#ffffff',
              color: '#000000',
            },
          },
        };
        arrTiles.push(newTile);
      }
      dispatch(setLayout(arrTiles));
      chrome.tabs.reload();
    });
  };

  return (
    <div className="App">
      <div>popup html</div>
      <button onClick={impAll}>import</button>
    </div>
  );
};

export default App;
