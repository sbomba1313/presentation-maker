import type { Slide } from '.././types/slide';

type Presentation = {
  id: string;
  name: string;
  slides: Slide[];
  activeSlideId: string;
}

export type {Presentation};