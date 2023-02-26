import { createEffect, createSignal, For } from "solid-js";
import { Dynamic } from "solid-js/web";
import Cell from "../components/Cell";
import { GameViewLogo as Logo } from "../components/Icons";
import Modal from "../components/Modal";
import { Button } from "../components/UIBasics";
import { newBoard } from "../utils/game";
import { getGridSize } from "../utils/game_config";

type GameViewProps = {
  goToMainMenu: () => void;
};

function GameView(props: GameViewProps) {
  const [showMenu, setShowMenu] = createSignal(false);
  const [boardKey, setBoardKey] = createSignal(0);
  return (
    <main class="p-6 flex flex-col justify-between">
      <nav class="flex justify-between items-center mb-20">
        <Logo />
        <Button onclick={() => setShowMenu(true)} buttonType="PRIMARY">
          menu
        </Button>
      </nav>
      {Board(boardKey())}
      <Modal
        cardClass="w-full p-6"
        showModal={setShowMenu}
        isVisible={showMenu}
      >
        <Button
          onclick={() => {
            setBoardKey((boardKey) => boardKey + 1);
            setShowMenu(false);
          }}
          class="block w-full my-4"
          buttonType="PRIMARY"
        >
          Restart
        </Button>
        <Button
          onclick={props.goToMainMenu}
          class="block w-full my-4"
          buttonType="SECONDARY"
        >
          new game
        </Button>
        <Button
          onclick={() => setShowMenu(false)}
          class="block w-full my-4"
          buttonType="SECONDARY"
        >
          resume game
        </Button>
      </Modal>
    </main>
  );
}

export default GameView;

function Board(key: number) {
  const gameState = newBoard();
  const [chosenCells, setChosenCells] = createSignal<{
    cells: [number | null, number | null];
    isMatch: Boolean;
  }>({ cells: [null, null], isMatch: false });
  const isChoseTwo = () =>
    chosenCells().cells[0] !== null && chosenCells().cells[1] !== null;
  const initChosenCells = () =>
    setChosenCells({ cells: [null, null], isMatch: false });
  createEffect(() => {
    if (isChoseTwo()) {
      setTimeout(
        () => {
          initChosenCells();
        },
        chosenCells().isMatch ? 100 : 600
      );
    }
  });
  return (
    <div
      class={`grid  ${
        getGridSize() === 4
          ? "grid-cols-4 gap-[12.29px]"
          : "grid-cols-6 gap-[9.12px]"
      }`}
    >
      <For each={gameState}>
        {(cell, index) => (
          <Cell
            index={index()}
            value={cell}
            setChosenCells={setChosenCells}
            chosenCells={chosenCells}
            gameState={gameState}
            isChoseTwo={isChoseTwo}
          />
        )}
      </For>
    </div>
  );
}