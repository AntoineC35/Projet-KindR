import "./styles/App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./components/Root";
import RootRegister from "./components/RootRegister";
import ErrorPage from "./components/error-page";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import AddressRegister from "./components/AddressRegister";
import PlaceRegister from "./components/PlaceRegister";
import ActiviteRegister from "./components/ActiviteRegister";
import SituationRegister from "./components/SituationRegister";
import DisponibilityRegister from "./components/DisponibilityRegister";
import AvatarRegister from "./components/AvatarRegister";
import Register from "./components/Register";
import ParentRegister from "./components/ParentRegister";
import ProRegister from "./components/ProRegister";
import About from "./components/About";
import Messages from "./components/Messages";
import Activites from "./components/Activites";
import Profil from "./components/Profil";
import Details from "./components/Details";
import Message from "./components/Message";
import Disponibility from "./components/Disponibility";
import PostsManager from "./components/PostsManager";
import ActiviteDetails from "./components/ActiviteDetails";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <>
        <Route path="/" element={<Root />}>
          <Route path="home" element={<Home />} />

          <Route path="sign_in" element={<SignIn />} />

          <Route path="about" element={<About />} />
          <Route path="messages" element={<Messages />} />
          <Route path="activites" element={<Activites />} />
          <Route
            path="activite_details/:activite_id"
            element={<ActiviteDetails />}
          />
          <Route path="profil" element={<Profil />} />
          <Route path="details/:pro_id" element={<Details />} />
          <Route path="message/:pro_id" element={<Message />} />
          <Route path="disponibility/:pro_id" element={<Disponibility />} />
          <Route path="posts_manager" element={<PostsManager />} />
        </Route>
        <Route path="reg" element={<RootRegister />}>
          <Route
            path="disponibility_register"
            element={<DisponibilityRegister />}
          />
          <Route path="parent_register" element={<ParentRegister />} />
          <Route path="pro_register" element={<ProRegister />} />
          <Route path="address_register" element={<AddressRegister />} />
          <Route path="avatar_register" element={<AvatarRegister />} />
          <Route path="place_register" element={<PlaceRegister />} />
          <Route path="activite_register" element={<ActiviteRegister />} />
          <Route path="situation_register" element={<SituationRegister />} />
          <Route path="sign_in" element={<SignIn />} />
        </Route>
        <Route path="Register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />,
      </>,
    ])
  );

  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
