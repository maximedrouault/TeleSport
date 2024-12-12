import { Component, OnInit } from '@angular/core';
import {interval, map, Observable, of, take} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {Router} from "@angular/router";
import {Olympic} from "../../core/models/Olympic";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pageTitle: string = "Medals per Country";
  statsCardInfos: { title: string, value$: Observable<number | null> }[] | null = null;
  chartData$: Observable<any> = of(null);

  constructor(private readonly olympicService: OlympicService, private readonly router: Router) {}

  ngOnInit(): void {
    this.statsCardInfos = [
      { title: "Number of JOs", value$: this.olympicService.getNumberOfJOs() },
      { title: "Number of countries", value$: this.olympicService.getNumberOfCountries()}
    ]

    this.chartData$ = this.olympicService.getTotalMedalsByCountries().pipe(
      map((data: { country: string, totalMedals: number }[]): { labels: string[], datasets: { data: number[] }[] } =>({
        labels: data.map((entry: { country: string, totalMedals: number }): string => entry.country),
        datasets: [
          {
            data: data.map((entry: { country: string, totalMedals: number }): number => entry.totalMedals)
          }
        ]
      }))
    )

    this.chartData$.pipe(take(1)).subscribe((olympics: Olympic[]): void => {
      if (!this.statsCardInfos || !olympics) {
        this.router.navigateByUrl("/404")
          .catch((error: any): void => console.error(error.message));
      }
    });
  }

  handleSegmentClicked(segmentId: number): void {
    const clickedCountryId: number = segmentId + 1;

    this.router.navigateByUrl(`details/${clickedCountryId}`)
      .catch((error: any): void => {
        console.error(error.message);
        this.router.navigateByUrl("/404")
          .catch((error: any): void => console.error(error.message));
      });
  }
}
