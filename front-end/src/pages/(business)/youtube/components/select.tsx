import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { YoutubeDownloadTypeEnum } from "@/types";

type SelectDropdownProps = {
  selectedType: YoutubeDownloadTypeEnum;
  setSelectedType: React.Dispatch<
    React.SetStateAction<YoutubeDownloadTypeEnum>
  >;
};

const options = [
  { type: YoutubeDownloadTypeEnum.MP3 },
  { type: YoutubeDownloadTypeEnum.MP4 },
  { type: YoutubeDownloadTypeEnum.MP4_144p },
  { type: YoutubeDownloadTypeEnum.MP4_240p },
  { type: YoutubeDownloadTypeEnum.MP4_360p },
  { type: YoutubeDownloadTypeEnum.MP4_480p },
  { type: YoutubeDownloadTypeEnum.MP4_720p },
  { type: YoutubeDownloadTypeEnum.MP4_1080p },
];

const SelectDropdown = ({
  selectedType,
  setSelectedType,
}: SelectDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="whitespace-nowrap">
        {selectedType}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuItem
            key={option.type}
            onClick={() => setSelectedType(option.type)}
          >
            {option.type}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectDropdown;
