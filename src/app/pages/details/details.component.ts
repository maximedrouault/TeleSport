import { Component } from '@angular/core';
import {TitleComponent} from "../../components/title/title.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    TitleComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  pageTitle: string = "Name of the country";
}
