import { Provider } from "next-auth/client";
import Head from "next/head";
import dynamic from "next/dynamic";

const DocumentWrapper = dynamic(
  () => import("../context/document").then((module) => module.DocumentWrapper),
  {
    ssr: false,
  }
);

import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Poppins:wght@400;700" />
      </Head>

      <Provider session={pageProps.session}>
        <DocumentWrapper>
          <Component {...pageProps} />
        </DocumentWrapper>
      </Provider>
    </>
  );
}

export default MyApp;
