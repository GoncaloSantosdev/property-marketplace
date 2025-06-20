import Link from "next/link";
// Database
import { connectDB } from "@/config/database";
// Models
import Property from "@/models/Property";
// Types
import { PropertyTypes } from "@/types/property";
// Components
import { PropertyHeaderImage, PropertyDetails } from "@/components";
// Icon
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = async ({ params }: { params: { id: string } }) => {
  await connectDB();
  const property = (await Property.findById(
    params.id
  ).lean()) as unknown as PropertyTypes;

  return (
    <>
      <PropertyHeaderImage image={property?.images[0]} />

      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>

      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            {/* Property Info */}
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;
