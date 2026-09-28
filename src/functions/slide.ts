import type { Presentation } from '../types/presentation.js';
import type { Slide } from '../types/slide.js';

function setSlideBackgroundColor(slide: Slide, color: string): Slide {
  return {
    ...slide,
    background: { type: 'color', color },
  };
}

function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {
  return {
    ...slide,
    background: { type: 'image', imageUrl },
  };
}

function setSlideBackgroundGradient(
  slide: Slide,
  colors: string[],
  angle: number = 0,
): Slide {
  return {
    ...slide,
    background: { type: 'gradient', colors, angle },
  };
}

function clearSlideBackground(slide: Slide): Slide {
  return {
    ...slide,
    background: { type: 'none' },
  };
}

function generateId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomPart}`;
}

function createDefaultSlide(slideName: string): Slide {
  return {
    id: generateId(),
    name: slideName,
    background: { type: 'none' },
    objects: [],
  };
}

function addSlide(presentation: Presentation, slideName?: string): Presentation {
  const newSlide = createDefaultSlide(
    slideName || `Слайд ${presentation.slides.length + 1}`,
  );
  return {
    ...presentation,
    slides: [...presentation.slides, newSlide],
  };
}

function removeSlides(presentation: Presentation, slideIds: string[]): Presentation {
  const slides = presentation.slides.filter(
    (slide) => !slideIds.includes(slide.id),
  );
  const activeSlideId =
    presentation.activeSlideId && slideIds.includes(presentation.activeSlideId)
      ? slides.length > 0
        ? slides[0].id
        : null
      : presentation.activeSlideId;
  return {
    ...presentation,
    slides,
    activeSlideId,
  };
}

function moveSlide(
  presentation: Presentation,
  slideId: string,
  newIndex: number,
): Presentation {
  const currentIndex = presentation.slides.findIndex((s) => s.id === slideId);
  if (currentIndex === -1) {
    return presentation;
  }
  const clampedIndex = Math.max(
    0,
    Math.min(newIndex, presentation.slides.length - 1),
  );
  const slides = [...presentation.slides];
  const [moved] = slides.splice(currentIndex, 1);
  slides.splice(clampedIndex, 0, moved);
  return {
    ...presentation,
    slides,
  };
}

function setActiveSlide(presentation: Presentation, slideId: string): Presentation {
  const exists = presentation.slides.some((s) => s.id === slideId);
  if (!exists) {
    return presentation;
  }
  return {
    ...presentation,
    activeSlideId: slideId,
  };
}

function duplicateSlide(presentation: Presentation, slideId: string): Presentation {
  const index = presentation.slides.findIndex((s) => s.id === slideId);
  if (index === -1) {
    return presentation;
  }
  const original = presentation.slides[index];
  const copy: Slide = {
    ...original,
    id: generateId(),
    name: `${original.name} (копия)`,
    objects: original.objects.map((obj) => ({ ...obj, id: generateId() })),
  };
  const slides = [...presentation.slides];
  slides.splice(index + 1, 0, copy);
  return {
    ...presentation,
    slides,
  };
}

export {
  setSlideBackgroundColor,
  setSlideBackgroundImage,
  setSlideBackgroundGradient,
  clearSlideBackground,
  addSlide,
  removeSlides,
  moveSlide,
  setActiveSlide,
  duplicateSlide,
};