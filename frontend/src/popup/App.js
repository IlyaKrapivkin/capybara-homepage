import React from 'react';
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { State } from './app/store/states/types';
// import { authorise } from './app/store/states/domainData/slices/auth/auth';
// import Capybara from './app/Components/Capybara/Capybara';
// import Overlay from './app/Components/Overlay/Overlay';
// import { Overlay as OverlayState } from './app/store/states/ui/slices/overlay/types';
// import './App.scss';

const addBmark = () => {
  chrome.bookmarks.create({
    title: 'ffff',
    url: 'https://sch1231.mskobr.ru/#/',
  });
};

const delBmark = () => {
  chrome.bookmarks.search({ title: 'ffff' }, function (result) {
    chrome.bookmarks.remove(result[0].id);
  });
};

const findBmark = () => {
  chrome.bookmarks.search({ title: 'ffff' }, function (result) {
    console.log(result);
  });
};
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function App() {
  return (
    <div className="App">
      <div>priviet popup!</div>
      <button onClick={addBmark}>+</button>
      <button onClick={delBmark}>-</button>
      <button onClick={findBmark}>?</button>
    </div>
  );
}

export default App;
