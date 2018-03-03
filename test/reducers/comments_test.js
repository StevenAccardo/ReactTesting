//This is repeatable for just about every reducer that you will create
//Whenever you test a reducer, you want to test the default case, by passing in an action that we know the reducer should not be working with. this is to test the initial state of the reducer, to ensure that the state type isn't being modified.

import { expect } from '../test_helper';
import commentReducer from '../../src/reducers/comments';
import { SAVE_COMMENT } from '../../src/actions/types';

describe('Comments Reducer', () => {
  it('handles action with unknown type', () => {
    //uses Chai JS library for instanceof
    //Invoking commentReducer() because we want the instanceof what it returns, and not commentReducer itself
    //Checks to see if the returned value is of type array
    //the one below this is better because it checking the type and ensuring it is empty, whereas this one just checks the type.
    //expect(commentReducer()).to.be.instanceof(Array);

    //checks to see if what is held in the returned array is equal to what is in the array passed to the .eql() method
    //.eql() and .equal() are different, .eql() compares what is inside of the items, .equal() compares to make sure they are exactly the same
    expect(commentReducer(undefined, {})).to.eql([]);
  });

  it('SAVE_COMMENT', () => {
    //When testing a reducer with an action, you create a test action and pass it to the reducer, and then you test the output of the reducer, to ensure it is what you expect
    const action = { type: SAVE_COMMENT, payload: 'new comment' };
    expect(commentReducer([], action)).to.eql(['new comment']);
  });
});
