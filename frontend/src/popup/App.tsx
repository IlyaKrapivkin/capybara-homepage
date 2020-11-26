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
      for (let i = 0; i < arr.length; i += 10) {
        for (let j = 0; j < 10; j += 1) {
          if (!arr[i + j]) {
            break;
          }
          const newTile = {
            type: 'link',
            data: {
              grid: {
                i: nanoid(),
                x: j * 2,
                y: Math.floor(i / 5) * 2,
                w: 2,
                h: 2,
              },
              content: {
                title: arr[i + j].title,
                url: arr[i + j].url || arr[i + j].title,
              },
              styles: {
                backgroundColor: '#ffffff',
                color: '#000000',
              },
            },
          };
          arrTiles.push(newTile);
        }
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
