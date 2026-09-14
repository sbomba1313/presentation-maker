import type { Slide, Background } from '.././types/slide';
import type { Presentation } from '.././types/presentation';

function addSlide(presentation: Presentation, slideName?: string): Presentation {

}

function removeSlides(presentation: Presentation, slideIds: string[]): Presentation {
    
} 

function moveSlide(presentation: Presentation, slideId: string, newIndex: number): Presentation {
    
}

function setActiveSlide(presentation: Presentation, slideId: string): Presentation {

}

function duplicateSlide(presentation: Presentation, slideId: string): Presentation {

} 

function setSlideBackgroundColor(slide: Slide, color: string): Slide {

} 

function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {

}

function setSlideBackgroundGradient(slide: Slide, colors: string[], angle?: number): Slide {

}

function clearSlideBackground(slide: Slide): Slide {

}
