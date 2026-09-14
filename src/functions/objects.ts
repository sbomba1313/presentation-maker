import type { TextObject, ImageObject } from '.././types/objects';
import type { Slide } from '.././types/slide';
//добавить текст
function addTextObject(slide: Slide, content: string, x: number, y: number, width: number, height: number, fontFamily: string, fontSize: number, fontColor: string): Slide {

}
//добавить фото
function addImageObject(slide: Slide, imageUrl: string, x: number, y: number, width: number, height: number): Slide {

}
//удалить объект
function removeObject(slide: Slide, objectId: string): Slide {

}
//переместить объект
function moveObject(slide: Slide, objectId: string, newX: number, newY: number): Slide {

}

function resizeObject(slide: Slide, objectId: string, newWidth: number, newHeight: number): Slide {

}

function updateTextObjectStyle(slide: Slide, objectId: string, fontFamily: string, fontSize: number, fontColor: string): Slide {

}
