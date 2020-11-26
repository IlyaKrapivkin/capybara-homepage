import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash';

import { State } from '../../../../store/states/types';
import { EditData } from '../../../../store/states/ui/slices/overlay/types';
import { getTileFormLayout } from './helpers';
import { EditTileInputsData, EditStyleInputName, EditContentInputName } from './types';
import { setLayoutItemData, deleteLayoutItemById } from '../../../../store/states/appState/slices/layout/layout';
import { unsetOverlay } from '../../../../store/states/ui/slices/overlay/overlay';
import CapybaraLink from '../../../Capybara/CapybaraTile/CapybaraLink/CapybaraLink';
import './EditTileForm.scss';
import { setTimeout } from 'timers';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const addBmark = () => {
  chrome.bookmarks.create({
    title: 'ffff',
    url: 'https://sch1231.mskobr.ru/#/',
  });
};

const EditTileForm: React.FC<EditData> = ({ id, type }) => {
  const dispatch = useDispatch();

  const [tileDataState] = useState(
    cloneDeep(useSelector((state: State) => state.appState.layout.find((el) => el.data.grid.i === id))),
  );

  if (!tileDataState) {
    throw new Error('No tile found under provided ID');
  }

  const [inputsData, setInputsData] = useState<EditTileInputsData>({
    id,
    content: tileDataState.data.content,
    styles: tileDataState.data.styles,
  });

  // Clearly not DRY, but I'm not sure how to let typescript make me dry these funcs out
  const onContentInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputsData((prevState) => {
      const name = evt.target.name as EditContentInputName;
      const value = evt.target.value;
      const newState = cloneDeep(prevState);

      newState.content[name] = value;

      return newState;
    });
  };

  const onStylesInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputsData((prevState) => {
      const name = evt.target.name as EditStyleInputName;
      const value = evt.target.value;
      const newState = cloneDeep(prevState);

      newState.styles[name] = value;

      return newState;
    });
  };

  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(setLayoutItemData(inputsData));
    dispatch(unsetOverlay());

    addBmark();
  };

  const [to, setTo] = useState(inputsData.content.url);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTo(inputsData.content.url);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [inputsData.content.url]);

  return (
    <form className="overlay__overlay-form overlay-form" onSubmit={onSubmit} onClick={(evt) => evt.stopPropagation()}>
      <div className="overlay-form__tile-preview">
        <CapybaraLink dimensions={{ width: 2, height: 2, rowHeight: 130 }} styles={inputsData.styles} to={to}>
          {inputsData.content.title}
        </CapybaraLink>
      </div>
      <div className="overlay-form__edit">
        <input type="hidden" value={id} />
        {/* Conditional set of form inputs goes here */}
        <fieldset className="overlay-form__fieldset">
          {getTileFormLayout(type, inputsData, onContentInputChange)}
        </fieldset>
        {/* Conditional set of form inputs ends here */}
        <fieldset className="overlay-form__fieldset overlay-form__fieldset--grid-horizontal">
          <div className="overlay-form__group">
            <label className="overlay-form__label" htmlFor="overlay-edit-backgroundColor">
              Background color:
            </label>
            <div
              className="overlay-form__color-display"
              style={{
                backgroundColor: inputsData.styles.backgroundColor,
                boxShadow: `0 0 10px 0 ${inputsData.styles.backgroundColor}`,
              }}
            >
              <input
                className="overlay-form__input overlay-form__input--color"
                name="backgroundColor"
                type="color"
                id="overlay-edit-backgroundColor"
                value={inputsData.styles.backgroundColor || ''}
                onChange={onStylesInputChange}
              />
            </div>
          </div>
          <div className="overlay-form__group">
            <label className="overlay-form__label" htmlFor="overlay-edit-color">
              Font color:
            </label>
            <div
              className="overlay-form__color-display"
              style={{
                backgroundColor: inputsData.styles.color,
                boxShadow: `0 0 10px 0 ${inputsData.styles.color}`,
              }}
            >
              <input
                className="overlay-form__input overlay-form__input--color"
                name="color"
                type="color"
                id="overlay-edit-color"
                value={inputsData.styles.color || ''}
                onChange={onStylesInputChange}
              />
            </div>
          </div>
        </fieldset>
        <div className="overlay-form__group">
          <button className="overlay__submit" type="submit">
            Save
          </button>
          <button
            className="overlay__submit"
            type="button"
            onClick={() => {
              dispatch(deleteLayoutItemById(id));
              dispatch(unsetOverlay());
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditTileForm;
