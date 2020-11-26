import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash';
import { setLayout } from '../app/store/states/appState/slices/layout/layout';
import { createNewLinkTile, createNewLinkTileFilled } from '../app/Components/Capybara/helpers';
import { LayoutItem } from '../app/store/states/appState/slices/layout/types';
import { State } from '../app/store/states/types';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const layout: LayoutItem[] = cloneDeep(useSelector((state: State) => state.appState.layout));

  const impAll = () => {
    chrome.bookmarks.getChildren('1', function (result) {
      const arr = result.filter((i) => i.url);
      console.log(arr);
      const titleNew = arr[0].title;
      const urlNew = arr[0].url || arr[0].title;
      //
      const newItem = createNewLinkTileFilled(layout, titleNew, urlNew);
      const newLayout = cloneDeep(layout);
      newLayout.push(newItem);
      dispatch(setLayout(newLayout));
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
