//helps us create a fake html document that we will assign to a global variable
import jsdom from 'jsdom';
//We import jquery instead of the standard $ because if we didn't, jquery would try and hook itself into the browser, which it doesn't have access to in this case, so we are going to ahck it, and point it to our made up browser variables.
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

//Set up testing environment to run like a browser in the command line
//global is Node.js's version of window. Here we are creating a tiny html document and attaching that to the global variable.
//this will allow libraries like JQuery to run since they assume they are always running in the browser. We are kind of faking them out in this manner.
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
//tells jquery to jsut hookup to this fake DOM, and not try and reachout to the actual browser DOM
const $ = jquery(global.window);

//Need to build ‘renderComponent’ helper that should render a given react class
//takes a react component class, renders it, get its html, wraps that with a jquery element, and then returns the jquery element.

function renderComponent(ComponentClass, props, state) {
  //creates an instance of the class that we created in our code and gets it ready to render into our document
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      {/* passing the props along with the spread operator, allows them to be top-level props. So you won't have to access them with an additional key, such as this.props.props.... */}
      <ComponentClass {...props} />
    </Provider>
  );

  //This is what allows us to get access to the html for the instance of our component that we passed into the function.
  return $(ReactDOM.findDOMNode(componentInstance));
}

//Build helper for simulating events
//to add a function to jquery, you use the below code, $.fn.newFunctionName
//this allows you to call the function at any time in the JQuery scope
$.fn.simulate = function(eventName, value) {
  //checks to see if a vlaue was passed in, if so, then it assigns the value to the DOM element
  if (value) {
    this.val(value);
  }

  //"this" is the reference to whatever the .simulate function is chained onto. It is our handle for grabbing/gaining access to the DOM element within the JQuery selector
  //Use the TestUtils's simulate method, and then passes in the eventName arg as the event.
  //this with an array index of 0 is used to grab the first instance of the selected item.
  TestUtils.Simulate[eventName](this[0]);
};
//Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };
