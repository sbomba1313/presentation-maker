import type { Presentation } from './types/presentation.js';
import type { Slide, Background } from './types/slide.js';
import type {
  TextObject,
  ImageObject,
  SlideObject,
} from './types/objects.js';

import {
  createPresentation,
  updatePresentationName,
  savePresentation,
  loadPresentation,
} from './functions/presentation.js';

import {
  addSlide,
  removeSlides,
  moveSlide,
  setActiveSlide,
  duplicateSlide,
  setSlideBackgroundColor,
  setSlideBackgroundImage,
  setSlideBackgroundGradient,
  clearSlideBackground,
} from './functions/slide.js';

import {
  addTextObject,
  addImageObject,
  removeObject,
  moveObject,
  resizeObject,
  updateTextObjectStyle,
} from './functions/objects.js';

export type {
  Presentation,
  Slide,
  Background,
  TextObject,
  ImageObject,
  SlideObject,
};

export {
  createPresentation,
  updatePresentationName,
  savePresentation,
  loadPresentation,
  addSlide,
  removeSlides,
  moveSlide,
  setActiveSlide,
  duplicateSlide,
  setSlideBackgroundColor,
  setSlideBackgroundImage,
  setSlideBackgroundGradient,
  clearSlideBackground,
  addTextObject,
  addImageObject,
  removeObject,
  moveObject,
  resizeObject,
  updateTextObjectStyle,
};