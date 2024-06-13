import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { Card, Button } from '@/shared/components/ui';
import Imgs from '@/shared/assets/images';
import Typography from '@/shared/components/typography';

const RecentDiagnosis: React.FC = () => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <Typography.H3>Recent Diagnosis</Typography.H3>
        <Button variant="link" className="text-gray-500 flex items-center">
          View All <IoChevronForwardOutline />
        </Button>
      </div>

      <div className="mt-2 space-y-4">
        <Card className="rounded-3xl flex flex-row items-center p-4 justify-between py-6">
          <div className="flex flex-col gap-3 md:gap-4 flex-1 min-w-0">
            <div className="flex flex-row gap-3 md:gap-4 items-center min-w-0">
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
                  <Typography.Muted>Patient Name: John Legend</Typography.Muted>
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
                Date of Examination: May 15, 2024 Not Uploaded AI Not Available
              </Typography.Muted>
            </div>
          </div>
          <IoChevronForwardOutline className="w-6 h-6 md:w-8 md:h-8" />
        </Card>
        <Card className="rounded-3xl flex flex-row items-center p-4 justify-between py-6">
          <div className="flex flex-col gap-3 md:gap-4 flex-1 min-w-0">
            <div className="flex flex-row gap-3 md:gap-4 items-center min-w-0">
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
                  <Typography.Muted>Patient Name: John Legend</Typography.Muted>
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
                Date of Examination: May 15, 2024 Not Uploaded AI Not Available
              </Typography.Muted>
            </div>
          </div>
          <IoChevronForwardOutline className="w-6 h-6 md:w-8 md:h-8" />
        </Card>
      </div>
    </div>
  );
};

export default RecentDiagnosis;
