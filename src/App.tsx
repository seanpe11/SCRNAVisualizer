// Import the custom component and sample data
import { useRef, useEffect } from 'react';
import ScrnUmapGraph from './SCRNAVisualizer';
import { sampleUmapData } from './tests/sampleData';
import Papa from 'papaparse';
import type { UmapData } from './lib/types';

function parseCsvToUmapData(csvFile: string): Promise<UmapData[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const mappedData = results.data.map((item: any) => ({
          x: item.umap_1,
          y: item.umap_2,
          ...item
        }));
        resolve(mappedData as UmapData[]);
      },
      error: (error) => reject(error)
    });
  });
}

function App() {
  const graphWidth = 600; // Customize the graph width
  const graphHeight = 400; // Customize the graph height
  let umapData

  useEffect(() => {
    async function fetchAndParseData() {
      const csvUrl = './tests/umap_tgfb_pathway.csv'; // Adjust to your actual CSV file location
      try {
        const data = await parseCsvToUmapData(csvUrl);
        umapData = data;
      } catch (error) {
        console.error("Failed to parse CSV:", error);
      }
    }

    fetchAndParseData();
  }, []);


  return (
    <div className="App">
      <h1>ScRNA UMAP/t-SNE Graph</h1>
      <ScrnUmapGraph
        data={umapData} // Use the sample data
        width={graphWidth}
        height={graphHeight} />
    </div>
  );
}

export default App;
