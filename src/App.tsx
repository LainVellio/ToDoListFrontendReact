import { BrowserRouter, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { MainPage } from './components/MainPage/MainPage';
import { ArchivePage } from './ArchivePage/ArchivePage';
import Provider from './Context';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider>
        <Header />
        <Route exact path="/" component={MainPage} />
        <Route exact path="/archive" component={ArchivePage} />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
