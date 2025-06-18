import "./HeroBlock.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const HeroBlock = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__wrapper">
          <Swiper
            breakpoints={{
              1800: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
            }}
            grabCursor={true}
          >
            <SwiperSlide>
              <div className="hero__slide hero__calc-calorie">
                <p className="hero__calorie-title">
                  Рассчитай свою норму калорий, для достижения поставленных
                  целей
                </p>
                <Link
                  to="/calorie-calculation"
                  className="link-reset btn-primary"
                >
                  Рассчитать
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="hero__slide hero__calc-calorie">
                <p className="hero__calorie-title">
                  "Калории под Контролем: Считайте и Достигайте Целей!"
                </p>
                <Link
                  to="/calorie-calculation"
                  className="link-reset btn-primary"
                >
                  Начать
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroBlock;
