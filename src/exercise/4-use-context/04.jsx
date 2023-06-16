import clsx from 'clsx';
import { useReducer, useState, createContext, useContext, useMemo } from 'react';

// 🦁 Crée un ThemeContext en utilisant `React.createContext`
const ThemeContext = createContext();

const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return themeContext;
}

const ThemeContextDispatch = createContext();

const useThemeContextDispatch = () => {
  const themeContextDispatch = useContext(ThemeContextDispatch);
  if (!themeContextDispatch) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return themeContextDispatch;
}

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('light');

  const isDark = theme === 'dark';
  const isLight = theme === 'light';
  const values = useMemo(() => ({ theme, isDark, isLight }), [theme, isDark, isLight]);

  const toggle = () => setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  const setLight = () => setTheme('light');
  const setDark = () => setTheme('dark');
  const dispatchValues = useMemo(() => ({ toggle, setLight, setDark }), []);

  return (
    <ThemeContext.Provider value={values}>
      <ThemeContextDispatch.Provider value={dispatchValues}>
        {children}
      </ThemeContextDispatch.Provider>
    </ThemeContext.Provider>
  );
};


const ThemedLayout = ({ children }) => {
  const { isDark } = useContext(ThemeContext)
  return (
    <div className={clsx('theme-app', { 'dark-theme-app': isDark })}>
      {children}
    </div>
  );
};

const ForceLightMode = () => {
  const { setLight } = useThemeContextDispatch()
  return <button onClick={() => setLight()}>Force light</button>;
};

const ForceDarkMode = () => {
  const { setDark } = useThemeContextDispatch()
  return <button onClick={() => setDark()}>Force dark</button>;
};

const ToggleMode = () => {
  const { toggle } = useThemeContextDispatch();
  const { isDark } = useThemeContext();
  return <button onClick={toggle}>{isDark ? '🌞' : '🌙'}</button>;
};

const CurrentModeInfo = () => {
  const { theme } = useThemeContext()
  return (
    <div>
      Current theme: <b>{theme}</b>
    </div>
  );
};

const ForceThemeButtons = () => {
  const { setLight, setDark } = useThemeContext();
  return(
    <div style={{ marginTop: 32 }}>
      <ForceLightMode setLight={() => setLight()} />
      <ForceDarkMode setDark={() => setDark()} />
    </div>
  );
}

const App = () => {
  const [count, increment] = useReducer((curr) => curr + 1, 0);
  const [theme, setTheme] = useState('light');

  return (
    <ThemeProvider>
      <div>
        <p>Not in dark mode</p>
        <button onClick={increment}>{count}</button>
        <ThemedLayout isDark={theme === 'dark'}>
          <ToggleMode
            toggle={() =>
              setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
            }
            isDark={theme === 'dark'}
          />

          <h1>Articles</h1>
          <h3>What is useContext ?</h3>
          <p>
            useContext is used to pass data through the component tree without
            having to pass props down manually at every level.
          </p>
          <hr />
          <CurrentModeInfo theme={theme} />
          <ForceThemeButtons setTheme={setTheme} />
        </ThemedLayout>
      </div>
    </ThemeProvider>
  );
};

export default App;
