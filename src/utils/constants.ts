/* eslint-disable @typescript-eslint/naming-convention */

// Define all the errors messages here
export enum DefaultError {
  NO_TEXT = 'No text selected! 😲',
  UNKNOWN_ERROR = 'Unknown error! 😱',
  UNKNOWN_LANGUAGE = 'Unknown Language',
}

export interface Snippet {
  prefix: string;
  description: string;
  body: string[];
}
