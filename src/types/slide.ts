type Background = {
  
}

type Slide = {
  id: string;
  name: string;
  background: Background;
  objects: [];
}

export type {Slide, Background};