import compose from "compose-function";
import withRouter from "./with-router";
import withPersist from "./with-persist";
import withAuth from "./with-auth";

const withProviders = compose(withRouter, withPersist, withAuth);

export default withProviders