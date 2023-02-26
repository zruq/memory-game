import { splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

export function Button(props: ButtonProps) {
  const [, others] = splitProps(props, [
    "isActive",
    "buttonType",
    "children",
    "class",
  ]);

  return (
    <button
      {...others}
      class={`transition duration-200 capitalize rounded-full  ${
        props.class
      } ${getButtonClasses(props.isActive ?? false, props.buttonType)}`}
    >
      {props.children}
    </button>
  );
}

export function Card(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [, others] = splitProps(props, ["class", "children"]);
  return (
    <div {...others} class={`bg-gray rounded-[20px] ${props.class}`}>
      {props.children}
    </div>
  );
}

export function Score(props) {
  return (
    <>
      <div
        class={`${
          props.isActive ? "bg-orange text-white" : "bg-[#DFE7EC] text-blue-400"
        } w-full rounded-[5px] pt-[10px] pb-[9px] flex justify-center items-center flex-col relative`}
      >
        {props.isActive && (
          <div
            style={{
              "border-left": "8px solid transparent",
              "border-right": "8px solid transparent",
              "border-bottom": "8px solid #FDA214",
            }}
            class="w-0 h-0 mx-auto absolute  inset-0 -top-2"
          ></div>
        )}
        <div
          class={`${props.isActive ? "" : "text-blue-200"} text-[0.9375rem]`}
        >
          {props.title}
        </div>
        <div class={`text-[1.5rem]`}>{props.value}</div>
      </div>
    </>
  );
}
type ButtonType = "MENUBIG" | "MENUSELECT" | "PRIMARY" | "SECONDARY";
type ButtonProps = {
  isActive?: Boolean;
  buttonType: ButtonType;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

function getButtonClasses(isActive: Boolean, type?: ButtonType): string {
  switch (type) {
    case "MENUBIG":
      return "text-body md:text-h2 text-white w-[279px] h-[48px]  md:w-[541px] md:h-[70px] bg-orange hover:bg-[#FFB84A]";
    case "MENUSELECT":
      return `text-[1rem] md:text-[1.625rem] text-white pt-[11px] pb-[9px] ${
        isActive ? "bg-blue-400" : "bg-blue-100 hover:bg-blue-300"
      } `;
    case "PRIMARY":
      return "text-[1.125rem] md:text-h3 text-white px-[18.5px] py-[10px] md:py-3 md:px-7 bg-orange hover:bg-[#FFB84A]";
    case "SECONDARY":
      return "text-[1.125rem] md:text-h3 text-blue-400 bg-[#DFE7EC] py-3 px-7 hover:text-white hover:bg-blue-300";
    default:
      return "";
  }
}
