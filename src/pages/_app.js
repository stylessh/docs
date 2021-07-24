import { Provider } from "next-auth/client";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import dynamic from "next/dynamic";

const DocumentWrapper = dynamic(
  () => import("../context/document").then((module) => module.DocumentWrapper),
  {
    ssr: false,
  }
);

// ui font
import "inter-ui/inter.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider session={pageProps.session}>
        <DocumentWrapper>
          <GeistProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </GeistProvider>
        </DocumentWrapper>
      </Provider>
    </>
  );
}

export default MyApp;
