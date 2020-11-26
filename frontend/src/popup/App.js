// import React from 'react';
import React, { useState } from 'react';
import { cloneDeep } from 'lodash';
import { CSSTransition } from 'react-transition-group';

import './CapybaraContextMenu.scss';
import { CapybaraContextMenuProps } from './types';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { setOverlay } from '../../../store/states/ui/slices/overlay/overlay';
import { setLayout } from '../../../store/states/appState/slices/layout/layout';
import { createNewLinkTile } from '../../Capybara/helpers';

const impAll = () => {
  // const newItem = createNewLinkTile(layout);
  // const newLayout = cloneDeep(layout);
  // newLayout.push(newItem);
  // dispatch(setLayout(newLayout));

  chrome.bookmarks.getChildren('1', function (result) {
    let arr = result.filter((i) => !i.url);
    console.log(arr);
  });
};

function App() {
  return (
    <div className="App">
      <div>popup html</div>
      <button onClick={imAll}>import</button>
    </div>
  );
}

export default App;
