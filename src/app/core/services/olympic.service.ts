import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Olympic} from "../models/Olympic";
import {Participation} from "../models/Participation";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private readonly olympicUrl: string = './assets/mock/olympic.json';
  private readonly olympics$: BehaviorSubject<Olympic[]> = new BehaviorSubject<Olympic[]>([]);

  constructor(private readonly http: HttpClient) {}

  /**
   * Loads the initial data from the provided URL.
   * @returns {Observable<Olympic[]>} An observable containing the list of Olympic events.
   */
  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value: Olympic[]): void => this.olympics$.next(value)),
      catchError((error: HttpErrorResponse):Observable<never> => {
        console.error("Error loading data: ", error.message);
        this.olympics$.next([]);

        return throwError((): HttpErrorResponse => error);
      })
    );
  }

  /**
   * Gets the observable of Olympic events.
   * @returns {Observable<Olympic[]>} An observable containing the list of Olympic events.
   */
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  /**
   * Gets the number of unique Olympic years.
   * @returns {Observable<number>} An observable containing the number of unique Olympic years.
   */
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

  /**
   * Gets the number of countries that participated in the Olympics.
   * @returns {Observable<number>} An observable containing the number of countries.
   */
  getNumberOfCountries(): Observable<number> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]): number => olympics.length)
    );
  }

  /**
   * Gets the total number of medals won by each country.
   * @returns {Observable<{ country: string, totalMedals: number }[]>} An observable containing the total medals by country.
   */
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

  /**
   * Gets the number of participations by a specific country.
   * @param {number | null} countryId - The ID of the country.
   * @returns {Observable<number | null>} An observable containing the number of participations or null if not found.
   */
  getNumberOfParticipationsByCountry(countryId?: number | null): Observable<number | null> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]): number | null => {
        const countryFound: Olympic | undefined = olympics.find((country: Olympic): boolean => country.id === countryId);

        return countryFound ? countryFound.participations.length : null;
      })
    );
  }

  /**
   * Gets the total number of medals won by a specific country.
   * @param {number | null} countryId - The ID of the country.
   * @returns {Observable<number | null>} An observable containing the total medals or null if not found.
   */
  getTotalMedalsByCountry(countryId?: number | null): Observable<number | null> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]): number | null => {
        const countryFound: Olympic | undefined = olympics.find((country: Olympic): boolean => country.id === countryId);

        return countryFound ? countryFound.participations.reduce(
          (sum: number, participation: Participation): number => sum + participation.medalsCount, 0
        ) : null;
      })
    );
  }

  /**
   * Gets the total number of athletes by a specific country.
   * @param {number | null} countryId - The ID of the country.
   * @returns {Observable<number | null>} An observable containing the total athletes or null if not found.
   */
  getTotalAthletesByCountry(countryId?: number | null): Observable<number | null> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]): number | null => {
        const countryFound: Olympic | undefined = olympics.find((country: Olympic): boolean => country.id === countryId);

        return countryFound ? countryFound.participations.reduce(
          (sum: number, participation: Participation): number => sum + participation.athleteCount, 0
        ) : null;
      })
    );
  }

  /**
   * Gets the medals won by a specific country in each participation.
   * @param {number | null} countryId - The ID of the country.
   * @returns {Observable<{ year: number, medalsCount: number }[] | null>} An observable containing the medals by year or null if not found.
   */
  getMedalsByCountryParticipations(countryId: number | null): Observable<{ year: number, medalsCount: number }[] | null> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]): { year: number, medalsCount: number }[] | null => {
        const countryFound: Olympic | undefined = olympics.find((country: Olympic): boolean => country.id === countryId);

        return countryFound ? [...countryFound.participations]
          .sort((a: Participation, b: Participation): number => a.year - b.year)
          .map((participation: Participation): { year: number, medalsCount: number } => ({
            year: participation.year,
            medalsCount: participation.medalsCount
          })) : null;
      })
    );
  }
}
