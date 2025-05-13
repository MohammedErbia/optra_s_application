import Routes from './Routes';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors">
        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;