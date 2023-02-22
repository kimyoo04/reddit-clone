import "../styles/globals.css";

import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import { Provider } from "react-redux";
import { store } from "@toolkit/store";
import Axios from "axios";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  Axios.defaults.withCredentials = true;

  return (
    <>
      <Head>
        <title>Title here</title>
        <meta name="description" content="description here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      </Head>

      <ThemeProvider attribute="class">
        <Provider store={store}>
          <main>
            <AnimatePresence mode="wait">
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </main>
        </Provider>
      </ThemeProvider>
    </>
  );
}

// App.getInitialProps = async (context: NextPageContext) => {
//   const { req } = context;
//   let pageProps = {};
//   pageProps = { refreshToken: req?.headers.refreshToken };

//   // return한 값은 해당 컴포넌트의 props로 들어가게 됩니다.
//   return { pageProps };
// };
