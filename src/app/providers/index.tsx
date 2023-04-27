import compose from 'compose-function';
import withRouter from './with-router';
import withPersist from './with-persist';
import withAuth from './with-auth';
import withAdaptive from './with-adaptive';

const withProviders = compose(withAdaptive, withRouter, withPersist, withAuth);

export default withProviders;
