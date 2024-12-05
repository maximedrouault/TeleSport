import {Component, Input, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {Observable, of} from "rxjs";
import {Chart, ChartData} from "chart.js";
import Outlabels from '@energiency/chartjs-plugin-piechart-outlabels';

Chart.register(Outlabels);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
  @Input() chartData$ : Observable<ChartData> = of();
  chartType: "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar" | undefined = "pie";
  chartOptions: any;

  ngOnInit() {
    this.chartOptions = {
      with: "100%",
      height: "100%",
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 30,
          bottom: 30
        }
      },
      borderWidth: 0,
      plugins: {
        outlabels: {
          color: 'black',
          backgroundColor: null,
          lineWidth: 1,
          font: {
            family: "Montserrat",
            minSize: 12,
            maxSize: 20
          }
        },
        legend: {
          display: false
        }
      }
    };
  }
}