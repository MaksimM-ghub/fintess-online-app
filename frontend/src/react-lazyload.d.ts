declare module 'react-lazyload' {
    import React from 'react';
  
    export interface LazyLoadProps {
      once?: boolean; // Компонент будет загружен только один раз
      height?: number | string; // Высота LazyLoad контейнера
      offset?: number | number[]; // Смещение (для добавочной загрузки до видимости элемента)
      overflow?: boolean; // Будет ли слушаться события overflow
      resize?: boolean; // Если нужно слушать resize события
      scroll?: boolean; // Если нужно слушать scroll события
      throttle?: boolean | number; // Throttle задержка
      debounce?: boolean | number; // Debounce задержка
      placeholder?: React.ReactNode; // Заглушка во время ленивой загрузки
      unmountIfInvisible?: boolean; // Удалить узел из DOM, если он невидим
      children?: React.ReactNode; // Дочерние элементы
      scrollContainer?: string | HTMLElement; // Контейнер, в пределах которого отслеживается прокрутка
      className?: string; // Классы
      style?: React.CSSProperties; // Inline стили
    }
  
    export default class LazyLoad extends React.Component<LazyLoadProps> {}
  }
  