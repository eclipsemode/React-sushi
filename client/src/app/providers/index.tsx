import compose from "compose-function";
import withRouter from "./with-router";

const withProviders = compose(withRouter);

export default withProviders