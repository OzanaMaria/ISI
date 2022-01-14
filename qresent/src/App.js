import React from "react"
import Signup from "./components/Auth/SignUp/SignUp";
import Login from "./components/Auth/Login/Login";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContexts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Subject from "./components/Subject/Subject";
import Subject2 from "./components/Subject2/Subject2";
import Form from "./components/Form/Form";
import ScanQr from "./components/ScanQR/ScanQr";
import Profile from "./components/Profile/Profile"
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import UpdateUser from "./components/Dashboard/UpdateUser";
import EditProfile from "./components/Subject/EditProfile";
import StudentsManagement from "./components/Auth/Users/StudentsManagement";
import TeachersManagement from "./components/Auth/Users/TeachersManagement";
import MaterialsManagement from "./components/Auth/Users/MaterialsManagement";
import Add from "./components/Dashboard/Add";
import AddOffer from "./components/Dashboard/AddOffer";
import MyContracts from "./components/MyContracts/MyContracts";
import ShowMap from "./components/ArcGisMap/ShowMap";
function App() {
  

  return (
    <>
      <div
        className="align-items-center justify-content-center"
      >
        <div className="w-100">
          <Router>
            <AuthProvider>
              <Navbar/>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard}/>
                <PrivateRoute exact path="/admin" component={AdminDashboard}/>
                <PrivateRoute exact path="/admin/:user" component={UpdateUser}/>
                <PrivateRoute exact path="/addStudent" component={StudentsManagement}/>
                <PrivateRoute exact path="/addTeacher" component={TeachersManagement}/>
                <PrivateRoute exact path="/addMaterial" component={MaterialsManagement}/>
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/subject/:id" component={Subject}/>
                <PrivateRoute exact path="/subject2/:id" component={Subject2}/>
                <PrivateRoute exact path="/form" component={Form}/>
                <PrivateRoute exact path="/scanqr" component={ScanQr}/>
                <PrivateRoute exact path="/profil" component={Profile}/>
                <PrivateRoute exact path="/edit" component={EditProfile}/>
                <PrivateRoute exact path="/addRequest" component={Add}/>
                <PrivateRoute exact path="/addOffer" component={AddOffer}/>
                <PrivateRoute exact path="/contracts" component={MyContracts}/>
                <PrivateRoute exact path="/ShowMap" component={ShowMap}/>
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </div>
    </>
  )
}

export default App;
