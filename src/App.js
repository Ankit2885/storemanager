import './App.css';
import Navbar from './component/Navbar';
import DetailsForm from './component/DetailsForm';
import Liquiditem from './component/Liquiditem';
import Soliditem from './component/Soliditem';
import Billpage from './component/Billpage';
import { useState, createContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const Acontext = createContext();

function App() {
  

  const [liquidItem, setLiquidItem] = useState({ ItemName: "", Quantity: "", Cost: "", Date: ""});
  
  return (
    <>
      <Acontext.Provider value={liquidItem}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <DetailsForm />
            </Route>
            <Route exact path="/liquiditem">
              <Liquiditem liquidItem={liquidItem} setLiquidItem={setLiquidItem} />
            </Route>
            <Route exact path="/soliditem">
              <Soliditem />
            </Route>
            <Route exact path="/billpage">
              <Billpage />
            </Route>
          </Switch>
        </Router>
      </Acontext.Provider>
    </>
  );
}

export default App;
export { Acontext };
