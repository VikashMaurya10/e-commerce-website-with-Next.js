import { getCategroies } from "@/controllers/categoryControllers";

const GET = async () => {
  return getCategroies();
};

export { GET };
