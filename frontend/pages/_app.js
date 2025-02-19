import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import '../styles/globals.css';
import Layout from "../components/Layout";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // ✅ Ensure this matches your backend GraphQL URL
  cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
