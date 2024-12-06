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
      borderWidth: 0,
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 30,
          bottom: 30
        }
      },

      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: "rgba(4, 130, 142, 1)",
          titleFont: {
            family: "Montserrat",
            size: 16,
            weight: "normal"
          },
          bodyFont: {
            family: "Montserrat",
            size: 14
          },
          bodyAlign: "center",
          displayColors: false,
          yAlign: "bottom",
          caretSize: 15,
          padding: {
            top: 5,
            bottom: 5,
            left: 10,
            right: 10
          }
        },
        outlabels: {
          color: 'black',
          backgroundColor: null,
          lineWidth: 1,
          font: {
            family: "Montserrat",
            minSize: 12,
            maxSize: 20
          }
        }
      },
    };
  }
}
