import { dummyBlogData } from "@/constant/global";
import { BlogCard } from "../ui/Cards";
import { HeaderText } from "../ui/Headers";

export function BlogSection() {
  return (
    <div>
      <HeaderText
        title='Most Popular Blogs'
        subtitle='Your Ultimate Resource for Digital Nomads: Practical Tips, Inspiring Stories, and Expert Guides'
      />
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
        {dummyBlogData.map((data) => (
          <BlogCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
}
