import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';
import {
  Card,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
} from '@/shared/components/ui';
import Typography from '@/shared/components/typography';
import SearchBar from '@/widgets/SearchBar';

const images = [
  {
    type: 'Chest X-Ray',
    date: 'May 15, 2024',
    hospital: 'A Hospital',
    imageUrl:
      'https://images.unsplash.com/photo-1631651363531-fd29aec4cb5c?q=80&w=2876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    uploaded: false,
    secondaryOpinion: false,
  },
  {
    type: 'Chest X-Ray',
    date: 'May 15, 2024',
    hospital: 'A Hospital',
    imageUrl:
      'https://images.unsplash.com/photo-1631651363531-fd29aec4cb5c?q=80&w=2876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    uploaded: true,
    secondaryOpinion: false,
  },
  {
    type: 'Chest X-Ray',
    date: 'May 15, 2024',
    hospital: 'A Hospital',
    imageUrl:
      'https://images.unsplash.com/photo-1631651363531-fd29aec4cb5c?q=80&w=2876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    uploaded: true,
    secondaryOpinion: true,
  },
];

const Images: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <header className="flex items-center justify-center">
        <Typography.H3 className="text-center">Manage images</Typography.H3>
      </header>
      <SearchBar placeholder="Search for a hospital..." />
      <div className="flex gap-2 my-4">
        <div className="inline-block">
          <Select>
            <SelectTrigger className="w-[140px] rounded-full">
              <SelectValue placeholder="Image Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="X-Ray">X-Ray</SelectItem>
              <SelectItem value="CT">CT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="inline-block">
          <Select>
            <SelectTrigger className="w-[160px] rounded-full">
              <SelectValue placeholder="Upload Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="uploaded">Uploaded</SelectItem>
              <SelectItem value="not_uploaded">Not Uploaded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        {images.map((image, index) => (
          <Card key={index} className="p-4 rounded-3xl">
            <div className="flex flex-row items-center justify-between border-b pb-4">
              <div className="flex-1">
                <div className="flex items-center">
                  <img
                    src={image.imageUrl}
                    alt="Image"
                    className="w-16 h-16 rounded-lg"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row gap-2 items-center">
                        <Typography.H4>{image.type}</Typography.H4>
                        <Typography.Muted className="text-xs">
                          {image.date}
                        </Typography.Muted>
                      </div>
                      <Typography.Small>{image.hospital}</Typography.Small>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-2 mt-2">
                  <Badge variant={image.uploaded ? 'default' : 'secondary'}>
                    {image.uploaded ? 'Uploaded' : 'Not Uploaded'}
                  </Badge>
                  <Badge
                    variant={image.secondaryOpinion ? 'default' : 'secondary'}
                  >
                    {image.secondaryOpinion
                      ? 'Secondary Opinion Present'
                      : 'No Secondary Opinion'}
                  </Badge>
                </div>
              </div>
              <IoChevronForwardOutline className="w-6 h-6" />
            </div>
            <Button className="w-full mt-4 rounded-full h-14">
              {image.uploaded
                ? 'Request Secondary Opinion'
                : 'Upload Medical Imaging'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Images;
