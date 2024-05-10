// Import the custom component and sample data
import ScrnUmapGraph from './SCRNAVisualizer';
import { sampleUmapData } from './tests/sampleData';

function App() {
  const graphWidth = 600; // Customize the graph width
  const graphHeight = 400; // Customize the graph height

  return (
    <div className="App">
      <h1>ScRNA UMAP/t-SNE Graph</h1>
      <ScrnUmapGraph
        data={sampleUmapData} // Use the sample data
        width={graphWidth}
        height={graphHeight} />
    </div>
  );
}

export default App;
