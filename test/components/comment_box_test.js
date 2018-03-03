//test spect for the comment_box components
//the file is garbage collected after each time the it method is ran
//Standard way to test a component

//test helpers were user created, and are not imported by a library
import { renderComponent, expect } from '../test_helper';
import CommentBox from '../../src/components/comment_box';

describe('CommentBox', () => {
  //declare component outside of beforeEach() and it() methods, so that it will be in scope for all of them.
  let component;

  //executes function before each it() method.
  beforeEach(() => {
    component = renderComponent(CommentBox);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('comment-box');
  });

  it('has a text area', () => {
    expect(component.find('textarea')).to.exist;
  });

  it('has a button', () => {
    expect(component.find('button')).to.exist;
  });

  describe('entering some text', () => {
    //this before each gets stacked on top of the one before this
    beforeEach(() => {
      //places dummy comment in the text area for testing purposes
      //simulate is making a change event that enters 'new comment'
      //Whenever you set up a simulation,  you need to make sure the triggers and handlers are setup properly, or the spec will fail.
      component.find('textarea').simulate('change', 'new comment');
    });

    it('shows text that is entered', () => {
      expect(component.find('textarea')).to.have.value('new comment');
    });

    it('when submitted, clears the input', () => {
      //simulates a form submital, only works with form tags, not div
      component.simulate('submit');
      expect(component.find('textarea')).to.have.value('');
    });
  });
});
