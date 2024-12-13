/**
 * Represents a participation in the Olympic Games.
 */
export class Participation {

  /**
   * Creates an instance of Participation.
   * @param {number} id - The unique identifier of the participation.
   * @param {number} year - The year of the participation.
   * @param {string} city - The city where the participation took place.
   * @param {number} medalsCount - The number of medals won during the participation.
   * @param {number} athleteCount - The number of athletes who participated.
   */
  constructor(
    public id: number,
    public year: number,
    public city: string,
    public medalsCount: number,
    public athleteCount: number
  ) {}
}
