import ReviewSection from '@/widgets/detail/ReviewSection';

type PageProps = {
  params: Promise<{ id: string }>;
};

const DetailPage = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div className="w-full">
      <ReviewSection />
      <div className="sr-only">detail id: {id}</div>
    </div>
  );
};

export default DetailPage;
