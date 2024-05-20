// Import the custom component and sample data
import { useState } from 'react';
import SCRNAVisualizer from './SCRNAVisualizer'

function App() {
  const [csvUrl, setCsvUrl] = useState('https://inljkygseqcoqhxuoowj.supabase.co/storage/v1/object/public/seanpe-public/bioinformatics/umap_tgfb_pathway.csv')

  setCsvUrl('/umap_tgfb_pathway.csv')

  return (
    <div className="App">
      <h1>ScRNA UMAP/t-SNE Graph</h1>
      <SCRNAVisualizer csvUrl={csvUrl} />
    </div>
  );
}

export default App;


