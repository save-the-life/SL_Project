import React from 'react';
import {
  CommandInput,
  Command,
  CommandList,
  Input,
} from '@/shared/components/ui';
import { IoChevronForwardOutline } from 'react-icons/io5';

import Icons from '@/shared/assets/icons';

const HospitalSearch: React.FC = () => {
  return (
    <div className="">
      <Command className="rounded-full bg-gray-200 px-2 ">
        <CommandInput
          placeholder="Type a command or search..."
          className="h-14 focus:border-b-black focus:border-b-2 focus:rounded-none   "
        />
        <CommandList></CommandList>
      </Command>
    </div>
  );
};

export default HospitalSearch;
