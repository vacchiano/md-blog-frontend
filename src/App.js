import 'semantic-ui-css/semantic.min.css'
import { Router, Route, Switch } from 'react-router-dom'
import {createBrowserHistory} from 'history';

import Layout from './containers/Layout';
import PostList from './containers/PostList';
import PostDetail from './containers/PostDetail';
import PostCreate from './containers/PostCreate';
import PostUpdate from './containers/PostUpdate';
import PostDelete from './containers/PostDelete';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/create" component={PostCreate} />
          <Route path="/post/:postSlug/update" component={PostUpdate} />
          <Route path="/post/:postSlug/delete" component={PostDelete} />
          <Route path="/post/:postSlug" component={PostDetail} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
