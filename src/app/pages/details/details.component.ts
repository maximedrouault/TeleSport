import {Component, OnInit} from '@angular/core';
import {TitleComponent} from "../../components/title/title.component";
import {map, Observable, of, take} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {StatsCardComponent} from "../../components/stats-card/stats-card.component";
import {OlympicService} from "../../core/services/olympic.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {LineChartComponent} from "../../components/line-chart/line-chart.component";
import {ChartData} from "chart.js";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    TitleComponent,
    AsyncPipe,
    StatsCardComponent,
    RouterLink,
    LineChartComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  pageTitle: string = "Name of the country";
  statsCardInfos: { title: string, value$: Observable<number | null> }[] | null = null;
  countryId: number | null = null;
  chartData$: Observable<ChartData<"line"> | null> = of(null);

  constructor(private readonly olympicService: OlympicService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {}

  ngOnInit(): void {
    this.countryId = Number(this.route.snapshot.params["id"]);

    this.statsCardInfos = [
      {title: "Number of entries", value$: this.olympicService.getNumberOfParticipationsByCountry(this.countryId)},
      {title: "Total number medals", value$: this.olympicService.getTotalMedalsByCountry(this.countryId)},
      {title: "Total number of athletes", value$: this.olympicService.getTotalAthletesByCountry(this.countryId)}
    ]

    this.chartData$ = this.olympicService.getMedalsByCountryParticipations(this.countryId).pipe(
      map((data: { year: number, medalsCount: number }[] | null): ChartData<"line"> | null =>
        data ? {
          labels: data.map((entry: { year: number, medalsCount: number }): string => entry.year.toString()),
          datasets: [
            {
              data: data.map((entry: { year: number, medalsCount: number }): number => entry.medalsCount)
            }
          ]
        } : null
      )
    );

    this.chartData$.pipe(take(1)).subscribe((chartData: ChartData<"line"> | null): void => {
      if (!this.statsCardInfos || !chartData) {
        setTimeout((): void => this.checkDataAndRedirect(), 1000);
      }
    });
  }

  private checkDataAndRedirect(): void {
    this.chartData$.pipe(take(1)).subscribe((chartData: ChartData<"line"> | null): void => {
      if (!this.statsCardInfos || !chartData) {
        this.router.navigateByUrl("/404").catch((error: Error): void => console.error(error.message));
      }
    });
  }
}
