import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Olympic} from "../models/Olympic";
import {Participation} from "../models/Participation";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl: string = './assets/mock/olympic.json';
  private olympics$: BehaviorSubject<Olympic[]> = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value: Olympic[]): void => this.olympics$.next(value)),
      catchError((error: HttpErrorResponse, caught: Observable<Olympic[]>):Observable<Olympic[]> => {
        // TODO: improve error handling
        console.error("Error loading data: ", error.message);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  getNumberOfJOs(): Observable<number> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]): number => {
        const uniqueYear: Set<number> = new Set<number>(
          olympics.flatMap((year: Olympic): number[] =>
            year.participations.map((participation: Participation): number => participation.year)
          )
        );
        return uniqueYear.size;
      })
    );
  }

  getNumberOfCountries(): Observable<number> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]): number => olympics.length)
    );
  }

  getTotalMedalsByCountries(): Observable<{ country: string, totalMedals: number }[]> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]): { country: string, totalMedals: number }[] => {
        return olympics.map((country: Olympic): { country: string, totalMedals: number } => ({
          country: country.country,
          totalMedals: country.participations.reduce(
            (sum: number, participation: Participation): number => sum + participation.medalsCount, 0
          )
        }));
      })
    );
  }

  getNumberOfParticipationsByCountry(countryId?: number | null): Observable<number | null> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]): number | null => {
        const countryFound: Olympic | undefined = olympics.find((country: Olympic): boolean => country.id === countryId);

        return countryFound ? countryFound.participations.length : null;
      })
    );
  }
}
