import { describe, it, expect } from 'vitest';
import { createPresentation } from '../functions/presentation.js';
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
} from '../functions/slide.js';

function makePresentationWithSlides(count: number) {
  let p = createPresentation('P');
  for (let i = 1; i < count; i++) {
    p = addSlide(p, `Слайд ${i + 1}`);
  }
  return p;
}

describe('removeSlides', () => {
  it('удаляет один слайд', () => {
    const p = makePresentationWithSlides(3);
    const idToRemove = p.slides[1].id;
    const updated = removeSlides(p, [idToRemove]);
    expect(updated.slides.length).toBe(2);
    expect(updated.slides.find((s) => s.id === idToRemove)).toBeUndefined();
    expect(p.slides.length).toBe(3); // иммутабельность
  });

  it('удаляет несколько слайдов', () => {
    const p = makePresentationWithSlides(4);
    const ids = [p.slides[0].id, p.slides[2].id];
    const updated = removeSlides(p, ids);
    expect(updated.slides.length).toBe(2);
    expect(updated.slides.every((s) => !ids.includes(s.id))).toBe(true);
  });

  it('переключает активный слайд, если он удалён', () => {
    const p = makePresentationWithSlides(3);
    const activeId = p.activeSlideId!;
    const updated = removeSlides(p, [activeId]);
    expect(updated.activeSlideId).not.toBe(activeId);
    expect(updated.activeSlideId).toBe(updated.slides[0].id);
  });

  it('ставит activeSlideId = null, если удалены все слайды', () => {
    const p = makePresentationWithSlides(2);
    const ids = p.slides.map((s) => s.id);
    const updated = removeSlides(p, ids);
    expect(updated.slides.length).toBe(0);
    expect(updated.activeSlideId).toBeNull();
  });
});

describe('moveSlide', () => {
  it('перемещает слайд в начало', () => {
    const p = makePresentationWithSlides(3);
    const lastId = p.slides[2].id;
    const updated = moveSlide(p, lastId, 0);
    expect(updated.slides[0].id).toBe(lastId);
    expect(p.slides[0].id).not.toBe(lastId); // иммутабельность
  });

  it('перемещает слайд в конец', () => {
    const p = makePresentationWithSlides(3);
    const firstId = p.slides[0].id;
    const updated = moveSlide(p, firstId, 2);
    expect(updated.slides[2].id).toBe(firstId);
  });

  it('перемещает слайд в середину', () => {
    const p = makePresentationWithSlides(4);
    const firstId = p.slides[0].id;
    const updated = moveSlide(p, firstId, 2);
    expect(updated.slides[2].id).toBe(firstId);
    expect(updated.slides.length).toBe(4);
  });

  it('возвращает исходную презентацию при неизвестном id', () => {
    const p = makePresentationWithSlides(2);
    const updated = moveSlide(p, 'unknown', 0);
    expect(updated).toBe(p);
  });
});

describe('setActiveSlide', () => {
  it('устанавливает активный слайд', () => {
    const p = makePresentationWithSlides(3);
    const targetId = p.slides[1].id;
    const updated = setActiveSlide(p, targetId);
    expect(updated.activeSlideId).toBe(targetId);
    expect(p.activeSlideId).not.toBe(targetId); // иммутабельность
  });

  it('игнорирует неизвестный id', () => {
    const p = makePresentationWithSlides(2);
    const updated = setActiveSlide(p, 'unknown');
    expect(updated).toBe(p);
  });
});

describe('duplicateSlide', () => {
  it('дублирует слайд после оригинала с новыми id', () => {
    const p = makePresentationWithSlides(2);
    const original = p.slides[0];
    const updated = duplicateSlide(p, original.id);
    expect(updated.slides.length).toBe(3);
    expect(updated.slides[1].name).toBe(`${original.name} (копия)`);
    expect(updated.slides[1].id).not.toBe(original.id);
    expect(p.slides.length).toBe(2); // иммутабельность
  });
});

describe('setSlideBackgroundColor', () => {
  it('устанавливает цвет фона и не мутирует слайд', () => {
    const slide = createPresentation('P').slides[0];
    const updated = setSlideBackgroundColor(slide, '#ff0000');
    expect(updated.background).toEqual({ type: 'color', color: '#ff0000' });
    expect(slide.background).toEqual({ type: 'none' });
    expect(updated).not.toBe(slide);
  });
});

describe('setSlideBackgroundImage / setSlideBackgroundGradient', () => {
  it('устанавливает изображение', () => {
    const slide = createPresentation('P').slides[0];
    const updated = setSlideBackgroundImage(slide, 'img.png');
    expect(updated.background).toEqual({ type: 'image', imageUrl: 'img.png' });
  });

  it('устанавливает градиент с углом по умолчанию', () => {
    const slide = createPresentation('P').slides[0];
    const updated = setSlideBackgroundGradient(slide, ['#fff', '#000']);
    expect(updated.background).toEqual({
      type: 'gradient',
      colors: ['#fff', '#000'],
      angle: 0,
    });
  });
});

describe('clearSlideBackground', () => {
  it('сбрасывает фон в none', () => {
    const slide = createPresentation('P').slides[0];
    const withColor = setSlideBackgroundColor(slide, 'red');
    const cleared = clearSlideBackground(withColor);
    expect(cleared.background).toEqual({ type: 'none' });
    expect(withColor.background).toEqual({ type: 'color', color: 'red' });
  });
});