import { describe, it, expect } from 'vitest';
import { createPresentation } from '../functions/presentation.js';
import {
  addTextObject,
  addImageObject,
  removeObject,
  moveObject,
  resizeObject,
  updateTextObjectStyle,
} from '../functions/objects.js';
import type { TextObject, ImageObject } from '../types/objects.js';

function baseSlide() {
  return createPresentation('P').slides[0];
}

describe('addTextObject', () => {
  it('добавляет текстовый объект с заданными параметрами', () => {
    const slide = baseSlide();
    const updated = addTextObject(
      slide,
      'Привет',
      10,
      20,
      100,
      50,
      'Arial',
      16,
      '#000000',
    );
    expect(updated.objects.length).toBe(1);
    const obj = updated.objects[0] as TextObject;
    expect(obj.type).toBe('text');
    expect(obj.content).toBe('Привет');
    expect(obj.x).toBe(10);
    expect(obj.y).toBe(20);
    expect(obj.width).toBe(100);
    expect(obj.height).toBe(50);
    expect(obj.fontFamily).toBe('Arial');
    expect(obj.fontSize).toBe(16);
    expect(obj.fontColor).toBe('#000000');
    expect(slide.objects.length).toBe(0); // иммутабельность
  });
});

describe('addImageObject', () => {
  it('добавляет изображение', () => {
    const slide = baseSlide();
    const updated = addImageObject(slide, 'pic.png', 5, 6, 200, 150);
    expect(updated.objects.length).toBe(1);
    const obj = updated.objects[0] as ImageObject;
    expect(obj.type).toBe('image');
    expect(obj.imageUrl).toBe('pic.png');
    expect(obj.width).toBe(200);
    expect(obj.height).toBe(150);
    expect(slide.objects.length).toBe(0);
  });
});

describe('moveObject', () => {
  it('перемещает объект, не мутируя исходный', () => {
    let slide = baseSlide();
    slide = addTextObject(slide, 'T', 0, 0, 10, 10, 'Arial', 12, '#000');
    const id = slide.objects[0].id;
    const updated = moveObject(slide, id, 50, 60);
    expect(updated.objects[0].x).toBe(50);
    expect(updated.objects[0].y).toBe(60);
    expect(slide.objects[0].x).toBe(0); // иммутабельность
  });
});

describe('resizeObject', () => {
  it('изменяет размеры объекта', () => {
    let slide = baseSlide();
    slide = addImageObject(slide, 'a.png', 0, 0, 10, 10);
    const id = slide.objects[0].id;
    const updated = resizeObject(slide, id, 300, 200);
    expect(updated.objects[0].width).toBe(300);
    expect(updated.objects[0].height).toBe(200);
    expect(slide.objects[0].width).toBe(10);
  });
});

describe('updateTextObjectStyle', () => {
  it('меняет стиль текста', () => {
    let slide = baseSlide();
    slide = addTextObject(slide, 'T', 0, 0, 10, 10, 'Arial', 12, '#000');
    const id = slide.objects[0].id;
    const updated = updateTextObjectStyle(
      slide,
      id,
      'Roboto',
      20,
      '#ff0000',
    );
    const obj = updated.objects[0] as TextObject;
    expect(obj.fontFamily).toBe('Roboto');
    expect(obj.fontSize).toBe(20);
    expect(obj.fontColor).toBe('#ff0000');
    expect((slide.objects[0] as TextObject).fontFamily).toBe('Arial');
  });

  it('не меняет нетекстовые объекты', () => {
    let slide = baseSlide();
    slide = addImageObject(slide, 'a.png', 0, 0, 10, 10);
    const id = slide.objects[0].id;
    const updated = updateTextObjectStyle(
      slide,
      id,
      'Roboto',
      20,
      '#ff0000',
    );
    expect(updated.objects[0]).toEqual(slide.objects[0]);
  });
});

describe('removeObject', () => {
  it('удаляет объект по id, не мутируя исходный слайд', () => {
    let slide = baseSlide();
    slide = addTextObject(slide, 'A', 0, 0, 10, 10, 'Arial', 12, '#000');
    slide = addTextObject(slide, 'B', 0, 0, 10, 10, 'Arial', 12, '#000');
    const idToRemove = slide.objects[0].id;
    const updated = removeObject(slide, idToRemove);
    expect(updated.objects.length).toBe(1);
    expect(updated.objects[0].id).not.toBe(idToRemove);
    expect(slide.objects.length).toBe(2); // иммутабельность
  });
});