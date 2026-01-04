export const uploadImageToUrl = async (file: File): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 700)); // 업로드 느낌으로 잠깐 대기
  return URL.createObjectURL(file); // 임시 URL 반환
};
