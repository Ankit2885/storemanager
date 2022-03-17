import './App.css';
import Navbar from './component/Navbar';
import DetailsForm from './component/DetailsForm';
import Liquiditem from './component/Liquiditem';
import Soliditem from './component/Soliditem';
import Billpage from './component/Billpage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <DetailsForm />
          </Route>
          <Route exact path="/liquiditem">
            <Liquiditem />
          </Route>
          <Route exact path="/soliditem">
            <Soliditem />
          </Route>
          <Route exact path="/billpage">
        <Billpage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;