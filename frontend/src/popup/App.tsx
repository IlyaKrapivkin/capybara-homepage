import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLayout } from '../app/store/states/appState/slices/layout/layout';
import { LayoutItem } from '../app/store/states/appState/slices/layout/types';
import { nanoid } from 'nanoid';

const App: React.FC = () => {
  const dispatch = useDispatch();
  //
  const impAll = () => {
    let arrFinal: any[] = [];
    const arrRoot: any[] = [];
    chrome.bookmarks.getTree(function (tree) {
      const root1 = tree[0];
      const root2 = root1.children;
      const root3 = root2![0];
      const root4 = root3.children;
      //
      root4!.forEach((item) => {
        if (item.children) {
          const newFolder = { title: item.title };
          arrFinal.push(newFolder);
          item.children.forEach((el) => {
            if (el.url) {
              const newBmark = {
                title: el.title,
                url: el.url,
              };
              arrFinal.push(newBmark);
            }
          });
        } else {
          const newBmark = {
            title: item.title,
            url: item.url,
          };
          arrRoot.push(newBmark);
        }
      });
      const newFolder = { title: 'root' };
      arrFinal.push(newFolder);
      arrFinal = arrFinal.concat(arrRoot);
      console.log(arrFinal);
    });
    dispatch(setLayout(arrFinal));
    chrome.tabs.reload();
  };

  return (
    <div className="App">
      <div>popup html</div>
      <button onClick={impAll}>import</button>
    </div>
  );
};

export default App;

// const impAll = () => {
//   chrome.bookmarks.getChildren('1', function (arrFolders) {
//     const arrTiles: LayoutItem[] = [];
//     // cycle for folders:
//     for (let i = 0; i < arrFolders.length - 1; i += 1) {
//       const newFolder = {
//         type: 'folder',
//         data: {
//           grid: {
//             i: nanoid(),
//             x: 0,
//             y: 0,
//             w: 20,
//             h: 1,
//             static: true,
//           },
//           content: {
//             title: arrFolders[i].title,
//             url: 'chrome://newtab',
//           },
//           styles: {
//             backgroundColor: '#ffffff00',
//             color: '#ffffff',
//           },
//         },
//       };
//       arrTiles.push(newFolder);
//       //
//       chrome.bookmarks.getChildren(arrFolders[i].id, function (arrBmarks) {
//         for (let g = 0; g < arrBmarks.length; g += 1) {
//           if (!arrBmarks[g].url) {
//             continue;
//           }
//           const newBmark = {
//             type: 'link',
//             data: {
//               grid: {
//                 i: nanoid(),
//                 x: (g * 2) % 20,
//                 y: 0,
//                 w: 2,
//                 h: 1,
//               },
//               content: {
//                 title: arrBmarks[g].title,
//                 url: arrBmarks[g].url || arrBmarks[g].title,
//               },
//               styles: {
//                 backgroundColor: '#ffffff',
//                 color: '#000000',
//               },
//             },
//           };
//           arrTiles.push(newBmark);
//         }
//       });
//     }
//     dispatch(setLayout(arrTiles));
//     chrome.tabs.reload();
//   });
// };
