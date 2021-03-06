import reducer from '../../../redux/reducers/Foods';
import * as actions from '../../../Actions';
import { createStore } from 'redux';

let initialState;
let store;

beforeEach(() => {
  initialState = {
    foods: {},
    foodsBeingAddedToNewMeal: [],
    meals: [],
    preferences: { kcal: 0, meals: [] }
  };
  store = createStore(reducer, initialState);
});

it('does not change the state if the action type is unknown', () => {
  let action = { type: 'UNKNOWN', content: { anything: 'anything' } };
  store.dispatch(action);
  let newState = store.getState();

  expect(newState).toEqual(initialState);
});

it('handles ASYNC_REQUEST_STATUS', () => {
  let action = actions.asyncRequestStatus('HIDE_NOTIFICATION');
  let newState = reducer(initialState, action);

  expect(newState).not.toEqual(initialState);
  expect(newState.asyncRequestStatus).toEqual('HIDE_NOTIFICATION');
});

it('handles NEW_FOOD', () => {
  let action = actions.newFood({
    101: {
      name: 'honey',
      fat: '0',
      protein: '0',
      carbs: '40',
      id: 101
    }
  });

  let newState = reducer(initialState, action);

  let keysInFoods = Object.keys(newState.foods);
  let newNumberOfFoods = keysInFoods.length;

  expect(newState).not.toEqual(initialState);
  expect(newNumberOfFoods).toEqual(1);
  expect(newState.foods[keysInFoods[0]].name).toEqual('honey');
});

it('handle EDIT_FOOD', () => {
  initialState = {
    ...initialState,
    foods: {
      100888247: {
        name: 'jajko',
        carbs: '1',
        fat: '9',
        id: 100888247,
        protein: '12'
      }
    }
  };

  let action = actions.editFood({
    name: 'jajko',
    carbs: '0',
    fat: '9',
    id: 100888247,
    protein: '12'
  });
  let newState = reducer(initialState, action);

  expect(newState.length).toEqual(initialState.length);
  expect(newState.foods[100888247].carbs).not.toEqual(1);
  expect(newState.foods[100888247].carbs).toEqual('0');
});

it('handle IS_LOADING', () => {
  initialState = { ...initialState, isLoading: false };
  let action = actions.isLoading(true);
  let newState = reducer(initialState, action);

  expect(newState).not.toEqual(initialState);
  expect(newState.isLoading).toEqual(true);
});

// xit('TEMPLATE', () => {
//   let action = {};

//   let newState = reducer(initialState, action);
//   expect(newState).not.toEqual(initialState);
// });
