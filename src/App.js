import { BrowserRouter as Router } from 'react-router-dom';

import { MenuAside } from './components/MenuAside';
import { Content } from './components/Content';

import './styles/global.css'

function App() {
  return (
    <div className="App">
      <Router>
        <MenuAside />
        <Content />
      </Router>
    </div>
  );
}

export default App;
