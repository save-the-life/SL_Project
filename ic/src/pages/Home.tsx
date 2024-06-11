import React from 'react';
import { AiOutlineNotification } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
import { Card, Button } from '@/shared/components/ui';

const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-b from-blue-500 to-blue-700 text-white rounded-b-3xl">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold">SAVE THE LIFE</h1>
          <p className="text-lg mt-2">Token Balance</p>
          <p className="text-4xl font-bold mt-1">30 SL</p>
        </div>
      </Card>

      <div className="p-4">
        <Card className="bg-white shadow-md rounded-lg">
          <div className="flex items-center p-4">
            <AiOutlineNotification className="text-blue-500 w-10 h-10" />
            <div className="ml-4 flex-1">
              <h2 className="font-bold text-lg">Update Notification</h2>
              <p>
                We have completed the update to ensure a stable service. Enjoy
                the improved experience!
              </p>
            </div>
            <div className="text-gray-400 text-sm">1/3</div>
          </div>
        </Card>

        <Button className="bg-black text-white w-full py-4 mt-4 flex items-center justify-center">
          <AiOutlineNotification className="mr-2 w-5 h-5" />
          Get Medical Imaging
        </Button>

        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Diagnosis</h2>
            <Button variant="link" className="text-gray-500 flex items-center">
              View All <BiChevronRight />
            </Button>
          </div>

          <div className="mt-4 space-y-4">
            <Card className="bg-white shadow-md rounded-lg flex items-center p-4">
              <img
                src="path_to_image"
                alt="Diagnosis"
                className="w-16 h-16 rounded-md"
              />
              <div className="ml-4">
                <h3 className="font-bold">
                  A Hospital{' '}
                  <span className="text-sm text-gray-500">Chest X-Ray</span>
                </h3>
                <p className="text-sm text-gray-500">
                  Diagnosed on May 15, 2023
                </p>
                <p className="text-sm text-gray-500">
                  Symptoms: Cough, Fever, Difficulty Breathing
                </p>
              </div>
            </Card>
            <Card className="bg-white shadow-md rounded-lg flex items-center p-4">
              <img
                src="path_to_image"
                alt="Diagnosis"
                className="w-16 h-16 rounded-md"
              />
              <div className="ml-4">
                <h3 className="font-bold">
                  B Hospital{' '}
                  <span className="text-sm text-gray-500">Chest X-Ray</span>
                </h3>
                <p className="text-sm text-gray-500">
                  Diagnosed on May 15, 2023
                </p>
                <p className="text-sm text-gray-500">
                  Symptoms: Cough, Fever, Difficulty Breathing
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
