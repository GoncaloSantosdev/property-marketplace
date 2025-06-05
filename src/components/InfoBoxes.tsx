import { InfoBox } from "@/components";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            title="For Renters"
            description="Find your dream rental property. Bookmark properties and contact owners."
            link="/properties"
            linkText="Browse Properties"
            otherStyles="bg-gray-100"
          />

          <InfoBox
            title="For Property Owners"
            description="List your properties and reach potential tenants. Rent as an airbnb or long term."
            link="/add-property"
            linkText="Add Property"
            otherStyles="bg-blue-100"
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
