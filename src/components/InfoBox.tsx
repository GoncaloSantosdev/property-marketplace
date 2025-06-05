import Link from "next/link";

type InfoBoxProps = {
  title: string;
  description: string;
  link: string;
  linkText: string;
  otherStyles?: string;
};

const InfoBox = ({
  title,
  description,
  link,
  linkText,
  otherStyles,
}: InfoBoxProps) => {
  return (
    <div className={`p-6 rounded-lg shadow-md ${otherStyles}`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 mb-4">{description}</p>
      <Link
        href={link}
        className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default InfoBox;
