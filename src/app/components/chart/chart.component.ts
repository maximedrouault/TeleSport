import {Component, Input} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {AsyncPipe} from "@angular/common";
import {Observable, of} from "rxjs";
import {ChartConfiguration} from "chart.js";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    ChartModule,
    AsyncPipe
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @Input() chartData$ : Observable<any> = of();
  @Input() chartOptions: ChartConfiguration["options"];
  @Input() chartType: "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar" | undefined;
}
