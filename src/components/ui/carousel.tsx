"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { TPropertyPhoto } from "../types";
import PropertyPhotos from "../merchant/properties/property-photos";

const Carousel = ({
  className = " min-w-64 min-h-48  max-h-48 ",
  photo,
  play,
}: {
  className?: string;
  photo: TPropertyPhoto[];
  play?: boolean;
}) => {
  const plugins = [];
  if (play) {
    plugins.push(Autoplay({ delay: 2000 }));
  }

  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, plugins);

  return (
    <div className="overflow-hidden w-10/12 mx-auto mb-3" ref={emblaRef}>
      <div className="flex -ml-2">
        {photo.map((img, id) => (
          <div
            className={`shrink-0 grow-0 basis-1/2 pl-2 ${className}`}
            key={id}
          >
            <PropertyPhotos field={img} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
