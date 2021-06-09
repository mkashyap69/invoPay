/* eslint-disable react-hooks/exhaustive-deps */
import AddClient from './AddClient';
import './css/App.css';
import './css/Homepage.css';
import Footer from './Footer';
import GenerateInvoice from './GenerateInvoice';
import Header from './Header';
import Home from './Home';
import Homepage from './Homepage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByCookie } from './redux/actions/userActions';
import InvoiceHistory from './InvoiceHistory';
import ClientInformation from './ClientInformation';
import InvoiceHistoryPreview from './InvoiceHistoryPreview';
import CheckoutPage from './CheckoutPage';
import Profile from './Profile';
import InvoiceView from './InvoiceView';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.data?.data);

  useEffect(() => {
    if (!window.location.pathname.startsWith('/checkout')) {
      dispatch(getUserByCookie());
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (user ? <Home /> : <Homepage />)}
          />

          <Route path="/home" render={() => (user ? <Home /> : <Homepage />)} />
          <Route
            path="/profile"
            render={() => (user ? <Profile /> : <Homepage />)}
          />
          <Route
            path="/addClient"
            render={() => (user ? <AddClient /> : <Homepage />)}
          />
          <Route
            path="/history"
            render={() => (user ? <InvoiceHistory /> : <Homepage />)}
          />

          <Route
            path="/invoice/:clientId"
            render={() => (user ? <InvoiceView /> : <Homepage />)}
          />
          <Route
            path="/invoiceHis/:invoiceId"
            render={() => (user ? <InvoiceHistoryPreview /> : <Homepage />)}
          />
          <Route
            path="/generateInvoice/:clientId"
            render={() => (user ? <GenerateInvoice /> : <Homepage />)}
          />
          <Route
            path="/client/:clientId"
            render={() => (user ? <ClientInformation /> : <Homepage />)}
          />
          <Route
            path="/checkout/:clientToken/:invoiceId"
            component={CheckoutPage}
          />

          <Route path="*" render={() => (user ? <Home /> : <Homepage />)} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
