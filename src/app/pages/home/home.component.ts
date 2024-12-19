import { Component, OnInit } from '@angular/core';
import {map, Observable, of, take} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {Router} from "@angular/router";
import {ChartData} from "chart.js";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pageTitle: string = "Medals per Country";
  statsCardInfos: { title: string, value$: Observable<number | null> }[] | null = null;
  chartData$: Observable<ChartData<"pie"> | null> = of(null);

  constructor(private readonly olympicService: OlympicService, private readonly router: Router) {}

  ngOnInit(): void {
    this.statsCardInfos = [
      { title: "Number of JOs", value$: this.olympicService.getNumberOfJOs() },
      { title: "Number of countries", value$: this.olympicService.getNumberOfCountries()}
    ]

    this.chartData$ = this.olympicService.getTotalMedalsByCountries().pipe(
      map((data: { country: string, totalMedals: number }[] | null): ChartData<"pie"> | null =>
        data ? {
        labels: data.map((entry: { country: string, totalMedals: number }): string => entry.country),
        datasets: [
          {
            data: data.map((entry: { country: string, totalMedals: number }): number => entry.totalMedals),
            borderWidth: 0
          }
        ]
      } : null
      )
    )

    this.chartData$.pipe(take(1)).subscribe((chartData: ChartData<"pie"> | null): void => {
      if (!this.statsCardInfos || !chartData) {
        this.router.navigateByUrl("/404")
          .catch((error: Error): void => console.error(error.message));
      }
    });
  }

  handleSegmentClicked(segmentId: number): void {
    const clickedCountryId: number = segmentId + 1;

    this.router.navigateByUrl(`details/${clickedCountryId}`)
      .catch((error: Error): void => {
        console.error(error.message);
        this.router.navigateByUrl("/404")
          .catch((error: Error): void => console.error(error.message));
      });
  }
}
