import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Collection } from './components/Collection';
import { Blog } from './components/Blog';
import { ViewState } from './types';

// Simple Hash-based router logic hook
const useHashLocation = (): [ViewState, (view: ViewState) => void] => {
  const [view, setView] = useState<ViewState>('HOME');

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'collection') {
        setView('COLLECTION');
      } else if (hash === 'blog') {
        setView('BLOG');
      } else {
        setView('HOME');
      }
    };

    // Initialize
    onHashChange();

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (newView: ViewState) => {
    let hash = '';
    if (newView === 'COLLECTION') hash = 'collection';
    if (newView === 'BLOG') hash = 'blog';
    window.location.hash = hash;
  };

  return [view, navigate];
};

const App: React.FC = () => {
  const [currentView, navigate] = useHashLocation();

  return (
    <Layout currentView={currentView} onChangeView={navigate}>
      {currentView === 'HOME' && <Home />}
      {currentView === 'COLLECTION' && <Collection />}
      {currentView === 'BLOG' && <Blog />}
    </Layout>
  );
};

export default App;