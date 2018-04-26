import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-client-preset';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { AUTH_TOKEN } from './components/constants';

const httpLink = new HttpLink({ uri: 'https://server-ryotnwpykc.now.sh/graphql' })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache()
});

const ApolloApp = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </BrowserRouter>
  )
}

ReactDOM.render(<ApolloApp />, document.getElementById('root'));
registerServiceWorker();
