import React from "react";
import { Route, Routes } from "react-router";
import { LoginScreen } from "./screens/loginScreen/LoginScreen";
import RegisterScreen from "./screens/registerScreen/RegisterScreen";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import CreateWorkspaceScreen from "./screens/createWorkspaceScreen/CreateWorkspaceScreen";
import WorkspaceDetailScreen from "./screens/workspaceDetailScreen/WorkspaceDetailScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/workspace/new" element={<CreateWorkspaceScreen />} />
      <Route
        path="/workspace/:workspace_id"
        element={<WorkspaceDetailScreen />}
      />
      <Route
        path="/workspace/:workspace_id/:channel_id"
        element={<WorkspaceDetailScreen />}
      />
    </Routes>
  );
}

export default App;
