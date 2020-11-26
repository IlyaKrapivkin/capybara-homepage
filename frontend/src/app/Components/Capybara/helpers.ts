import { LayoutItem } from '../../store/states/appState/slices/layout/types';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';

export const preventDefault = (evt: Event): void => {
  evt.preventDefault();
  evt.target?.removeEventListener('click', preventDefault);
};

export const mouseMoveListener = (evt: Event): void => {
  evt.target?.addEventListener('click', preventDefault);
  evt.target?.removeEventListener('mousemove', mouseMoveListener);
};

export const getNewTileGridData = (layout: LayoutItem[]) => {
  const layoutSafeCopy = cloneDeep(layout);
  layoutSafeCopy.sort((el1, el2) => {
    if (el1.data.grid.y === el2.data.grid.y) {
      return el1.data.grid.x - el2.data.grid.x;
    } else {
      return el1.data.grid.y - el2.data.grid.y;
    }
  });
  return {
    x: 1000000,
    y: 1000000,
    w: 2,
    h: 2,
  };
};

export const createNewLinkTile = (layout: LayoutItem[]) => {
  const newTile = {
    type: 'link',
    data: {
      grid: { ...getNewTileGridData(layout), i: nanoid() },
      content: { title: '', url: '' },
      styles: { backgroundColor: '#ffffff', color: '#000000' },
    },
  };
  return newTile;
};

export const createNewLinkTileFilled = (layout: LayoutItem[], titleNew: string, urlNew: string) => {
  const newTile = {
    type: 'link',
    data: {
      grid: { ...getNewTileGridData(layout), i: nanoid() },
      content: { title: titleNew, url: urlNew },
      styles: { backgroundColor: '#ffffff', color: '#000000' },
    },
  };
  return newTile;
};
