import React from 'react';
import usePost from './hooks/post';

type AppProps = {
  
}

function App() {
  const { onGetData } = usePost();

  return (
    <div className="App">
      <button onClick={() => onGetData()}>Click</button>
    </div>
  );
}

export default App;
