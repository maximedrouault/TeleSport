import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly olympicService: OlympicService, private readonly  router: Router) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe({
      error: (error: any): any => {
        console.error("An error occurred during data retrieving", error.message);
        this.router.navigateByUrl("/404")
          .catch((error: any): void => console.error("Failed to navigate to 404: ", error.message));
      }
    });
  }
}
