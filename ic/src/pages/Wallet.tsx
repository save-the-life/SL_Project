import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui';
import Typography from '@/shared/components/typography';
import { BiBell, BiTransferAlt } from 'react-icons/bi';
import EthImage from '@/shared/assets/eth.svg';
import {
  IoChevronDownOutline,
  IoArrowUpOutline,
  IoArrowDownOutline,
} from 'react-icons/io5';

const transactions = [
  {
    type: 'Sent',
    amount: '2 SL',
    date: 'June 11, 2024',
    status: '- 0.5 SL',
  },
  {
    type: 'Received',
    amount: '2 SL',
    date: 'June 11, 2024',
    status: '+ 0.5 SL',
  },
  {
    type: 'Received',
    amount: '2 SL',
    date: 'June 11, 2024',
    status: '+ 0.5 SL',
  },
];

const Wallet: React.FC = () => {
  const navigate = useNavigate();

  const handleTransactionClick = (id: number) => {
    // Add functionality to handle transaction click if needed
  };

  return (
    <div className="">
      <header className="p-4 h-[304px] rounded-b-3xl bg-gradient-to-br from-[#0C4FE7] to-[#7AA3FF] text-white text-center">
        <div className="flex flex-row items-center justify-between">
          <div className=" flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Typography.Large>Nick Jo</Typography.Large>
          </div>
          <BiBell className="w-6 h-6" />
        </div>
        {/**token balance, */}

        <div className="flex flex-col mt-6 gap-4">
          <Typography.P>Token Balance</Typography.P>
          <Typography.H1>1200 SL</Typography.H1>
          <div className="flex flex-row items-center justify-center gap-4">
            {' '}
            <img src={EthImage} alt="EthImage" className=" w-5 h-5" />
            <p>Ethereum</p>
            <IoChevronDownOutline className="w-4 h-4" />
          </div>
        </div>
      </header>
      <Card className=" absolute top-[244px] bg-white rounded-3xl p-4 h-[120px] left-1/2 transform -translate-x-1/2 w-11/12 ">
        <div className="flex justify-evenly items-center h-full">
          <div className="flex flex-col justify-center items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full flex flex-col items-center w-12 h-12"
            >
              <IoArrowDownOutline className="w-6 h-6" />
            </Button>
            Receive
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full flex flex-col items-center w-12 h-12"
            >
              <IoArrowUpOutline className="w-6 h-6" />
            </Button>
            Send
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full flex flex-col items-center w-12 h-12"
            >
              <BiTransferAlt className="w-6 h-6" />
            </Button>
            Staking
          </div>
        </div>
      </Card>

      <div className="p-4 mt-12">
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <Typography.H4>Transaction</Typography.H4>
            <Typography.Muted
              className="cursor-pointer"
              onClick={() => navigate('/transactions')}
            >
              View All
            </Typography.Muted>
          </div>
          <div className="space-y-4 mt-4">
            {transactions.map((transaction, index) => (
              <Card
                key={index}
                className="p-4 rounded-3xl"
                onClick={() => handleTransactionClick(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Button
                      size={'icon'}
                      className={` rounded-full bg-opacity-10 ${
                        transaction.type === 'Sent'
                          ? '  bg-red-600 '
                          : ' bg-blue-700'
                      }`}
                    >
                      <IoArrowDownOutline
                        className={`w-6 h-6 ${
                          transaction.type === 'Sent'
                            ? 'rotate-180 text-red-600'
                            : ' text-blue-700'
                        }`}
                      />
                    </Button>
                    <div className="ml-4">
                      <Typography.Large>
                        {transaction.type} {transaction.amount}
                      </Typography.Large>
                      <Typography.Muted>{transaction.date}</Typography.Muted>
                    </div>
                  </div>
                  <Typography.Large
                    className={
                      transaction.type === 'Sent'
                        ? ' text-red-600'
                        : ' text-blue-700'
                    }
                  >
                    {transaction.status}
                  </Typography.Large>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
