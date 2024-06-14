import React from 'react';
import {
  Card,
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/shared/components/ui';
import Imgs from '@/shared/assets/images';
import Typography from '@/shared/components/typography';
import Autoplay from 'embla-carousel-autoplay';

const NotificationCarousel: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: 'start', loop: true }}
      plugins={[plugin.current]}
    >
      <CarouselContent>
        <CarouselItem>
          <Card className="rounded-3xl">
            <div className="flex items-center p-4">
              <div className="ml-4 flex-1">
                <Typography.Large>Update Notification</Typography.Large>
                <Typography.Muted>
                  We have completed the update to ensure a stable service. Enjoy
                  the improved experience!
                </Typography.Muted>
              </div>
              <div className="flex flex-col">
                <img
                  src={Imgs.Loudspeaker}
                  alt="Notification"
                  className="mx-auto w-24 md:w-32"
                />
                <div
                  className="text-white text-sm px-3 rounded-full text-center w-16 self-end"
                  style={{ backgroundColor: 'rgba(115,115,115,0.8)' }}
                >
                  {current} / <span className="opacity-50">{count}</span>
                </div>
              </div>
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="rounded-3xl">
            <div className="flex items-center p-4">
              <div className="ml-4 flex-1">
                <Typography.Large>Update Notification</Typography.Large>
                <Typography.Muted>
                  We have completed the update to ensure a stable service. Enjoy
                  the improved experience!
                </Typography.Muted>
              </div>
              <div className="flex flex-col">
                <img
                  src={Imgs.Loudspeaker}
                  alt="Notification"
                  className="mx-auto w-24 md:w-32"
                />
                <div
                  className="text-white text-sm px-3 rounded-full text-center w-16 self-end"
                  style={{ backgroundColor: 'rgba(115,115,115,0.8)' }}
                >
                  {current} / <span className="opacity-50">{count}</span>
                </div>
              </div>
            </div>
          </Card>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default NotificationCarousel;
