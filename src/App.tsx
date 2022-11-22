import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Counter from './components/Counter';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Counter />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
