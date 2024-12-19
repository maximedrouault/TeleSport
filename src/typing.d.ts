/**
 * Declares a module for the Chart.js plugin 'chartjs-plugin-piechart-outlabels'.
 */
declare module '@energiency/chartjs-plugin-piechart-outlabels';

/**
 * Interface representing the configuration options for outlabels.
 */
interface OutlabelsOptions {
  color?: string;
  backgroundColor?: string | null;
  lineWidth?: number;
  stretch?: number;
  font?: {
    family?: string;
    minSize?: number;
    maxSize?: number;
  };
}
