import { Switch, Route } from 'react-router-dom'
import Auth from './views/Auth'
import DogList from './components/dogs/DogList'
import DogDetails from './components/dogs/DogDetails'
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/auth/:auth'>
          <Auth />
        </Route>
        <Route exact path='/api/dogs'>
          <DogList />
        </Route>
        <Route path='/api/dogs/:dogId'>
          <DogDetails />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
