import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import {Toaster} from "sonner"
import {Provider} from "react-redux"
import {store} from "./redux/store.ts"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-center"
        richColors
        visibleToasts={1}
        duration={2500}
      />
    </Provider>
  </QueryClientProvider>
)
