import Permissions from "@/views/permissions";

const page = ({ params }: { params: { roleId: string } }) => {
  const {roleId}=params;
  return <Permissions roleId={Number(roleId)}/>;
};

export default page;
