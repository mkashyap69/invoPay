import { combineReducers } from 'redux';
import { footerStateReducer } from './footerStateReducer';
import { userReducer } from './userReducer';
import {
  addClientReducer,
  allClientReducer,
  getClientByIdReducer,
  updateClientReducer,
} from './clientReducer';
import {
  addInvoiceReducer,
  getAllInvoiceReducer,
  getInvoiceReducer,
  sendInvoiceReducer,
  getInvoiceByClientReducer,
} from './invoiceReducer';

const rootReducer = combineReducers({
  user: userReducer,
  footerState: footerStateReducer,
  allClients: allClientReducer,
  addClient: addClientReducer,
  updateClient: updateClientReducer,
  getClient: getClientByIdReducer,
  addInvoice: addInvoiceReducer,
  sendInvoice: sendInvoiceReducer,
  allInvoice: getAllInvoiceReducer,
  invoiceById: getInvoiceReducer,
  clientInvoices: getInvoiceByClientReducer,
});

export default rootReducer;
