import { useEffect } from "react";
import axios from "axios";
import { Provider } from 'react-redux';

import Main from "./Routes/main";
import { store } from "./redux/store/store";
import AuthProvider from "./providers/authProvider";

const App = () => {

  // const connectToHomeRoute = async () => {
  //   const { data } = await axios.get(`http://127.0.0.1:5000/`);
  //   console.log("connection established", data);
  // }

  // useEffect(() => {
  //   connectToHomeRoute()
  // }, []);

  return (
    <div>
      <AuthProvider>
        <Provider store={store} >
          <Main />
        </Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
