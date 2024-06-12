import React from 'react';
import { AiOutlineNotification } from 'react-icons/ai';
import { IoChevronForwardOutline } from 'react-icons/io5';
import {
  Card,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/shared/components/ui';
import { HiDownload } from 'react-icons/hi';
import Imgs from '@/shared/assets/images';
import Typography from '@/shared/components/typography';

const Home: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-b from-blue-500 to-blue-700 text-white rounded-b-3xl rounded-t-none">
        <div className="p-6 text-center">
          <img
            src={Imgs.HorizontalLogo}
            alt={'HorizontalLogo'}
            className="h-5 md:h-6 mx-auto"
          />
          <Typography.P>Token Balance</Typography.P>
          <Typography.H1>30 SL</Typography.H1>
        </div>
      </Card>

      <div className="p-4 pt-0">
        <Carousel setApi={setApi} opts={{ align: 'start', loop: true }}>
          <CarouselContent>
            <CarouselItem>
              <Card className=" rounded-3xl">
                <div className="flex items-center p-4">
                  <div className="ml-4 flex-1">
                    <Typography.Large>Update Notification</Typography.Large>
                    <Typography.Muted>
                      We have completed the update to ensure a stable service.
                      Enjoy the improved experience!
                    </Typography.Muted>
                  </div>
                  <div className=" flex flex-col">
                    <img
                      src={Imgs.Loudspeaker}
                      alt="Notification"
                      className=" mx-auto w-24 md:w-32 "
                    />
                    <div
                      className="text-white text-sm px-3 rounded-full text-center w-16 self-end"
                      style={{ backgroundColor: 'rgba(115,115,115,0.8)' }}
                    >
                      {current} / <span className=" opacity-50">{count}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className=" rounded-3xl">
                <div className="flex items-center p-4">
                  <div className="ml-4 flex-1">
                    <Typography.Large>Update Notification</Typography.Large>
                    <Typography.Muted>
                      We have completed the update to ensure a stable service.
                      Enjoy the improved experience!
                    </Typography.Muted>
                  </div>
                  <div className=" flex flex-col">
                    <img
                      src={Imgs.Loudspeaker}
                      alt="Notification"
                      className=" mx-auto w-24 md:w-32 "
                    />
                    <div
                      className="text-white text-sm px-3 rounded-full text-center w-16 self-end"
                      style={{ backgroundColor: 'rgba(115,115,115,0.8)' }}
                    >
                      {current} / <span className=" opacity-50">{count}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <Button className=" text-white w-full mt-4 flex items-center justify-center rounded-3xl py-6">
          <HiDownload className="mr-2 w-5 h-5" />
          Get Medical Imaging
        </Button>

        <div className="mt-6">
          <div className="flex justify-between items-center">
            <Typography.H3>Recent Diagnosis</Typography.H3>
            <Button variant="link" className="text-gray-500 flex items-center">
              View All <IoChevronForwardOutline />
            </Button>
          </div>

          <div className="mt-2 space-y-4">
            <Card className="rounded-3xl flex flex-row items-center gap-2 p-4 justify-between">
              <div className="flex flex-col gap-2 md:gap-4 flex-1 min-w-0">
                <div className="flex flex-row gap-2 md:gap-4 items-center min-w-0">
                  <img
                    src={Imgs.ChestXray}
                    alt="Diagnosis"
                    className="w-16 h-16 md:w-32 md:h-32 rounded-3xl"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-row items-center gap-2">
                      <Typography.H4>Chest X-ray</Typography.H4>
                      <Typography.Muted className="text-xs">
                        May 15, 2024
                      </Typography.Muted>
                    </div>
                    <Typography.Small>A Hospital</Typography.Small>
                    <div className="hidden md:block mt-2 truncate">
                      <Typography.Muted>
                        Patient Name: John Legend
                      </Typography.Muted>
                      <Typography.Muted>
                        Date of Examination: May 15, 2024 Not Uploaded AI Not
                        Available
                      </Typography.Muted>
                    </div>
                  </div>
                </div>
                <div className="md:hidden min-w-0">
                  <Typography.Muted className="truncate block">
                    Patient Name: John Legend
                  </Typography.Muted>
                  <Typography.Muted className="truncate block">
                    Date of Examination: May 15, 2024 Not Uploaded AI Not
                    Available
                  </Typography.Muted>
                </div>
              </div>
              <IoChevronForwardOutline className="w-8 h-8" />
            </Card>
            <Card className="rounded-3xl flex flex-row items-center gap-2 p-4 justify-between">
              <div className="flex flex-col gap-2 md:gap-4 flex-1 min-w-0">
                <div className="flex flex-row gap-2 md:gap-4 items-center min-w-0">
                  <img
                    src={Imgs.ChestXray}
                    alt="Diagnosis"
                    className="w-16 h-16 md:w-32 md:h-32 rounded-3xl"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-row items-center gap-2">
                      <Typography.H4>Chest X-ray</Typography.H4>
                      <Typography.Muted className="text-xs">
                        May 15, 2024
                      </Typography.Muted>
                    </div>
                    <Typography.Small>A Hospital</Typography.Small>
                    <div className="hidden md:block mt-2 truncate">
                      <Typography.Muted>
                        Patient Name: John Legend
                      </Typography.Muted>
                      <Typography.Muted>
                        Date of Examination: May 15, 2024 Not Uploaded AI Not
                        Available
                      </Typography.Muted>
                    </div>
                  </div>
                </div>
                <div className="md:hidden min-w-0">
                  <Typography.Muted className="truncate block">
                    Patient Name: John Legend
                  </Typography.Muted>
                  <Typography.Muted className="truncate block">
                    Date of Examination: May 15, 2024 Not Uploaded AI Not
                    Available
                  </Typography.Muted>
                </div>
              </div>
              <IoChevronForwardOutline className="w-8 h-8" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
