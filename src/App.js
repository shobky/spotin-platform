import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RoutesComponent from "./Routes";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <RoutesComponent />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App