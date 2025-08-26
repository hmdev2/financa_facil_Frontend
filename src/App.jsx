import { Routes, Route} from 'react-router-dom';
import { Home } from './Templates/Home';
import { SignUp } from './Templates/SignUp';
import { LogIn } from './Templates/LogIn';
import { Dashboard } from './Templates/Dashboard';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { CreateTransaction } from './Templates/CreateTransaction';
import { Page404 } from './Templates/Page404';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/log-in' element={<LogIn />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateTransaction />} />
                <Route path="/edit/:id" element={<CreateTransaction />} />
            </Route>
           
            <Route path='*' element={<Page404 />} />
            
        </Routes>
    );
}

export default App;