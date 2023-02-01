import compose from "compose-function";
import withRouter from "./with-router";
import withPersist from "./with-persist";

const withProviders = compose(withRouter, withPersist);

export default withProviders