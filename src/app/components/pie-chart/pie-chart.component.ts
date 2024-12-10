import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {Observable, of} from "rxjs";
import {Chart, ChartData} from "chart.js";
import Outlabels from '@energiency/chartjs-plugin-piechart-outlabels';

Chart.register(Outlabels);

@Component({
  selector: 'app-pie-chart',
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
  @Output() segmentClicked: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
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
          caretSize: 15
        },
        outlabels: {
          color: "black",
          backgroundColor: null,
          lineWidth: 1,
          stretch: 1,
          font: {
            family: "Montserrat",
            minSize: 12,
            maxSize: 20
          }
        }
      }
    };
  }

  onChartClick(event: any): void {
    if (event.element) {
      const clickedSegment: number = event.element.index;

      this.segmentClicked.emit(clickedSegment);
    }
  }
}
