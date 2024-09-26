export const navOptions = [
  { label: "Home", route: "/" },
  { label: "Services", route: "/services" },
  { label: "Cart", route: "/cart" },
  // { label: "Contact", route: "/contact" },
  { label: "Blog", route: "/blog" },
];

export const loginRouteOptions = [
  { label: "Register", route: "/register" },
  { label: "Login", route: "/login" },
];
export const dummyServices = [
  {
    id: "1",
    createdAt: "2024-08-20T10:30:00Z",
    updatedAt: "2024-08-20T12:45:00Z",
    serviceName: "Remote Internet Setup",
    content: "High-speed satellite internet setup for nomads in remote areas.",
    image: "https://images.pexels.com/photos/3767406/pexels-photo-3767406.jpeg",
    status: "active",
    price: 100,
    categoryId: 1,
  },
  {
    id: "2",
    createdAt: "2024-08-21T09:15:00Z",
    updatedAt: "2024-08-21T11:00:00Z",
    serviceName: "Laptop Repair",
    content:
      "Fast and reliable laptop repair services for travelers on the go.",
    image: "https://images.pexels.com/photos/1212818/pexels-photo-1212818.jpeg",
    status: "active",
    price: 50,
    categoryId: 2,
  },
  {
    id: "3",
    createdAt: "2024-08-22T14:20:00Z",
    updatedAt: "2024-08-22T15:30:00Z",
    serviceName: "Mobile Hotspot Rental",
    content:
      "Rent mobile hotspots for uninterrupted connectivity while traveling.",
    image: "https://images.pexels.com/photos/5701710/pexels-photo-5701710.jpeg",
    status: "upcoming",
    price: 30,
    categoryId: 3,
  },
  {
    id: "4",
    createdAt: "2024-08-23T13:05:00Z",
    updatedAt: "2024-08-23T14:10:00Z",
    serviceName: "Coworking Space Booking",
    content:
      "Book flexible coworking spaces in different cities around the world.",
    image: "https://images.pexels.com/photos/5828664/pexels-photo-5828664.jpeg",
    status: "upcoming",
    price: 20,
    categoryId: 4,
  },
  {
    id: "5",
    createdAt: "2024-08-24T08:40:00Z",
    updatedAt: "2024-08-24T09:50:00Z",
    serviceName: "Mobile Repair Services",
    content: "Quick and efficient mobile phone repair for nomads on the move.",
    image: "https://images.pexels.com/photos/6755056/pexels-photo-6755056.jpeg",
    status: "active",
    price: 40,
    categoryId: 2,
  },
  {
    id: "6",
    createdAt: "2024-08-25T16:25:00Z",
    updatedAt: "2024-08-25T17:35:00Z",
    serviceName: "Nomad Insurance",
    content:
      "Comprehensive travel and health insurance packages designed for nomads.",
    image: "https://images.pexels.com/photos/5828622/pexels-photo-5828622.jpeg",
    status: "upcoming",
    price: 150,
    categoryId: 5,
  },
];

export const dummyReview = [
  {
    id: crypto.randomUUID(),
    name: "Emma Brooks",
    city: "Vancouver, Canada",
    review:
      "Nomad Horizon has been a game-changer for my travels. The services are reliable, and I’ve never felt more connected while on the road. I highly recommend them to any digital nomad looking for convenience and efficiency!",
  },
  {
    id: crypto.randomUUID(),
    name: "Carlos Ramirez",
    city: "Barcelona, Spain",
    review:
      "I love how easy it is to find services tailored to my nomadic lifestyle. The support team is excellent, and the offerings keep getting better. Nomad Horizon truly understands the needs of modern-day nomads.",
  },
  {
    id: crypto.randomUUID(),
    name: "Aisha Patel",
    city: "Sydney, Australia",
    review:
      "From fast internet to mobile services, Nomad Horizon has everything I need to stay productive while traveling. Their platform is user-friendly and makes managing my resources stress-free!",
  },
];

export const dummyEvent = [
  {
    id: crypto.randomUUID(),
    eventName: "Digital Nomad Summit",
    eventDate: "2025-03-15",
    location: "Lisbon, Portugal",
    description:
      "Join fellow nomads and remote professionals at the Digital Nomad Summit, where industry leaders discuss trends in remote work, digital services, and nomadic lifestyle tips.",
    category: "Conferences",
  },
  {
    id: crypto.randomUUID(),
    eventName: "Remote Work & Tech Expo",
    eventDate: "2025-06-20",
    location: "Bali, Indonesia",
    description:
      "Explore the latest tools and services for digital nomads at the Remote Work & Tech Expo. Featuring product demos, networking opportunities, and hands-on workshops.",
    category: "Exhibitions",
  },
];

export const dummyLatestNews = [
  {
    id: crypto.randomUUID(),
    title: "New Digital Nomad Visa Options for 2024",
    subtitle:
      "Explore the latest visa opportunities that make remote work more accessible across different countries.",
    date: "2024-09-10",

    content:
      "With more countries introducing digital nomad visas, 2024 brings new possibilities for remote workers. Discover which destinations are becoming more accessible for long-term stays, allowing you to live and work freely as a global citizen.",
  },
  {
    id: crypto.randomUUID(),
    title: "Top Destinations for Digital Nomads in 2024",
    subtitle:
      "Uncover the most popular and emerging locations for remote work around the world.",
    date: "2024-08-25",

    content:
      "From bustling cities to serene beach towns, here are the top destinations where digital nomads can thrive in 2024. Learn about the best places offering co-working spaces, fast internet, and a vibrant community of remote professionals.",
  },
  {
    id: crypto.randomUUID(),
    title: "5 Essential Gadgets for Remote Workers",
    subtitle:
      "Optimize your workflow with the latest tech tools every digital nomad needs.",
    date: "2024-09-05",

    content:
      "Stay productive on the go with these essential gadgets designed for digital nomads. From portable Wi-Fi hotspots to noise-canceling headphones, we’ve got you covered with tools that enhance your remote work experience.",
  },
];

export const dummyBlogData = [
  {
    id: crypto.randomUUID(),
    title: "How to Stay Productive as a Digital Nomad",
    author: "David Simmons",
    publishDate: "2024-09-15",
    image: "https://images.pexels.com/photos/5992541/pexels-photo-5992541.jpeg",
    content:
      "As a digital nomad, staying productive while on the move can be challenging. This blog explores proven strategies like setting clear goals, using digital tools, and creating a structured routine that balances work and travel...",
  },
  {
    id: crypto.randomUUID(),
    title: "The Best Destinations for Remote Work in 2024",
    author: "Emily Carter",
    publishDate: "2024-09-10",
    image: "https://images.pexels.com/photos/2773521/pexels-photo-2773521.jpeg",
    content:
      "2024 offers many exciting locations for digital nomads seeking the perfect blend of work and leisure. In this blog, we highlight destinations with reliable internet, great co-working spaces, and vibrant nomad communities to enhance your remote work experience...",
  },
];
