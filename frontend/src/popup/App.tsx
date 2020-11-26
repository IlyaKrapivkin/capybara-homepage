import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash';
import { setLayout } from '../app/store/states/appState/slices/layout/layout';
import { createNewLinkTile, createNewLinkTileFilled } from '../app/Components/Capybara/helpers';
import { LayoutItem } from '../app/store/states/appState/slices/layout/types';
import { State } from '../app/store/states/types';
import { nanoid } from 'nanoid';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const layout: LayoutItem[] = cloneDeep(useSelector((state: State) => state.appState.layout));

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
              x: i * 2,
              y: 0,
              w: 2,
              h: 2,
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
      console.log(layout);
      console.log(arrTiles);
      // const newLayout = cloneDeep(layout);
      // newLayout.push(newItem);
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
// function App() {
// const impAll = () => {
//   const dispatch = useDispatch();
//   const layout: LayoutItem[] = cloneDeep(useSelector((state: State) => state.appState.layout));
//   chrome.bookmarks.getChildren('1', function (result) {
//     const arr = result.filter((i) => i.url);
//     console.log(arr);
//   });
//   const newItem = createNewLinkTile(layout);
//   const newLayout = cloneDeep(layout);
//   newLayout.push(newItem);
//   dispatch(setLayout(newLayout));
// };

//   return (
//     <div className="App">
//       <div>popup html</div>
//       <button onClick={impAll}>import</button>
//     </div>
//   );
// }

// export default App;

// import { CSSTransition } from 'react-transition-group';
// import './CapybaraContextMenu.scss';
// import { CapybaraContextMenuProps } from './types';
// import { ContextMenu, MenuItem } from 'react-contextmenu';
// import { setOverlay } from '../../../store/states/ui/slices/overlay/overlay';
// import React, { useState } from 'react';
