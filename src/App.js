import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Form from './Form/Form';
// import Header from './Header/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Header></Header> */}
        <Switch>
          <Route exact path="/">
            <Form></Form>
          </Route>
          <Route path="/home">
            <Form></Form>
          </Route>
          <Route  path="*">
            <h3 className="text-center mt-5">error 404</h3>
          </Route>
        </Switch>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
