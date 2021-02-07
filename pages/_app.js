import "../styles/index.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { QueryClient, QueryClientProvider } from "react-query";

import { AuthProvider } from "@/lib/hooks/useAuth";
import { Hydrate } from "react-query/hydration";
import { config } from "@fortawesome/fontawesome-svg-core";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

config.autoAddCss = false;
export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
