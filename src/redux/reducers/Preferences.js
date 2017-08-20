import * as actions from '../../Actions';

const initialState = {
    kcal: 0,
    meals: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.SAVE_PREFERENCES:
        console.log(action.content);
            return Object.assign({}, action.content);
        default:
            return state;
    }
}