// Database
import { connectDB } from "@/config/database";
// Models
import Property from "@/models/Property";
// Components
import { PropertyCard } from "@/components";
// Types
import { PropertyTypes } from "@/types/property";

const PropertiesPage = async () => {
  await connectDB();
  const properties = await Property.find({}).lean();

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container mx-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id?.toString()}
                property={property as unknown as PropertyTypes}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
