import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./views/Menu";
import Dashboard from "./views/Dashboard/Dashboard";
import IngredientTracker from "./views/IngredientTracking/IngredientTracker";
import SalesDashboard from "./views/SalesInsights/SalesDashboard";
import Settings from "./views/Settings/Settings";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Menu />}>
            <Route index element={<Dashboard />} />
            <Route path="ingredient-tracker" element={<IngredientTracker />} />
            <Route path="sales-insights" element={<SalesDashboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
