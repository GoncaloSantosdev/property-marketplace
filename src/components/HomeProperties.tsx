import Link from "next/link";
// Database
import { connectDB } from "@/config/database";
// Models
import Property from "@/models/Property";
// Components
import { PropertyCard } from "@/components";
// Types
import { PropertyTypes } from "@/types/property";

const HomeProperties = async () => {
  await connectDB();
  const properties = await Property.find({}).lean();

  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container mx-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentProperties.map((property) => (
                <PropertyCard
                  key={property._id?.toString()}
                  property={property as unknown as PropertyTypes}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="m-auto max-w-lg my-6 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
