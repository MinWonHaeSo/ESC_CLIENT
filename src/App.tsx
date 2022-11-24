import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
