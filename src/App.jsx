import React from "react";
import { Route, Routes } from "react-router";
import { LoginScreen } from "./screens/loginScreen/LoginScreen";
import RegisterScreen from "./screens/registerScreen/RegisterScreen";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import WorkspaceDetailScreen from "./screens/workspaceDetailScreen/WorkspaceDetailScreen";
import CreateWorkspaceIntroScreen from "./screens/createWorkspaceIntroScreen/CreateWorkspaceIntroScreen";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspace/create"
        element={
          <ProtectedRoute>
            <CreateWorkspaceIntroScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspace/new"
        element={
          <ProtectedRoute>
            <WorkspaceDetailScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspace/:workspace_id"
        element={
          <ProtectedRoute>
            <WorkspaceDetailScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspace/:workspace_id/:channel_id"
        element={
          <ProtectedRoute>
            <WorkspaceDetailScreen />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
