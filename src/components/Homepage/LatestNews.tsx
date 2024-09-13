import { dummyLatestNews } from "@/constant/global";
import { NewsCard } from "../ui/Cards";
import { HeaderText } from "../ui/Headers";

export function LatestNews() {
  return (
    <div>
      <HeaderText
        title='Latest News'
        subtitle='Stay Updated with the Latest Trends and Insights in the Digital Nomad World'
      />
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {dummyLatestNews.map((data, idx) => (
          <NewsCard key={idx} data={data} />
        ))}
      </div>
    </div>
  );
}
