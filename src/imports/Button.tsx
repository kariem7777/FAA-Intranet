import svgPaths from "./svg-ag4ur0dtx2";
import imgImageEntitysLegislationEmblem from "figma:asset/b72751a84f5670c85d2329e369f98785e55073a8.png";

function ImageEntitysLegislationEmblem() {
  return (
    <div className="h-[92px] relative shrink-0 w-[111px]" data-name="Image (Entity\'s Legislation emblem)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageEntitysLegislationEmblem} />
    </div>
  );
}

function Heading() {
  return (
    <div className="basis-0 grow h-[33.594px] min-h-px min-w-px relative shrink-0" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[33.6px] left-[108px] not-italic text-[22px] text-center text-gray-900 text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">{`Entity's Legislation`}</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #374151)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #374151)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="box-border content-stretch flex items-center justify-center p-px relative rounded-[3.35544e+07px] shrink-0 size-[40px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <Icon />
    </div>
  );
}

function Container() {
  return <div className="absolute h-[2.406px] left-[108.36px] top-[33.59px] w-0" data-name="Container" />;
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center relative shrink-0 w-full">
      <Heading />
      <Button />
      <Container />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[45px] items-center left-[26.17px] top-[38.02px] w-[269px]">
      <ImageEntitysLegislationEmblem />
      <Frame />
    </div>
  );
}

function Container1() {
  return <div className="absolute bg-[#323c60] h-[280px] left-0 top-0 w-[8px]" data-name="Container" />;
}

function Container2() {
  return (
    <div className="absolute bg-white h-[253px] left-0 overflow-clip rounded-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06),0px_8px_24px_0px_rgba(0,0,0,0.08)] top-0 w-[320px]" data-name="Container">
      <Frame1 />
      <Container1 />
    </div>
  );
}

function Container3() {
  return <div className="absolute border-2 border-[rgba(0,0,0,0)] border-solid h-[248px] left-0 rounded-[20px] top-0 w-[320px]" data-name="Container" />;
}

export default function Button1() {
  return (
    <div className="relative size-full" data-name="Button">
      <Container2 />
      <Container3 />
    </div>
  );
}