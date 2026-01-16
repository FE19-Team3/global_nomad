import Image from 'next/image';

import Text from './Text';

interface Props {
  text: string;
}

const NoData = ({ text }: Props) => {
  return (
    <div className="w-fit h-fit flex flex-col justify-center items-center">
      <Image src="/logo_nodata.png" width={182} height={182} alt="" />
      <Text.M18 className="text-gray-600">{text}</Text.M18>
    </div>
  );
};

export default NoData;
