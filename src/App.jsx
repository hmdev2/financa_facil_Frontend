import { Routes, Route} from 'react-router-dom';
import { Home } from './Templates/Home';
import { SignUp } from './Templates/SignUp';
import { LogIn } from './Templates/LogIn';
import { Dashboard } from './Templates/Dashboard';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { CreateTransaction } from './Templates/CreateTransaction';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/log-in' element={<LogIn />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateTransaction />} />
            </Route>
           
        </Routes>
    );
}

export default App;