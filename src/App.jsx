import Routes from './Routes';
import { ThemeProvider } from './context/ThemeContext';
import AnimatedCursor from './components/AnimatedCursor';

function App() {
  return (
    <ThemeProvider>
      <AnimatedCursor />
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors">
        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;