import Button from "../button/button";
import { Shuffle } from "react-feather";
import { useDispatch } from "react-redux";
import { shufflePreviews } from "@/app/redux/slices/app.slice";

export default function ShuffleButton() {
  const dispatch = useDispatch();

  const handleShuffle = () => {
    dispatch(shufflePreviews());
  };

  return (
    <Button onClick={handleShuffle}>
      <Shuffle className="w-4 h-4 dark:text-white" />
    </Button>
  );
}
