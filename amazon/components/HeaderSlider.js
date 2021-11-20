import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function HeaderSlider({ items }) {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
        interval={5000}
      >
        {items.map((item, index) => {
          return (
            <div key={item.id} className="cursor-pointer">
              <img
                loading="lazy"
                src={item.src}
                alt={`Carousel Item ${index}`}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
