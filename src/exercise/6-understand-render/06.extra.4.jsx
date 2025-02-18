import { useState } from 'react';
import { ExpensiveComponent } from '../../toolbox/components/ExpensiveComponent.jsx';
import { useOnRenderStyle } from '../../toolbox/hooks/useOnRenderStyle.jsx';

const SmallComponentTop = () => {
  const ref = useOnRenderStyle();
  return (
    <div ref={ref} style={{ width: '100px', height: '100px' }}>
      SmallComponentLeft
    </div>
  );
};

const ScrollComponent = ({ topChildren, children}) => {

  const [scroll, setScroll] = useState(0);

  return (
    <div
      style={{ overflowY: 'scroll', height: '500px', paddingTop: '200px' }}
      onScroll={(e) => {
        setScroll(e.target.scrollTop);
      }}
    >
      <div style={{ height: '800px' }}>
        {topChildren}
        <p style={{ width: 'fit-content' }}>Hey, you scroll {scroll}</p>
        {children}
      </div>
    </div>
  );
}

const App = () => {
  return (
        <ScrollComponent topChildren={<SmallComponentTop/>}>
          <ExpensiveComponent />
        </ScrollComponent>
  );
};

export default App;
