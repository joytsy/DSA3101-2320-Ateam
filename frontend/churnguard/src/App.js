//import logo from './churnguard logo.png';
//import Login from './Login';
import './App.css';
import MyForm from './interactive';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*}
        <h1>Welcome to Churnguard!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <Login /> */}
        
        <MyForm/>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default App;
