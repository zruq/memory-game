import { createEffect, createSignal } from "solid-js";
import { getGridSize, getTheme } from "../utils/game_config";
import {
  Flask,
  Anchor,
  Bug,
  Car,
  Futbol,
  HandSpock,
  LiraSign,
  Snowflake,
  Moon,
  Sun,
} from "./Icons";

type CellStatus = "HIDDEN" | "ACTIVE" | "FOUND";

const iconClass = "scale-50 fill-white";
function GetCellTheme(props: { value: number }) {
  if (getTheme() === "ICONS") {
    switch (props.value) {
      case 1:
        return <Flask class={iconClass} />;
      case 2:
        return <Anchor class={iconClass} />;
      case 3:
        return <Bug class={iconClass} />;
      case 4:
        return <Car class={iconClass} />;
      case 5:
        return <Futbol class={iconClass} />;
      case 6:
        return <HandSpock class={iconClass} />;
      case 7:
        return <LiraSign class={iconClass} />;
      case 8:
        return <Snowflake class={iconClass} />;
      case 9:
        return <Moon class={iconClass} />;
      case 10:
        return <Sun class={iconClass} />;
    }
  }
  return <>{props.value}</>;
}
const size = () =>
  getGridSize() === 4
    ? "w-[72.53px] h-[72.53px]  text-[2.5rem]"
    : "w-[46.88px] h-[46.88px] text-[1.5rem]";

function Cell(props) {
  const [status, setStatus] = createSignal<CellStatus>("HIDDEN");
  const bgColor = () => {
    switch (status()) {
      case "ACTIVE":
        return "bg-orange";
      case "FOUND":
        return "bg-blue-100";
      case "HIDDEN":
        return "bg-blue-400";
    }
  };
  const handleOnClick = () => {
    setStatus("ACTIVE");
    props.setChosenCells(
      props.chosenCells().cells[0] !== null
        ? {
            cells: [props.chosenCells().cells[0], props.index],
            isMatch:
              props.gameState[props.chosenCells().cells[0]] === props.value,
          }
        : { cells: [props.index, null], isMatch: false }
    );
  };

  createEffect(() => {
    if (props.chosenCells().cells.includes(props.index)) {
      if (props.chosenCells().isMatch) {
        setStatus("FOUND");
      } else {
        setStatus("ACTIVE");
      }
    } else if (status() !== "FOUND") {
      setStatus("HIDDEN");
    }
  });
  return (
    <button
      disabled={status() !== "HIDDEN" || props.isChoseTwo()}
      onclick={handleOnClick}
      class={`${size()} ${bgColor()} rounded-full flex justify-center items-center text-white transition duration-500`}
    >
      {status() !== "HIDDEN" && <GetCellTheme value={props.value} />}
    </button>
  );
}

export default Cell;