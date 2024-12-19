import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {ActiveElement, Chart, ChartData, ChartOptions, TooltipItem} from "chart.js";
import Outlabels from "@energiency/chartjs-plugin-piechart-outlabels";

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
  @Input() chartData : ChartData<"pie"> | null = null;
  chartType: "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar" | undefined = "pie";
  chartOptions: ChartOptions<"pie"> & { plugins: { outlabels: OutlabelsOptions } } | undefined = undefined;
  @Output() segmentClicked: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.chartOptions = {
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
          callbacks: {
            label: function(context: TooltipItem<"pie">): string {
              const value: number = context.parsed;
              return `🏅 ${value}`;
            }
          }
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

  onChartClick(event: { element: ActiveElement }): void {
    if (event.element) {
      const clickedSegment: number = event.element.index;
      this.segmentClicked.emit(clickedSegment);
    }
  }
}
