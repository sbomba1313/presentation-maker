import type { Presentation } from '.././types/presentation';
import type { Slide, Background } from '.././types/slide';

//рандомит айди
function generateId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomPart}`;
}
//создает дефолтный слайд
function createDefaultSlide(): Slide {
  return {
    id: generateId(),
    name: 'Слайд 1',
    background: { type: 'none' },
    objects: [],
  };
}
//создать презентацию
function createPresentation(name: string): Presentation {
  const defaultSlide = createDefaultSlide();
  return {
    id: generateId(),
    name,
    slides: [defaultSlide],
    activeSlideId: defaultSlide.id,
  };
}
//новое имя презентации
function updatePresentationName(presentation: Presentation, name: string): Presentation {
  return {
    ...presentation,
    name,
  };
}
//сохранить презентацию
function savePresentation(presentation: Presentation): string {
  return JSON.stringify(presentation, null, 2);
}
//загрузить презентацию
function loadPresentation(json: string): Presentation {
  return JSON.parse(json) as Presentation;
}

export {
  createPresentation,
  updatePresentationName,
  savePresentation,
  loadPresentation,
};