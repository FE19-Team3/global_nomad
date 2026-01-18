type BuildDescriptionParams = {
  startTime: string;
  endTime: string;
  headCount: number;
  date: string;
};

export const buildDescription = (params: BuildDescriptionParams) => {
  const { startTime, endTime, headCount, date } = params;
  const formattedDate = date.replaceAll('-', '. ');
  return `${formattedDate} / ${startTime} - ${endTime} (${headCount}명)`;
};
