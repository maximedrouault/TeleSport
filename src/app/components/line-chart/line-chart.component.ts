import {Component, Input, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {ChartData, ChartOptions} from "chart.js";

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
  @Input() chartData: ChartData<"line"> | null = null;
  chartType: "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar" | undefined = "line";
  chartOptions: ChartOptions<"line"> | undefined = undefined;

  ngOnInit(): void {
    this.chartOptions = {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }
}
