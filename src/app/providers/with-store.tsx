import { Provider } from "react-redux";
import { store } from "app/store";

const withStore  = (component: any) => () => {
  return (
    <Provider store={store}>
      {component()}
    </Provider>
  )
}


export default withStore;