import {Component, Input, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {ChartData} from "chart.js";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit {
  @Input() chartData$: Observable<ChartData> = of();
  chartType: "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar" | undefined = "line";
  chartOptions: any;

  ngOnInit() {
    this.chartOptions = {
      with: "100%",
      height: "100%",

      plugins: {
        legend: {
          display: false
        }
      }
    }
  }
}
