import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from "app/store";

const withPersist = (component: any) => () => (
  <PersistGate loading={null} persistor={persistor}>
    { component() }
  </PersistGate>
)

export default withPersist;