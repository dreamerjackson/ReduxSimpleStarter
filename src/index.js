import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter,Route} from 'react-router-dom';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);


class Hello extends React.Component{
  render(){return <div>Hello!</div>}
}

class goodbye extends React.Component{
  render(){return <div>goodbye!</div>}
}


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    <div>
        header!
        <Route path="/hello" component={Hello}/>
        <Route path="/goodbye" component={goodbye}/>
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
