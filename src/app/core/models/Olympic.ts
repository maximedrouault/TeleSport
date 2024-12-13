import { Participation } from "./Participation";

/**
 * Represents an Olympic event.
 */
export class Olympic {

  /**
   * Creates an instance of Olympic.
   * @param {number} id - The unique identifier of the Olympic event.
   * @param {string} country - The country participating in the Olympic event.
   * @param {Participation[]} participations - The list of participations in the Olympic event.
   */
  constructor(
    public id: number,
    public country: string,
    public participations: Participation[]
  ) {}
}
