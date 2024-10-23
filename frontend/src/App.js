import { createBrowserRouter } from "react-router-dom"
import CreateUser from "./Components/CreateUser"
import AddExpense from "./Components/AddExpense";
import GetUserExpenses from "./Components/GetUserExpenses";
import DownloadBalanceSheet from "./Components/DownloadBalanceSheet";
import Login from "./Components/Login";


const App = createBrowserRouter([

  {
    path: '/',
    element: < CreateUser />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/addExpense',
    element: <AddExpense />
  },
  {
    path: '/getExpense',
    element: < GetUserExpenses />
  },
  {
    path: '/downloadSheet',
    element: <DownloadBalanceSheet />
  }

])

export default App;
