"use client";
import { cn } from "@/lib/utils";
import { NewsCard } from "../ui/Cards";
import { HeaderText } from "../ui/Headers";
import { useGetNewsQuery } from "@/redux/api/newsApi";

export function LatestNews() {
  const { data: newsData } = useGetNewsQuery({
    showOnHomepage: true,
  });

  const newsDataLength = newsData?.data?.length;

  return (
    <div>
      {newsDataLength > 0 && (
        <>
          <HeaderText
            title='Latest News'
            subtitle='Stay Updated with the Latest Trends and Insights in the Digital Nomad World'
          />
          <div
            className={cn(
              "grid gap-4",
              newsDataLength === 3 && "md:grid-cols-2 lg:grid-cols-3",
              newsDataLength === 2 && "md:grid-cols-1 lg:grid-cols-2"
            )}
          >
            {newsData?.data?.slice(0, 3)?.map((data: any, idx: number) => (
              <NewsCard key={idx} data={data} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
