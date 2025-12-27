import Text from '@/shared/ui/Text';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-16 text-gray-900">
      <div className="flex w-full max-w-3xl flex-col gap-6 rounded-2xl bg-white p-10 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Text.B20 className="text-primary">{'<Text.B14>'}</Text.B20>
            <Text.M12 as="p" className="text-gray-600">
              {'<Text.M16>'}
            </Text.M12>
            <Text.Body16 className="text-gray-600">{'<Text.Body16>'}</Text.Body16>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-primary-100 px-3 py-1 text-sm text-primary">
            Primary
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">Gray-700</span>
          <span className="rounded-full bg-red px-3 py-1 text-sm text-white">Red</span>
        </div>
        <Text.Body16 className="text-gray-700">
          임시로 우측하단에 다크테마 토글버튼 있습니다.
          <br />
          (다크모드에서 새로고침해도 플래시 없이 다크모드 그대로)
        </Text.Body16>
        <Text.M12 className="text-gray-700">메인 작업하실 때는 지우고 작업해주세요.</Text.M12>
      </div>
    </main>
  );
}
