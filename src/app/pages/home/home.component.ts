import { Component, OnInit } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pageTitle: string = "Medals per Country";
  statsCardInfos: { title: string, value$: Observable<number | null> }[] = [
    { title: "", value$: of(null) }
  ];
  chartData$: Observable<any> = of();

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.statsCardInfos = [
      { title: "Number of JOs", value$: this.olympicService.getNumberOfJOs() },
      { title: "Number of countries", value$: this.olympicService.getNumberOfCountries()}
    ]

    this.chartData$ = this.olympicService.getTotalMedalsByCountry().pipe(
      map((data) => ({
        labels: data.map((entry) => entry.country),
        datasets: [
          {
            data: data.map((entry) => entry.totalMedals)
          }
        ]
      }))
    )
  }
}
