import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pageTitle = "Medals per Country";
  statsCardInfos: {title: string, value$: Observable<number>}[] = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.statsCardInfos = [
      { title: "Number of JOs", value$: this.olympicService.getNumberOfJOs() },
      { title: "Number of countries", value$: this.olympicService.getNumberOfCountries()}
    ]
  }
}
