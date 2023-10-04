import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "profile/:username",
    element: <Profile />,
  },
]);
export default router;
