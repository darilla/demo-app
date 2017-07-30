import EditFoodParent from './EditFoodParent';
import { connect } from 'react-redux';
import {selectFood, editFood} from '../../Actions';
import {convertObjectToArray} from '../../functions.js';
import R from 'ramda';

const mapStateToProps = state => {
  return {
    foods: convertObjectToArray(state.foods),
    selected : R.clone(state.foods[state.selected])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelect: food => {dispatch(selectFood(food.properties.id))},
    onSubmit: food => {dispatch(editFood(food))}
  }
}

const EditFoodContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFoodParent)

export default EditFoodContainer;