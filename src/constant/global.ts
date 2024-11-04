export const navOptions = [
  { label: "Home", route: "/" },
  { label: "Services", route: "/services" },
  { label: "Cart", route: "/cart" },
  { label: "Blogs", route: "/blogs" },
  // { label: "Contact", route: "/contact" },
];

export const loginRouteOptions = [
  { label: "Login", route: "/login" },
  { label: "Register", route: "/register" },
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
      "As a digital nomad, staying productive while on the move can be challenging. This blog explores proven strategies like setting clear goals, using digital tools, and creating a structured routine that balances work and travel",
  },
  {
    id: crypto.randomUUID(),
    title: "The Best Destinations for Remote Work in 2024",
    author: "Emily Carter",
    publishDate: "2024-09-10",
    image: "https://images.pexels.com/photos/2773521/pexels-photo-2773521.jpeg",
    content:
      "2024 offers many exciting locations for digital nomads seeking the perfect blend of work and leisure. In this blog, we highlight destinations with reliable internet, great co-working spaces, and vibrant nomad communities to enhance your remote work experience",
  },
];

export const sidebarRoutes: any = {
  customer: [
    {
      id: 1,
      label: "Booking History",
      path: "/dashboard/customer/history",
    },
    {
      id: 2,
      label: "Feedback",
      path: "/dashboard/customer/feedback",
    },
  ],
  admin: [
    {
      id: 1,
      label: "User Management",
      path: "/dashboard/admin/management/user",
    },
    {
      id: 2,
      label: "Service Management",
      path: "/dashboard/admin/management/service",
    },
    {
      id: 3,
      label: "Booking Management",
      path: "/dashboard/admin/management/booking",
    },
    {
      id: 4,
      label: "Content Management",
      path: "/dashboard/admin/management/content",
    },
    {
      id: 5,
      label: "User Feedbacks",
      path: "/dashboard/admin/feedbacks",
    },
  ],
  superadmin: [
    {
      id: 1,
      label: "Admin Management",
      path: "/dashboard/superadmin/manage-admin",
    },
  ],
};

export const dataset = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    mobileNo: "+1234567890",
    address: "123 Main St, New York, NY",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobileNo: "+1987654321",
    address: "456 Oak St, Los Angeles, CA",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    mobileNo: "+1123456789",
    address: "789 Maple Ave, Chicago, IL",
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    mobileNo: "+1098765432",
    address: "321 Elm St, Houston, TX",
    status: "Pending",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@example.com",
    mobileNo: "+1987123456",
    address: "654 Pine St, Miami, FL",
    status: "Inactive",
  },
];

export const serviceCategory = [
  {
    label: "Technical",
    value: "technical",
  },
  {
    label: "Lifestyle",
    value: "lifestyle",
  },
];

export const serviceStatus = [
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
];

export const sortOrder = [
  {
    label: "Ascending",
    value: "asc",
  },
  {
    label: "Descending",
    value: "desc",
  },
];

export const serviceSortBy = [
  {
    label: "Price",
    value: "price",
  },
  {
    label: "Popularity",
    value: "popularity",
  },
];

export const startTime = [
  { label: "8:00 AM", value: "08:00" },
  { label: "8:30 AM", value: "08:30" },
  { label: "9:00 AM", value: "09:00" },
  { label: "9:30 AM", value: "09:30" },
  { label: "10:00 AM", value: "10:00" },
  { label: "10:30 AM", value: "10:30" },
  { label: "11:00 AM", value: "11:00" },
  { label: "11:30 AM", value: "11:30" },
  { label: "12:00 PM", value: "12:00" },
  { label: "12:30 PM", value: "12:30" },
  { label: "1:00 PM", value: "13:00" },
  { label: "1:30 PM", value: "13:30" },
  { label: "2:00 PM", value: "14:00" },
  { label: "2:30 PM", value: "14:30" },
  { label: "3:00 PM", value: "15:00" },
  { label: "3:30 PM", value: "15:30" },
  { label: "4:00 PM", value: "16:00" },
  { label: "4:30 PM", value: "16:30" },
  { label: "5:00 PM", value: "17:00" },
  { label: "5:30 PM", value: "17:30" },
  { label: "6:00 PM", value: "18:00" },
  { label: "6:30 PM", value: "18:30" },
  { label: "7:00 PM", value: "19:00" },
];

export const endTime = [
  { label: "2:00 PM", value: "14:00" },
  { label: "2:30 PM", value: "14:30" },
  { label: "3:00 PM", value: "15:00" },
  { label: "3:30 PM", value: "15:30" },
  { label: "4:00 PM", value: "16:00" },
  { label: "4:30 PM", value: "16:30" },
  { label: "5:00 PM", value: "17:00" },
  { label: "5:30 PM", value: "17:30" },
  { label: "6:00 PM", value: "18:00" },
  { label: "6:30 PM", value: "18:30" },
  { label: "7:00 PM", value: "19:00" },
  { label: "7:30 PM", value: "19:30" },
  { label: "8:00 PM", value: "20:00" },
  { label: "8:30 PM", value: "20:30" },
  { label: "9:00 PM", value: "21:00" },
  { label: "9:30 PM", value: "21:30" },
  { label: "10:00 PM", value: "22:00" },
];
