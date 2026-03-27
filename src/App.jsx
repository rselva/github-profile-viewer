
import AppContent from "./components/AppContent"
import { ThemeProvider } from "./context/ThemeContext"

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}