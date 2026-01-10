import svgPaths from "./svg-h3ykii26mq";
import imgImage from "figma:asset/33fb6ee80221be4862d153ff6087a71ce90ad51a.png";

function Image() {
  return (
    <div className="h-[590.313px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col h-[460px] items-start left-0 overflow-clip top-0 w-[1464px]" data-name="Container">
      <Image />
    </div>
  );
}

function Container1() {
  return <div className="absolute bg-[rgba(113,70,73,0.2)] h-[460px] left-0 top-0 w-[1464px]" data-name="Container" />;
}

function Heading() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[333.813px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[333.813px]">
        <p className="absolute capitalize font-['Dubai:Bold',sans-serif] leading-[70px] left-0 not-italic text-[16px] text-nowrap text-white top-[-1px] whitespace-pre">Financial Audit Authority intranet welcomes you</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[64px] relative shrink-0 w-[825px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[64px] relative w-[825px]">
        <p className="absolute capitalize font-['Dubai:Regular',sans-serif] leading-[32px] left-0 not-italic text-[16px] text-white top-[-1px] w-[784px]">Welcome to the Financial Audit Authority intranet, your central hub for resources, updates, and tools to support our mission of ensuring financial integrity and accountability.</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[150px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M21 21L16.66 16.66" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p19568f00} id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TextInput() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[48px] items-center p-[12px] relative w-full">
          <p className="font-['Dubai:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(29,41,61,0.5)] text-nowrap whitespace-pre">Search documents, policies, services, people, FAQs...</p>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[24px] size-[20px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M17.5 17.5L13.8834 13.8833" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pcddfd00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#7b282d] h-[48px] relative rounded-[4px] shrink-0 w-[120.047px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] relative w-[120.047px]">
        <Icon1 />
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[24px] left-[74.5px] not-italic text-[16px] text-center text-nowrap text-white top-[11px] translate-x-[-50%] whitespace-pre">Search</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white h-[64px] relative rounded-[10px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[64px] items-center pl-[16px] pr-[8px] py-0 relative w-full">
          <Icon />
          <TextInput />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[28px] left-0 top-0 w-[71.875px]" data-name="Text">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-nowrap text-slate-200 top-0 whitespace-pre">Quick filters:</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] h-[28px] left-[79.88px] rounded-[3.35544e+07px] top-0 w-[66.547px]" data-name="Button">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-[33.5px] not-italic text-[14px] text-center text-nowrap text-white top-[4px] translate-x-[-50%] whitespace-pre">Policies</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] h-[28px] left-[154.42px] rounded-[3.35544e+07px] top-0 w-[87.594px]" data-name="Button">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-[44px] not-italic text-[14px] text-center text-nowrap text-white top-[4px] translate-x-[-50%] whitespace-pre">Procedures</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] h-[28px] left-[250.02px] rounded-[3.35544e+07px] top-0 w-[59.563px]" data-name="Button">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-[30px] not-italic text-[14px] text-center text-nowrap text-white top-[4px] translate-x-[-50%] whitespace-pre">Forms</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] h-[28px] left-[317.58px] rounded-[3.35544e+07px] top-0 w-[70.953px]" data-name="Button">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-[35.5px] not-italic text-[14px] text-center text-nowrap text-white top-[4px] translate-x-[-50%] whitespace-pre">Services</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] h-[28px] left-[396.53px] rounded-[3.35544e+07px] top-0 w-[118.375px]" data-name="Button">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-[59.5px] not-italic text-[14px] text-center text-nowrap text-white top-[4px] translate-x-[-50%] whitespace-pre">People Directory</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <Text />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-[rgba(81,58,64,0.5)] box-border content-stretch flex flex-col gap-[24px] h-[332px] items-start left-[294.5px] pb-0 pt-[25px] px-[25px] rounded-[10px] top-[64px] w-[875px]" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
    </div>
  );
}

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-[#0f172b] relative size-full to-[#1d293d]" data-name="Hero">
      <Container />
      <Container1 />
      <Container5 />
    </div>
  );
}