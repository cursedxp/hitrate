import Button from "../button/button";
import { Shuffle } from "react-feather";

export default function ShuffleButton() {
  return (
    <Button>
      <Shuffle className="w-4 h-4 dark:text-white" />
    </Button>
  );
}
