import clsx from 'clsx';
import { useReducer, useState, createContext, useContext } from 'react';

// 🦁 Crée un ThemeContext en utilisant `React.createContext`
const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');
  const isDark = theme === 'dark';
  const isLight = theme === 'light';
  const values = {
    toggle: toggleTheme,
    setLight: setLightTheme,
    setDark: setDarkTheme,
    isDark,
    isLight,
    theme,
  }
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
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
  const { setLight } = useContext(ThemeContext)
  return <button onClick={() => setLight()}>Force light</button>;
};

const ForceDarkMode = () => {
  const { setDark } = useContext(ThemeContext)
  return <button onClick={() => setDark()}>Force dark</button>;
};

const ToggleMode = () => {
  const { toggle, isDark } = useContext(ThemeContext)
  return <button onClick={toggle}>{isDark ? '🌞' : '🌙'}</button>;
};

const CurrentModeInfo = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div>
      Current theme: <b>{theme}</b>
    </div>
  );
};

const ForceThemeButtons = () => {
  const { setLight, setDark } = useContext(ThemeContext);
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
