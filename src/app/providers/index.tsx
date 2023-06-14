import compose from 'compose-function';
import withRouter from './with-router';
import withPersist from './with-persist';
import withAuth from './with-auth';
import withAdaptive from './with-adaptive';
import withSnackbar from "./with-snackbar";

const withProviders = compose(withAdaptive, withRouter, withPersist, withAuth, withSnackbar);

export default withProviders;
