export interface UmapData {
  x: number;
  y: number;
  [genename: string]: number | null;
}

export interface Gene {
  code: string;
}
