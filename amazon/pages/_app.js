import { Provider } from "react-redux";
import { Provider as AuthProvider } from "next-auth/client";
import { store } from "../redux/store";
import "tailwindcss/tailwind.css";

function App({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
}

export default App;
