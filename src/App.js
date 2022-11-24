import React from 'react';
import RouterPage from './pages/RouterPage';
import 'antd/dist/antd.css';
import { LoginContextProvider } from './context/LoginContext';

const App = () => {
    return (
        <div>
            <LoginContextProvider>
                <RouterPage></RouterPage>
            </LoginContextProvider>
        </div>
    );
};

export default App;
