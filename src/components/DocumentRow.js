import { useRouter } from "next/router";
import { HiOutlineDocumentText, HiOutlineDotsVertical } from "react-icons/hi";

const DocumentRow = ({ id, data }) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center cursor-pointer hover:bg-gray-100 p-4 rounded-lg"
      onClick={() => router.push(`/doc/${id}`)}
    >
      <HiOutlineDocumentText size="2em" />
      <h3 className="flex-grow pl-5 w-10 pr-10 truncate font-body">
        {data.file_name}
      </h3>
      <p className="pr-5 text-sm text-gray font-body">
        {data.timestamp.toDate().toLocaleDateString()}
      </p>

      <HiOutlineDotsVertical size="2em" />
    </div>
  );
};

export default DocumentRow;
