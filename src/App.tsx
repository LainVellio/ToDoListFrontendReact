import { BrowserRouter, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { MainPage } from './components/MainPage/MainPage';
import { ArchivePage } from './ArchivePage/ArchivePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={MainPage} />
      <Route exact path="/archive" component={ArchivePage} />
    </BrowserRouter>
  );
};

export default App;
