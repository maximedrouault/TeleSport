import {Component, OnInit} from '@angular/core';
import {TitleComponent} from "../../components/title/title.component";
import {Observable, of} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {StatsCardComponent} from "../../components/stats-card/stats-card.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    TitleComponent,
    AsyncPipe,
    StatsCardComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  pageTitle: string = "Name of the country";
  statsCardInfos: { title: string, value$: Observable<number | null> }[] = [
    { title: "", value$: of(null) }
  ];

  ngOnInit() {
    this.statsCardInfos = [
      { title: "Number of entries", value$: of() },
      { title: "Total number medals", value$: of()},
      { title: "Total number of athletes", value$: of()}
    ]
  }
}
