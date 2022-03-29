import "../styles/globals.css";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Wholesalary</title>

        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />

        <link rel="icon" href="images/favicon.png" type="image/x-icon" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
