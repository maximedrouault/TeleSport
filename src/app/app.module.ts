import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {TitleComponent} from "./components/title/title.component";
import {StatsCardComponent} from "./components/stats-card/stats-card.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, TitleComponent, StatsCardComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
