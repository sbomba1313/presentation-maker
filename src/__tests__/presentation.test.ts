import { describe, it, expect } from 'vitest';
import {
  createPresentation,
  updatePresentationName,
  savePresentation,
  loadPresentation,
} from '../functions/presentation.js';
import { addSlide } from '../functions/slide.js';

describe('createPresentation', () => {
  it('создаёт презентацию с одним слайдом по умолчанию', () => {
    const p = createPresentation('Моя презентация');
    expect(p.name).toBe('Моя презентация');
    expect(p.slides.length).toBe(1);
    expect(p.slides[0].name).toBe('Слайд 1');
    expect(p.slides[0].background).toEqual({ type: 'none' });
    expect(p.slides[0].objects).toEqual([]);
    expect(p.activeSlideId).toBe(p.slides[0].id);
    expect(typeof p.id).toBe('string');
  });

  it('генерирует уникальные id', () => {
    const a = createPresentation('A');
    const b = createPresentation('B');
    expect(a.id).not.toBe(b.id);
  });
});

describe('updatePresentationName', () => {
  it('меняет название и не мутирует исходный объект', () => {
    const p = createPresentation('Старое');
    const updated = updatePresentationName(p, 'Новое');
    expect(updated.name).toBe('Новое');
    expect(p.name).toBe('Старое');
    expect(updated).not.toBe(p);
  });
});

describe('savePresentation / loadPresentation', () => {
  it('сериализует и десериализует презентацию', () => {
    const p = createPresentation('Тест');
    const json = savePresentation(p);
    expect(typeof json).toBe('string');
    const loaded = loadPresentation(json);
    expect(loaded).toEqual(p);
  });
});

describe('addSlide', () => {
  it('добавляет слайд с указанным именем', () => {
    const p = createPresentation('P');
    const updated = addSlide(p, 'Второй');
    expect(updated.slides.length).toBe(2);
    expect(updated.slides[1].name).toBe('Второй');
    expect(p.slides.length).toBe(1); // иммутабельность
  });

  it('генерирует имя автоматически', () => {
    const p = createPresentation('P');
    const updated = addSlide(p);
    expect(updated.slides[1].name).toBe('Слайд 2');
  });

  it('активный слайд по умолчанию остаётся первым', () => {
    const p = createPresentation('P');
    const updated = addSlide(p);
    expect(updated.activeSlideId).toBe(updated.slides[0].id);
  });
});