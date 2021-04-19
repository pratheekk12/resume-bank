import './App.css';
import {useDispatch} from 'react-redux'
import {login} from './Redux/actions/logActions'
import createRoutes from './routes/routes';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const routes = createRoutes();
  const dispatch = useDispatch()

  if(localStorage.getItem('token')){
    dispatch(login())
  }
  


  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
