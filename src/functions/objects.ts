import type { Slide } from '../types/slide.js';
import type {
  TextObject,
  ImageObject,
  SlideObject,
} from '../types/objects.js';

function generateId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomPart}`;
}

function addTextObject(
  slide: Slide,
  content: string,
  x: number,
  y: number,
  width: number,
  height: number,
  fontFamily: string,
  fontSize: number,
  fontColor: string,
): Slide {
  const textObject: TextObject = {
    id: generateId(),
    type: 'text',
    content,
    x,
    y,
    width,
    height,
    fontFamily,
    fontSize,
    fontColor,
  };
  return {
    ...slide,
    objects: [...slide.objects, textObject],
  };
}

function addImageObject(
  slide: Slide,
  imageUrl: string,
  x: number,
  y: number,
  width: number,
  height: number,
): Slide {
  const imageObject: ImageObject = {
    id: generateId(),
    type: 'image',
    imageUrl,
    x,
    y,
    width,
    height,
  };
  return {
    ...slide,
    objects: [...slide.objects, imageObject],
  };
}

function removeObject(slide: Slide, objectId: string): Slide {
  return {
    ...slide,
    objects: slide.objects.filter((obj) => obj.id !== objectId),
  };
}

function moveObject(
  slide: Slide,
  objectId: string,
  newX: number,
  newY: number,
): Slide {
  return {
    ...slide,
    objects: slide.objects.map((obj) =>
      obj.id === objectId ? { ...obj, x: newX, y: newY } : obj,
    ),
  };
}

function resizeObject(
  slide: Slide,
  objectId: string,
  newWidth: number,
  newHeight: number,
): Slide {
  return {
    ...slide,
    objects: slide.objects.map((obj) =>
      obj.id === objectId
        ? { ...obj, width: newWidth, height: newHeight }
        : obj,
    ),
  };
}

function updateTextObjectStyle(
  slide: Slide,
  objectId: string,
  fontFamily: string,
  fontSize: number,
  fontColor: string,
): Slide {
  return {
    ...slide,
    objects: slide.objects.map((obj) => {
      if (obj.id === objectId && obj.type === 'text') {
        return { ...obj, fontFamily, fontSize, fontColor };
      }
      return obj;
    }),
  };
}

export {
  addTextObject,
  addImageObject,
  removeObject,
  moveObject,
  resizeObject,
  updateTextObjectStyle,
};