import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLayout } from '../app/store/states/appState/slices/layout/layout';
import { LayoutItem } from '../app/store/states/appState/slices/layout/types';
import { nanoid } from 'nanoid';

const App: React.FC = () => {
  const dispatch = useDispatch();
  //
  const impAll = () => {
    const arrFinal: any[] = [];
    const arrRoot: any[] = [];
    chrome.bookmarks.getTree(function (tree) {
      const root1 = tree[0];
      const root2 = root1.children;
      const root3 = root2![0];
      const root4 = root3.children;
      // let count = 1;
      let yCor = 0;
      //
      root4!.forEach((item, ind, arr) => {
        if (item.children) {
          // count = Math.ceil(item.children.length / 20);
          if (arr[ind - 1] && arr[ind - 1].children) {
            const former = arr[ind - 1].children;
            yCor = yCor + Math.ceil(former!.length / 20);
          }
          const newFolder = {
            type: 'folder',
            data: {
              grid: {
                i: nanoid(),
                x: 0,
                y: yCor,
                w: 20,
                h: 1,
              },
              content: {
                title: item.title,
                url: 'chrome://newtab',
              },
              styles: {
                backgroundColor: '#ffffff00',
                color: '#ffffff',
              },
            },
          };
          arrFinal.push(newFolder);
          //
          item.children.forEach((el, index) => {
            if (el.url) {
              const newBmark = {
                type: 'link',
                data: {
                  grid: {
                    i: nanoid(),
                    x: (index * 2) % 20,
                    y: yCor + 1,
                    w: 2,
                    h: 1,
                  },
                  content: {
                    title: el.title,
                    url: el.url || el.title,
                  },
                  styles: {
                    backgroundColor: '#ffffff',
                    color: '#000000',
                  },
                },
              };
              arrFinal.push(newBmark);
            }
          });
        }
      });
      dispatch(setLayout(arrFinal));
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
