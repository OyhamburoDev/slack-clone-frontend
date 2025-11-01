import React from "react";
import { Route, Routes } from "react-router";
import { LoginScreen } from "./screens/loginScreen/LoginScreen";
import RegisterScreen from "./screens/registerScreen/RegisterScreen";
import HomeScreen from "./screens/homeScreen/HomeScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/home" element={<HomeScreen />} />
    </Routes>
  );
}

export default App;
