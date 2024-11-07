## Nomad Horizon - Frontend

Nomad Horizon is an `Online Service Reservation and Administration Portal` application. It is developed to attract Digital Nomads around the world and help them on course. It gives them options like book a service online, track their order and avail them on their journey.

## Who are Digital Nomads?

Digital nomads are individuals who leverage technology to work remotely from anywhere in the world, often traveling frequently and embracing a location-independent lifestyle.

## Notable Features

- **Role-Based Access Control (RBAC)** – Implemented role-specific access for customers, admins and super admins to ensure secure and customized user interactions.

- **User Profile Management** – Users can manage personal profiles with options to edit information.

- **Service Discovery and Filtering** – Users can browse services with search and Filtering functionality.

- **Efficient Booking System** – A streamlined, user-friendly booking process with date and time selection, confirmations and booking status tracking.

- **Service Reviews and Ratings** – Users can leave feedback on booked services, enhancing trust and transparency with ratings displayed on service listings.

- **Admin Dashboard and Controls** – Central dashboard for admins to monitor website activity, manage user, service, and bookings with options for schedule adjustments.

- **Booking Management for Admins** – A complete booking management system that allows admins to accept, reject or adjust bookings, optimizing service availability.

- **User Notifications Center** – A notifications hub where customers receive real-time updates on bookings and confirmations

- **Super Admin Role Management** – Super admins have control over adding and managing admins, demonstrating a layered approach to administrative authority.

- **User Dashboard with Booking History** – A personalized user dashboard displaying booking history and statuses which ensures comprehensive view of their interactions.

## Deployed Link

Project has been deployed in vercel. To Visit:
[https://nomad-horizon.vercel.app](https://nomad-horizon.vercel.app)

## Technology Used

- Next.js (version 14.2.8)
- TypeScript (for type safety)
- Tailwind (for css styling)
- Redux (for state management)
- RTK Query (for data fetching)

## Library Used

- React hook form (for managing forms)
- Recharts (for creating bar and line chart)
- Axios (for intercepting request and response)
- Redux Persist (for persisting store between sessions)

## Procedure to run project in your device

At First, Clone the Repository

```bash
git clone https://github.com/rahatsikz/nomad-horizon.git
```

Then, install all dependencies by

```bash
npm install
```

after that, add the `.env.local` file in the root directory and add these environment variables with additional values

```bash
NEXT_PUBLIC_API_BASE_URL = https://nomad-horizon-backend.vercel.app/api/v1
NEXT_PUBLIC_IMGBB_KEY = "Enter your imgBB API key"
```

Finally, run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the site.

## For backend

To visit Project's Backend Repository, click this [link](https://github.com/rahatsikz/nomad-horizon-backend)

## Comprehensive Project Overview Video

Click the thumbnail below to view video

[![Thumbnail](https://i.ibb.co.com/yNCfP62/image.png)](https://www.loom.com/share/0217f9bff95f43f6a73f37a19239c9ef?sid=15c72e5f-0df2-49f7-a46b-c2997a8f30e7)
