export const navOptions = [
  { label: "Home", route: "/" },
  { label: "About", route: "/about" },
  { label: "Contact", route: "/contact" },
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
