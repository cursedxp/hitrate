import { Plus } from "react-feather";
export default function NewProjectButton() {
  return (
    <div>
      <button className="relative h-48 rounded-xl w-full border-2 border-blue-500 flex flex-col justify-center items-center hover:scale-105 transition-all duration-300 hover:shadow-lg">
        <div className="rounded-full text-blue-500 bg-blue-200 w-12 h-12 flex justify-center items-center">
          <Plus className="w-6 h-6" />
        </div>
        <div className="text-blue-500 mt-2">New Project</div>
      </button>
    </div>
  );
}
