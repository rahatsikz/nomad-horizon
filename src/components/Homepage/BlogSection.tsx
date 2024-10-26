"use client";
import { BlogCard } from "../ui/Cards";
import { HeaderText } from "../ui/Headers";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import LoadingComponent from "../ui/LoadingComponent";
import { cn } from "@/lib/utils";

export function BlogSection() {
  const { data: allBlogs, isFetching } = useGetBlogsQuery({
    showOnHomepage: true,
  });

  if (isFetching) {
    return <LoadingComponent />;
  }

  return (
    <div>
      {allBlogs?.data?.length > 0 && (
        <>
          <HeaderText
            title='Most Popular Blogs'
            subtitle='Your Ultimate Resource for Digital Nomads: Practical Tips, Inspiring Stories, and Expert Guides'
          />
          <div
            className={cn(
              "grid",
              allBlogs?.data?.length === 1
                ? "grid-cols-1"
                : "grid-cols-1 xl:grid-cols-2 gap-8"
            )}
          >
            {allBlogs?.data?.slice(0, 2).map((data: any) => (
              <BlogCard key={data.id} data={data} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
