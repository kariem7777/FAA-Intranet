import svgPaths from "./svg-jbmkk3s5yj";
import imgImage from "figma:asset/33fb6ee80221be4862d153ff6087a71ce90ad51a.png";
import imgImageWithFallback from "figma:asset/cb64f9a87ac606d9926884eed9a827a7172105de.png";
import imgImageWithFallback1 from "figma:asset/95993900bf37692651b8569a31368a3269db15e2.png";
import imgImageWithFallback2 from "figma:asset/7de74e447ed1e5b77f01506bfd62f7dabad9ae03.png";
import imgImageWithFallback3 from "figma:asset/33f312785d773855d5dfb38d16c5cfaeeaf99931.png";
import imgImageWithFallback4 from "figma:asset/acec061ade8f155cbb8db34fe8dfffb8b27e2e58.png";
import imgImageWithFallback5 from "figma:asset/af9823e73d05653a993d33627758046b9fed35b3.png";
import imgImageWithFallback6 from "figma:asset/00bc57afad950d33428423ab7c213d741274f5d6.png";
import imgImageWithFallback7 from "figma:asset/1308dad5ac4eee5bb8e797f6976bf56350b6d041.png";
import imgImageWithFallback8 from "figma:asset/8c68b1421c9d494969f62752cb2db352cf34a27d.png";
import imgImageWithFallback9 from "figma:asset/5ee87822c08c855c540d944597cc202195ab0bea.png";
import imgImageWithFallback10 from "figma:asset/abb7c1ed27559f226111b5e2f0bdcb74456f21fc.png";
import imgImageWithFallback11 from "figma:asset/ca614061cb3e85b3b553f949ba737f93160bcbb2.png";
import imgImageWithFallback12 from "figma:asset/a5ddb65a14d35992c9db64b833b8ead7d6060dbb.png";

function Image() {
  return (
    <div className="absolute h-[240px] left-0 top-0 w-[1423px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Container() {
  return <div className="absolute bg-[rgba(113,70,73,0.2)] h-[240px] left-0 top-0 w-[1423px]" data-name="Container" />;
}

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-[787px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start relative w-[787px]">
        <p className="basis-0 capitalize font-['Arial:Regular',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[20px] text-white">Financial Audit Authority intranet welcomes you</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[51.188px] relative shrink-0 w-[784px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[51.188px] relative w-[784px]">
        <p className="absolute capitalize font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[16px] text-white top-[-1px] w-[749px]">Welcome to the Financial Audit Authority intranet, your central hub for resources, updates, and tools to support our mission of ensuring financial integrity and accountability.</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[22px] h-[117.188px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[rgba(81,58,64,0.5)] box-border content-stretch flex flex-col h-[157.188px] items-start left-[298px] pb-0 pt-[20px] px-[20px] rounded-[10px] top-[40px] w-[827px]" data-name="Container">
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[240px] overflow-clip relative rounded-[16.4px] shrink-0 w-full" data-name="Container">
      <Image />
      <Container />
      <Container2 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2ef1ad00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2fc80880} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 4V9.33333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#7b282d] items-center justify-center left-0 rounded-[10px] size-[36px] to-[#971b1e] top-[4px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start left-[48px] top-0 w-[171.797px]" data-name="Heading 4">
      <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1d293d] text-[20px] text-nowrap whitespace-pre">Corporate Updates</p>
    </div>
  );
}

function HomePage() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="HomePage">
      <Container4 />
      <Heading2 />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center left-[3px] px-[9px] py-[5px] rounded-[16.4px] top-[3.5px] w-[221.828px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-neutral-950 text-nowrap whitespace-pre">Announcements</p>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="absolute box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center left-[224.83px] px-[9px] py-[5px] rounded-[16.4px] top-[3.5px] w-[221.828px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-neutral-950 text-nowrap whitespace-pre">{`Media & News`}</p>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="absolute box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center left-[446.66px] px-[9px] py-[5px] rounded-[16.4px] top-[3.5px] w-[221.828px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-neutral-950 text-nowrap whitespace-pre">Policy Updates</p>
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="absolute box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center left-[668.48px] px-[9px] py-[5px] rounded-[16.4px] top-[3.5px] w-[221.844px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-neutral-950 text-nowrap whitespace-pre">{`Laws & Legislation`}</p>
    </div>
  );
}

function TabList() {
  return (
    <div className="bg-neutral-100 h-[36px] relative rounded-[16.4px] shrink-0 w-[893.328px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[893.328px]">
        <PrimitiveButton />
        <PrimitiveButton1 />
        <PrimitiveButton2 />
        <PrimitiveButton3 />
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#ec2227] h-[18px] relative rounded-[6.8px] shrink-0 w-[44.469px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[44.469px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Policy</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[16px] relative shrink-0 w-[61.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[61.359px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap whitespace-pre">2025-11-26</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge />
      <Text />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">New Audit Standards Released</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[25.594px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-1px] whitespace-pre">Updated international audit standards have been published and are now available in the knowledge hub.</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="basis-0 grow h-[98.594px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[98.594px] items-start relative w-full">
        <Container5 />
        <Heading1 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[98.594px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Icon1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white h-[120.594px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[120.594px] items-start pb-px pt-[11px] px-[11px] relative w-full">
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#ec2227] h-[18px] relative rounded-[6.8px] shrink-0 w-[29.703px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[29.703px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">HR</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[61.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[61.359px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap whitespace-pre">2025-11-25</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge1 />
      <Text1 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Remote Work Policy Update</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[25.594px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-1px] whitespace-pre">The updated remote work policy is now effective. Please review the new guidelines.</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="basis-0 grow h-[98.594px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[98.594px] items-start relative w-full">
        <Container9 />
        <Heading3 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[98.594px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Icon2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white h-[120.594px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[120.594px] items-start pb-px pt-[11px] px-[11px] relative w-full">
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#ec2227] h-[18px] relative rounded-[6.8px] shrink-0 w-[74.359px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[74.359px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Technology</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[61.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[61.359px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap whitespace-pre">2025-11-24</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[8px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge2 />
      <Text2 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Digital Transformation Initiative Launch</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[25.594px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-1px] whitespace-pre">We are excited to announce the launch of our digital transformation program.</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="basis-0 grow h-[98.594px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[98.594px] items-start relative w-full">
        <Container13 />
        <Heading4 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex h-[98.594px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Icon3 />
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-white h-[120.594px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[120.594px] items-start pb-px pt-[11px] px-[11px] relative w-full">
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function HomePage1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[893.328px]" data-name="HomePage">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-full items-start overflow-clip pb-0 pl-0 pr-[16px] relative rounded-[inherit] w-[893.328px]">
        <Container8 />
        <Container12 />
        <Container16 />
      </div>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[336px] items-start relative shrink-0 w-full" data-name="Primitive.div">
      <TabList />
      <HomePage1 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[12px] h-[442px] items-start left-0 pb-px pt-[25px] px-[25px] rounded-[10px] top-0 w-[943.328px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <HomePage />
      <PrimitiveDiv />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19d57600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2fe1fe40} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p25c2200} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#8cd4e4] items-center justify-center left-0 rounded-[10px] size-[36px] to-[rgba(0,0,0,0)] top-[4px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start left-[44px] top-0 w-[126.156px]" data-name="Heading 4">
      <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1d293d] text-[20px] text-nowrap whitespace-pre">Media Gallery</p>
    </div>
  );
}

function HomePage2() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="HomePage">
      <Container17 />
      <Heading5 />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="h-[225.922px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-gradient-to-b box-border content-stretch flex flex-col from-[#cceaf2] h-[204px] items-start overflow-clip relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 to-[#8cd4e4] w-full" data-name="Container">
      <ImageWithFallback />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="h-[225.922px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-gradient-to-b box-border content-stretch flex flex-col from-[#cceaf2] h-[118px] items-start overflow-clip relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 to-[#8cd4e4] w-[128px]" data-name="Container">
      <ImageWithFallback1 />
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="h-[225.922px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-gradient-to-b box-border content-stretch flex flex-col from-[#cceaf2] h-[118px] items-start overflow-clip relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 to-[#8cd4e4] w-[128px]" data-name="Container">
      <ImageWithFallback2 />
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="h-[225.922px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback3} />
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-gradient-to-b box-border content-stretch flex flex-col from-[#cceaf2] h-[118px] items-start overflow-clip relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 to-[#8cd4e4] w-[129px]" data-name="Container">
      <ImageWithFallback3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Container19 />
      <Container20 />
      <Container21 />
    </div>
  );
}

function HomePage3() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[340px] items-start overflow-clip pl-0 pr-[12px] py-0 relative shrink-0 w-[414px]" data-name="HomePage">
      <Container18 />
      <Frame />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[12px] h-[442px] items-start left-[959.33px] pb-px pt-[25px] px-[25px] rounded-[10px] top-0 w-[463.656px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <HomePage2 />
      <HomePage3 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[442px] relative shrink-0 w-full" data-name="Container">
      <Card />
      <Card1 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#8cd4e4] items-center justify-center left-0 rounded-[10px] size-[36px] to-[rgba(0,0,0,0)] top-[4px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start left-[48px] top-0 w-[166.156px]" data-name="Heading 4">
      <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1d293d] text-[20px] text-nowrap whitespace-pre">{`Events & Activities`}</p>
    </div>
  );
}

function HomePage4() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="HomePage">
      <Container23 />
      <Heading6 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute h-[27px] left-0 top-0 w-[136.984px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">NOVEMBER 2025</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white relative rounded-[6.8px] shrink-0 size-[28px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[6.8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-px relative size-[28px]">
        <Icon6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 bg-white grow h-[28px] min-h-px min-w-px relative rounded-[6.8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[6.8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-center justify-center p-px relative w-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[28px] items-start left-[264.13px] top-[3.5px] w-[60px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Heading7 />
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute box-border content-stretch flex h-[20px] items-start left-0 pb-[4px] pt-0 px-0 top-0 w-[40.297px]" data-name="Container">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center">S</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute box-border content-stretch flex h-[20px] items-start left-[44.3px] pb-[4px] pt-0 px-0 top-0 w-[40.297px]" data-name="Container">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center">M</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute box-border content-stretch flex h-[20px] items-start left-[88.59px] pb-[4px] pt-0 px-0 top-0 w-[40.313px]" data-name="Container">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center">T</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute box-border content-stretch flex h-[20px] items-start left-[132.91px] pb-[4px] pt-0 px-0 top-0 w-[40.297px]" data-name="Container">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center">W</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute box-border content-stretch flex h-[20px] items-start left-[177.2px] pb-[4px] pt-0 px-0 top-0 w-[40.313px]" data-name="Container">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center">T</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute box-border content-stretch flex h-[20px] items-start left-[221.52px] pb-[4px] pt-0 px-0 top-0 w-[40.297px]" data-name="Container">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center">F</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute box-border content-stretch flex h-[20px] items-start left-[265.81px] pb-[4px] pt-0 px-0 top-0 w-[40.297px]" data-name="Container">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center">S</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Container27 />
      <Container28 />
      <Container29 />
      <Container30 />
      <Container31 />
      <Container32 />
    </div>
  );
}

function Container34() {
  return <div className="absolute left-0 size-[40.297px] top-0" data-name="Container" />;
}

function Container35() {
  return <div className="absolute left-[44.3px] size-[40.297px] top-0" data-name="Container" />;
}

function Container36() {
  return <div className="absolute left-[88.59px] size-[40.313px] top-0" data-name="Container" />;
}

function Container37() {
  return <div className="absolute left-[132.91px] size-[40.297px] top-0" data-name="Container" />;
}

function Container38() {
  return <div className="absolute left-[177.2px] size-[40.313px] top-0" data-name="Container" />;
}

function Container39() {
  return <div className="absolute left-[221.52px] size-[40.297px] top-0" data-name="Container" />;
}

function Button2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[265.81px] rounded-[6.8px] size-[40.297px] top-0" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">1</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 rounded-[6.8px] size-[40.297px] top-[44.31px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">2</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[44.3px] rounded-[6.8px] size-[40.297px] top-[44.31px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">3</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[88.59px] rounded-[6.8px] size-[40.313px] top-[44.31px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">4</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[132.91px] rounded-[6.8px] size-[40.297px] top-[44.31px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">5</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[177.2px] rounded-[6.8px] size-[40.313px] top-[44.31px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">6</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[221.52px] rounded-[6.8px] size-[40.297px] top-[44.31px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">7</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[265.81px] rounded-[6.8px] size-[40.297px] top-[44.31px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">8</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 rounded-[6.8px] size-[40.297px] top-[88.63px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">9</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[44.3px] rounded-[6.8px] size-[40.297px] top-[88.63px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">10</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[88.59px] rounded-[6.8px] size-[40.313px] top-[88.63px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">11</p>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[132.91px] rounded-[6.8px] size-[40.297px] top-[88.63px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">12</p>
    </div>
  );
}

function Button14() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[177.2px] rounded-[6.8px] size-[40.313px] top-[88.63px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">13</p>
    </div>
  );
}

function Button15() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[221.52px] rounded-[6.8px] size-[40.297px] top-[88.63px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">14</p>
    </div>
  );
}

function Button16() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[265.81px] rounded-[6.8px] size-[40.297px] top-[88.63px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">15</p>
    </div>
  );
}

function Button17() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 rounded-[6.8px] size-[40.297px] top-[132.94px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">16</p>
    </div>
  );
}

function Button18() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[44.3px] rounded-[6.8px] size-[40.297px] top-[132.94px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">17</p>
    </div>
  );
}

function Button19() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[88.59px] rounded-[6.8px] size-[40.313px] top-[132.94px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">18</p>
    </div>
  );
}

function Button20() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[132.91px] rounded-[6.8px] size-[40.297px] top-[132.94px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">19</p>
    </div>
  );
}

function Button21() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[177.2px] rounded-[6.8px] size-[40.313px] top-[132.94px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">20</p>
    </div>
  );
}

function Button22() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[221.52px] rounded-[6.8px] size-[40.297px] top-[132.94px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">21</p>
    </div>
  );
}

function Button23() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[265.81px] rounded-[6.8px] size-[40.297px] top-[132.94px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">22</p>
    </div>
  );
}

function Button24() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 rounded-[6.8px] size-[40.297px] top-[177.25px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">23</p>
    </div>
  );
}

function Button25() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[44.3px] rounded-[6.8px] size-[40.297px] top-[177.25px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">24</p>
    </div>
  );
}

function Button26() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[88.59px] rounded-[6.8px] size-[40.313px] top-[177.25px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">25</p>
    </div>
  );
}

function Button27() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[132.91px] rounded-[6.8px] size-[40.297px] top-[177.25px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">26</p>
    </div>
  );
}

function Button28() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[177.2px] rounded-[6.8px] size-[40.313px] top-[177.25px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">27</p>
    </div>
  );
}

function Button29() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[221.52px] rounded-[6.8px] size-[40.297px] top-[177.25px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">28</p>
    </div>
  );
}

function Button30() {
  return (
    <div className="absolute bg-[#7b282d] box-border content-stretch flex items-center justify-center left-[264.81px] rounded-[6.8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[42.312px] top-[176.24px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white whitespace-pre">29</p>
    </div>
  );
}

function Text3() {
  return <div className="absolute bg-[#7b282d] left-[18.14px] rounded-[3.35544e+07px] size-[4px] top-[34.3px]" data-name="Text" />;
}

function Button31() {
  return (
    <div className="absolute bg-blue-100 left-0 rounded-[6.8px] size-[40.297px] top-[221.56px]" data-name="Button">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[19.67px] not-italic text-[#1c398e] text-[12px] text-center text-nowrap top-[11.14px] translate-x-[-50%] whitespace-pre">30</p>
      <Text3 />
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[261.859px] relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Container35 />
      <Container36 />
      <Container37 />
      <Container38 />
      <Container39 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
      <Button15 />
      <Button16 />
      <Button17 />
      <Button18 />
      <Button19 />
      <Button20 />
      <Button21 />
      <Button22 />
      <Button23 />
      <Button24 />
      <Button25 />
      <Button26 />
      <Button27 />
      <Button28 />
      <Button29 />
      <Button30 />
      <Button31 />
    </div>
  );
}

function Container41() {
  return (
    <div className="bg-white h-[307.859px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[307.859px] items-start pb-px pt-[9px] px-[9px] relative w-full">
          <Container33 />
          <Container40 />
        </div>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[#8cd4e4] relative rounded-[4px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap whitespace-pre">Today</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[16px] relative shrink-0 w-[47.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[47.125px]">
        <Container42 />
        <Text4 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-blue-100 relative rounded-[4px] shrink-0 size-[12px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap whitespace-pre">Has Events</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[16px] relative shrink-0 w-[73.047px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[73.047px]">
        <Container44 />
        <Text5 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[16px] items-center justify-center pl-0 pr-[0.016px] py-0 relative w-full">
          <Container43 />
          <Container45 />
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[12px] h-[408.859px] items-start left-0 pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[350.125px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container25 />
      <Container41 />
      <Container46 />
    </div>
  );
}

function Button32() {
  return (
    <div className="absolute bg-[#ec2227] box-border content-stretch flex gap-[6px] h-[28px] items-center justify-center left-0 px-[10px] py-0 rounded-[6.8px] top-0 w-[70.891px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-neutral-50 text-nowrap whitespace-pre">All Events</p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1501aa00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 6.66667V10.6667" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p34e88d80} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button33() {
  return (
    <div className="absolute bg-white border border-neutral-200 border-solid h-[28px] left-[76.89px] rounded-[6.8px] top-0 w-[89.984px]" data-name="Button">
      <Icon8 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[57.5px] not-italic text-[12px] text-center text-neutral-950 text-nowrap top-[4px] translate-x-[-50%] whitespace-pre">Training</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1674e600} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6 14.6667V12H10V14.6667" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 4H5.34" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 4H10.6733" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 4H8.00667" id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 6.66667H8.00667" id="Vector_6" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 9.33333H8.00667" id="Vector_7" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 6.66667H10.6733" id="Vector_8" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 9.33333H10.6733" id="Vector_9" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 6.66667H5.34" id="Vector_10" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 9.33333H5.34" id="Vector_11" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button34() {
  return (
    <div className="absolute bg-white border border-neutral-200 border-solid h-[28px] left-[172.88px] rounded-[6.8px] top-0 w-[97.25px]" data-name="Button">
      <Icon9 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[61.5px] not-italic text-[12px] text-center text-neutral-950 text-nowrap top-[4px] translate-x-[-50%] whitespace-pre">Meetings</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Container">
      <Button32 />
      <Button33 />
      <Button34 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[27px] relative shrink-0 w-[248.688px]" data-name="Heading 5">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[27px] overflow-clip relative rounded-[inherit] w-[248.688px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Annual Audit Planning Meeting</p>
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[#ec2227] h-[18px] relative rounded-[6.8px] shrink-0 w-[58.156px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[58.156px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Meeting</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex h-[35px] items-start justify-between left-0 top-0 w-[413.203px]" data-name="Container">
      <Heading8 />
      <Badge3 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M4 1V3" id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 1V3" id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p333d5300} id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 5H10.5" id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[16px] relative shrink-0 w-[37.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[37.984px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap whitespace-pre">Nov 29</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[16px] relative shrink-0 w-[4.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[4.875px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-nowrap whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6976)" id="Icon">
          <path d="M6 3V6L8 7" id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3e7757b0} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_6976">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[16px] relative shrink-0 w-[108.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[108.734px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap whitespace-pre">10:00 am - 12:00 pm</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon10 />
      <Text6 />
      <Text7 />
      <Icon11 />
      <Text8 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[16px] relative shrink-0 w-[124.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[124.719px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap whitespace-pre">Main Conference Room</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon12 />
      <Text9 />
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[34px] items-start left-0 top-[39px] w-[413.203px]" data-name="Container">
      <Container50 />
      <Container51 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p693a100} id="Vector" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 11V9H7.5V11" id="Vector_2" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 3H4.005" id="Vector_3" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 3H8.005" id="Vector_4" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3H6.005" id="Vector_5" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 5H6.005" id="Vector_6" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 7H6.005" id="Vector_7" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 5H8.005" id="Vector_8" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 7H8.005" id="Vector_9" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 5H4.005" id="Vector_10" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 7H4.005" id="Vector_11" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap whitespace-pre">Financial Audit Authority</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center left-0 top-[79px] w-[146.438px]" data-name="Container">
      <Icon13 />
      <Text10 />
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute h-[95px] left-[98px] top-[10px] w-[413.203px]" data-name="Container">
      <Container49 />
      <Container52 />
      <Container53 />
    </div>
  );
}

function ImageWithFallback4() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback4} />
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#cceaf2] items-start left-[10px] overflow-clip rounded-[10px] size-[80px] to-[#8cd4e4] top-[10px]" data-name="Container">
      <ImageWithFallback4 />
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[115px] relative shrink-0 w-full" data-name="Container">
      <Container54 />
      <Container55 />
    </div>
  );
}

function Container57() {
  return (
    <div className="bg-white h-[117px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col h-[117px] items-start p-px relative w-full">
          <Container56 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[27px] relative shrink-0 w-[228.281px]" data-name="Heading 5">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[27px] overflow-clip relative rounded-[inherit] w-[228.281px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Risk Management Workshop</p>
      </div>
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-[#8cd4e4] h-[18px] relative rounded-[6.8px] shrink-0 w-[152.344px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[152.344px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Professional Development</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex h-[35px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Heading9 />
      <Badge4 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M4 1V3" id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 1V3" id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p333d5300} id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 5H10.5" id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[16px] relative shrink-0 w-[37.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[37.984px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap whitespace-pre">Nov 29</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[16px] relative shrink-0 w-[4.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[4.875px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-nowrap whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6976)" id="Icon">
          <path d="M6 3V6L8 7" id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3e7757b0} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_6976">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[16px] relative shrink-0 w-[96.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[96.75px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap whitespace-pre">2:00 pm - 5:00 pm</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon14 />
      <Text11 />
      <Text12 />
      <Icon15 />
      <Text13 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[16px] relative shrink-0 w-[122.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[122.781px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap whitespace-pre">Training Center, Level 3</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon16 />
      <Text14 />
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[34px] items-start relative shrink-0 w-full" data-name="Container">
      <Container59 />
      <Container60 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3551e700} id="Vector" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 5V8" id="Vector_2" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3d6ddb80} id="Vector_3" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap whitespace-pre">{`FAA Learning & Development`}</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[16px] relative shrink-0 w-[173.031px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[173.031px]">
        <Icon17 />
        <Text15 />
      </div>
    </div>
  );
}

function Badge5() {
  return (
    <div className="h-[18px] relative rounded-[6.8px] shrink-0 w-[48.953px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[48.953px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#00a63e] text-[12px] text-nowrap whitespace-pre">$45.00</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#00a63e] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container62 />
      <Badge5 />
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[97px] items-start left-[98px] top-[10px] w-[413.203px]" data-name="Container">
      <Container58 />
      <Container61 />
      <Container63 />
    </div>
  );
}

function ImageWithFallback5() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback5} />
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#cceaf2] items-start left-[10px] overflow-clip rounded-[10px] size-[80px] to-[#8cd4e4] top-[10px]" data-name="Container">
      <ImageWithFallback5 />
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[117px] relative shrink-0 w-full" data-name="Container">
      <Container64 />
      <Container65 />
    </div>
  );
}

function Container67() {
  return (
    <div className="bg-white h-[119px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col h-[119px] items-start p-px relative w-full">
          <Container66 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[8px] h-[288px] items-start left-[362.13px] overflow-clip pl-0 pr-[8px] py-0 top-0 w-[531.203px]" data-name="Container">
      <Container48 />
      <Container57 />
      <Container67 />
    </div>
  );
}

function HomePage5() {
  return (
    <div className="h-[408.859px] relative shrink-0 w-full" data-name="HomePage">
      <Container47 />
      <Container68 />
    </div>
  );
}

function Card2() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[12px] h-[514.859px] items-start left-0 pb-px pt-[25px] px-[25px] rounded-[10px] top-0 w-[943.328px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <HomePage4 />
      <HomePage5 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_17_6887)" id="Icon">
          <path d={svgPaths.p88b3580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 2H2.67333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 5.33333H14.6733" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 1.33333H10.0067" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 13.3333H14.6733" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1b5fac00} id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p297d6c00} id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1e800740} id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p12c14900} id="Vector_9" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_17_6887">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#7b282d] items-center justify-center left-0 rounded-[10px] size-[36px] to-[#971b1e] top-[4px]" data-name="Container">
      <Icon18 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start left-[44px] top-0 w-[113.484px]" data-name="Heading 4">
      <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1d293d] text-[20px] text-nowrap whitespace-pre">Celebrations</p>
    </div>
  );
}

function HomePage6() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="HomePage">
      <Container69 />
      <Heading10 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_17_6936)" id="Icon">
          <path d={svgPaths.p37e180} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 2.5H3.34167" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 6.66667H18.3417" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M12.5 1.66667H12.5083" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 16.6667H18.3417" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1106df80} id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2461da00} id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p15833570} id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p30bb7e00} id="Vector_9" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_17_6936">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container70() {
  return (
    <div className="bg-gradient-to-b from-[#c91d21] relative rounded-[3.35544e+07px] shrink-0 size-[40px] to-[#7b282d]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon19 />
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[25.594px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-1px] whitespace-pre">Mariam Al Ali</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[25.594px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#6a7282] text-[16px] text-nowrap top-[-1px] whitespace-pre">Promoted to Senior Auditor</p>
    </div>
  );
}

function Container71() {
  return (
    <div className="basis-0 grow h-[83.188px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6px] h-[83.188px] items-start relative w-full">
        <Paragraph4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[86px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[86px] items-start px-[11px] py-[15px] relative w-full">
          <Container70 />
          <Container71 />
        </div>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_17_6936)" id="Icon">
          <path d={svgPaths.p37e180} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 2.5H3.34167" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 6.66667H18.3417" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M12.5 1.66667H12.5083" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 16.6667H18.3417" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1106df80} id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2461da00} id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p15833570} id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p30bb7e00} id="Vector_9" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_17_6936">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container73() {
  return (
    <div className="bg-gradient-to-b from-[#c91d21] relative rounded-[3.35544e+07px] shrink-0 size-[40px] to-[#7b282d]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon20 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[25.594px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-1px] whitespace-pre">Mariam Al Ali</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[25.594px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#6a7282] text-[16px] text-nowrap top-[-1px] whitespace-pre">Welcomed a baby girl</p>
    </div>
  );
}

function Container74() {
  return (
    <div className="basis-0 grow h-[83.188px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[6px] h-[83.188px] items-start relative w-full">
        <Paragraph6 />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[86px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[86px] items-start px-[11px] py-[15px] relative w-full">
          <Container73 />
          <Container74 />
        </div>
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39171dd8} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container76() {
  return (
    <div className="bg-gradient-to-b from-[#413f30] relative rounded-[3.35544e+07px] shrink-0 size-[40px] to-[#908e81]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon21 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[27px] overflow-clip relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">National Day Celebration 2025</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#6a7282] text-[16px] text-nowrap top-[-1px] whitespace-pre">2025-12-02</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="basis-0 grow h-[76.594px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[76.594px] items-start relative w-full">
        <Heading11 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex gap-[8px] h-[76.594px] items-start relative shrink-0 w-full" data-name="Container">
      <Container76 />
      <Container77 />
    </div>
  );
}

function Container79() {
  return (
    <div className="bg-white h-[86px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[86px] items-start pb-px pt-[11px] px-[11px] relative w-full">
          <Container78 />
        </div>
      </div>
    </div>
  );
}

function HomePage7() {
  return (
    <div className="h-[412px] relative shrink-0 w-full" data-name="HomePage">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[412px] items-start pl-0 pr-[8px] py-0 relative w-full">
          {[...Array(2).keys()].map((_, i) => (
            <Container72 key={i} />
          ))}
          <Container75 />
          <Container79 />
        </div>
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[12px] h-[514.859px] items-start left-[959.33px] pb-px pt-[25px] px-[25px] rounded-[10px] top-0 w-[463.656px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <HomePage6 />
      <HomePage7 />
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[514.859px] relative shrink-0 w-full" data-name="Container">
      <Card2 />
      <Card3 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p35b3faa0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#7b282d] items-center justify-center left-0 rounded-[10px] size-[36px] to-[#971b1e] top-[4px]" data-name="Container">
      <Icon22 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start left-[48px] top-0 w-[150.469px]" data-name="Heading 4">
      <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1d293d] text-[20px] text-nowrap whitespace-pre">People Spotlight</p>
    </div>
  );
}

function HomePage8() {
  return (
    <div className="absolute h-[44px] left-[25px] top-[25px] w-[1373px]" data-name="HomePage">
      <Container81 />
      <Heading12 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="absolute left-0 size-[16px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p160f0600} id="Vector" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p27180a80} id="Vector_2" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading13() {
  return (
    <div className="absolute h-[27px] left-[24px] top-0 w-[139.203px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Work Anniversary</p>
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Icon23 />
      <Heading13 />
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[28px] relative shrink-0 w-[18.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[18.422px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-[9.5px] not-italic text-[18px] text-center text-neutral-950 top-[-1px] translate-x-[-50%] w-[19px]">5y</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute bg-[#e4ddc8] box-border content-stretch flex items-center justify-center left-[117px] pl-0 pr-[0.016px] py-0 rounded-[3.35544e+07px] size-[56px] top-0" data-name="Container">
      <Text16 />
    </div>
  );
}

function Heading14() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[290px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[145.42px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Omar Rashid</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.42px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Senior Auditor</p>
    </div>
  );
}

function Container84() {
  return (
    <div className="h-[124.594px] relative shrink-0 w-full" data-name="Container">
      <Container83 />
      <Heading14 />
      <Paragraph9 />
    </div>
  );
}

function HomePage9() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[209.594px] items-start left-[8px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container82 />
      <Container84 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="absolute left-0 size-[16px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14af6540} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading15() {
  return (
    <div className="absolute h-[27px] left-[24px] top-0 w-[102.359px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Condolences</p>
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Icon24 />
      <Heading15 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3f86cd40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container86() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[116px] rounded-[3.35544e+07px] size-[56px] top-0" data-name="Container">
      <Icon25 />
    </div>
  );
}

function Heading16() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[288px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[144.67px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Ahmed Al Mansouri</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[288px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[144.34px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Loss of his father</p>
    </div>
  );
}

function Container87() {
  return (
    <div className="h-[124.594px] relative shrink-0 w-full" data-name="Container">
      <Container86 />
      <Heading16 />
      <Paragraph10 />
    </div>
  );
}

function HomePage10() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[8px] h-[207.594px] items-start left-[340px] pb-0 pl-[16px] pr-[12px] pt-[12px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border-[#99a1af] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container85 />
      <Container87 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="absolute left-0 size-[16px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14af6540} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading17() {
  return (
    <div className="absolute h-[27px] left-[24px] top-0 w-[102.359px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Condolences</p>
    </div>
  );
}

function Container88() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Icon26 />
      <Heading17 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3f86cd40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[116px] rounded-[3.35544e+07px] size-[56px] top-0" data-name="Container">
      <Icon27 />
    </div>
  );
}

function Heading18() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[288px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[144.14px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Fatima Al Shamsi</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[288px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[143.72px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Loss of her mother</p>
    </div>
  );
}

function Container90() {
  return (
    <div className="h-[124.594px] relative shrink-0 w-full" data-name="Container">
      <Container89 />
      <Heading18 />
      <Paragraph11 />
    </div>
  );
}

function HomePage11() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[8px] h-[207.594px] items-start left-[672px] pb-0 pl-[16px] pr-[12px] pt-[12px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border-[#99a1af] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container88 />
      <Container90 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="absolute left-0 size-[16px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14af6540} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading19() {
  return (
    <div className="absolute h-[27px] left-[24px] top-0 w-[102.359px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Condolences</p>
    </div>
  );
}

function Container91() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Icon28 />
      <Heading19 />
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3f86cd40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container92() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[116px] rounded-[3.35544e+07px] size-[56px] top-0" data-name="Container">
      <Icon29 />
    </div>
  );
}

function Heading20() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[288px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[143.56px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Khalid Ibrahim</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[288px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[143.55px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Loss of his grandmother</p>
    </div>
  );
}

function Container93() {
  return (
    <div className="h-[124.594px] relative shrink-0 w-full" data-name="Container">
      <Container92 />
      <Heading20 />
      <Paragraph12 />
    </div>
  );
}

function HomePage12() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[8px] h-[207.594px] items-start left-[1004px] pb-0 pl-[16px] pr-[12px] pt-[12px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border-[#99a1af] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container91 />
      <Container93 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1cb7cc00} id="Vector" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading21() {
  return (
    <div className="h-[27px] relative shrink-0 w-[187.5px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Employee of the Month</p>
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon30 />
      <Heading21 />
    </div>
  );
}

function Heading22() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[290px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[145.09px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Fatima Al Zaabi</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.36px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Lead Auditor - Financial Sector</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute h-[51.188px] left-0 overflow-clip top-[140.59px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.36px] not-italic text-[#364153] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[284px]">Outstanding performance in conducting comprehensive audits and mentoring junior staff members.</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="basis-0 bg-[#7b282d] grow h-[48px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[48px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">FAZ</p>
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="absolute left-[117px] rounded-[3.35544e+07px] size-[56px] top-0" data-name="Primitive.span">
      <div className="box-border content-stretch flex items-start overflow-clip p-[4px] relative rounded-[inherit] size-[56px]">
        <Text17 />
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[#ec2227] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
    </div>
  );
}

function Container95() {
  return (
    <div className="h-[191.781px] relative shrink-0 w-full" data-name="Container">
      <Heading22 />
      <Paragraph13 />
      <Paragraph14 />
      <PrimitiveSpan />
    </div>
  );
}

function HomePage13() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex flex-col from-[#e4ddc8] gap-[8px] h-[251px] items-start left-[1336px] pb-px pt-[13px] px-[13px] rounded-[10px] to-[#ffffff] top-[0.14px] w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container94 />
      <Container95 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p35b3faa0} id="Vector_2" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading23() {
  return (
    <div className="h-[27px] relative shrink-0 w-[75.891px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">New Face</p>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon31 />
      <Heading23 />
    </div>
  );
}

function Heading24() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[290px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[145.83px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Mohammed Ahmed</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[144.97px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Junior Auditor</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[140.59px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.27px] not-italic text-[#6a7282] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[136px]">Joined: 2025-11-15</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="basis-0 bg-[#cceaf2] grow h-[56px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[56px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[16px] text-center text-neutral-950 text-nowrap whitespace-pre">MA</p>
      </div>
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="absolute content-stretch flex items-start left-[117px] overflow-clip rounded-[3.35544e+07px] size-[56px] top-0" data-name="Primitive.span">
      <Text18 />
    </div>
  );
}

function Container97() {
  return (
    <div className="h-[166.188px] relative shrink-0 w-full" data-name="Container">
      <Heading24 />
      <Paragraph15 />
      <Paragraph16 />
      <PrimitiveSpan1 />
    </div>
  );
}

function HomePage14() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[251.188px] items-start left-[1668px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container96 />
      <Container97 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p35b3faa0} id="Vector_2" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading25() {
  return (
    <div className="h-[27px] relative shrink-0 w-[75.891px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">New Face</p>
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon32 />
      <Heading25 />
    </div>
  );
}

function Heading26() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[290px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[145.44px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Sara Abdullah</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.03px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Risk Analyst</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[140.59px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.27px] not-italic text-[#6a7282] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[136px]">Joined: 2025-11-18</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="basis-0 bg-[#cceaf2] grow h-[56px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[56px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[16px] text-center text-neutral-950 text-nowrap whitespace-pre">SA</p>
      </div>
    </div>
  );
}

function PrimitiveSpan2() {
  return (
    <div className="absolute content-stretch flex items-start left-[117px] overflow-clip rounded-[3.35544e+07px] size-[56px] top-0" data-name="Primitive.span">
      <Text19 />
    </div>
  );
}

function Container99() {
  return (
    <div className="h-[166.188px] relative shrink-0 w-full" data-name="Container">
      <Heading26 />
      <Paragraph17 />
      <Paragraph18 />
      <PrimitiveSpan2 />
    </div>
  );
}

function HomePage15() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[251.188px] items-start left-[2000px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container98 />
      <Container99 />
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p35b3faa0} id="Vector_2" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading27() {
  return (
    <div className="h-[27px] relative shrink-0 w-[75.891px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">New Face</p>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon33 />
      <Heading27 />
    </div>
  );
}

function Heading28() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[290px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[145.58px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Ali Hassan</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.16px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">IT Specialist</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[140.59px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.27px] not-italic text-[#6a7282] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[136px]">Joined: 2025-11-20</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="basis-0 bg-[#cceaf2] grow h-[56px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[56px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[16px] text-center text-neutral-950 text-nowrap whitespace-pre">AH</p>
      </div>
    </div>
  );
}

function PrimitiveSpan3() {
  return (
    <div className="absolute content-stretch flex items-start left-[117px] overflow-clip rounded-[3.35544e+07px] size-[56px] top-0" data-name="Primitive.span">
      <Text20 />
    </div>
  );
}

function Container101() {
  return (
    <div className="h-[166.188px] relative shrink-0 w-full" data-name="Container">
      <Heading28 />
      <Paragraph19 />
      <Paragraph20 />
      <PrimitiveSpan3 />
    </div>
  );
}

function HomePage16() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[251.188px] items-start left-[2332px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container100 />
      <Container101 />
    </div>
  );
}

function Icon34() {
  return (
    <div className="absolute left-0 size-[16px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p160f0600} id="Vector" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p27180a80} id="Vector_2" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading29() {
  return (
    <div className="absolute h-[27px] left-[24px] top-0 w-[139.203px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Work Anniversary</p>
    </div>
  );
}

function Container102() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Icon34 />
      <Heading29 />
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[28px] relative shrink-0 w-[28.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[28.125px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-[14.5px] not-italic text-[18px] text-center text-neutral-950 top-[-1px] translate-x-[-50%] w-[29px]">15y</p>
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="absolute bg-[#e4ddc8] content-stretch flex items-center justify-center left-[117px] rounded-[3.35544e+07px] size-[56px] top-0" data-name="Container">
      <Text21 />
    </div>
  );
}

function Heading30() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[290px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[145.09px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Khalid Al Mansoori</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.55px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Senior Director</p>
    </div>
  );
}

function Container104() {
  return (
    <div className="h-[124.594px] relative shrink-0 w-full" data-name="Container">
      <Container103 />
      <Heading30 />
      <Paragraph21 />
    </div>
  );
}

function HomePage17() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[209.594px] items-start left-[2664px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container102 />
      <Container104 />
    </div>
  );
}

function Icon35() {
  return (
    <div className="absolute left-0 size-[16px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p160f0600} id="Vector" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p27180a80} id="Vector_2" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading31() {
  return (
    <div className="absolute h-[27px] left-[24px] top-0 w-[139.203px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Work Anniversary</p>
    </div>
  );
}

function Container105() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Icon35 />
      <Heading31 />
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[28px] relative shrink-0 w-[28.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[28.125px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-[14.5px] not-italic text-[18px] text-center text-neutral-950 top-[-1px] translate-x-[-50%] w-[29px]">10y</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="absolute bg-[#e4ddc8] content-stretch flex items-center justify-center left-[117px] rounded-[3.35544e+07px] size-[56px] top-0" data-name="Container">
      <Text22 />
    </div>
  );
}

function Heading32() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[290px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[144.52px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Aisha Mohammed</p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.73px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Audit Manager</p>
    </div>
  );
}

function Container107() {
  return (
    <div className="h-[124.594px] relative shrink-0 w-full" data-name="Container">
      <Container106 />
      <Heading32 />
      <Paragraph22 />
    </div>
  );
}

function HomePage18() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[209.594px] items-start left-[2996px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container105 />
      <Container107 />
    </div>
  );
}

function Icon36() {
  return (
    <div className="absolute left-0 size-[16px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p160f0600} id="Vector" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p27180a80} id="Vector_2" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading33() {
  return (
    <div className="absolute h-[27px] left-[24px] top-0 w-[139.203px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Work Anniversary</p>
    </div>
  );
}

function Container108() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Icon36 />
      <Heading33 />
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[28px] relative shrink-0 w-[18.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[18.422px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-[9.5px] not-italic text-[18px] text-center text-neutral-950 top-[-1px] translate-x-[-50%] w-[19px]">5y</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="absolute bg-[#e4ddc8] box-border content-stretch flex items-center justify-center left-[117px] pl-0 pr-[0.016px] py-0 rounded-[3.35544e+07px] size-[56px] top-0" data-name="Container">
      <Text23 />
    </div>
  );
}

function Heading34() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[290px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[145.42px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Omar Rashid</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.42px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Senior Auditor</p>
    </div>
  );
}

function Container110() {
  return (
    <div className="h-[124.594px] relative shrink-0 w-full" data-name="Container">
      <Container109 />
      <Heading34 />
      <Paragraph23 />
    </div>
  );
}

function HomePage19() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[209.594px] items-start left-[3328px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container108 />
      <Container110 />
    </div>
  );
}

function Icon37() {
  return (
    <div className="absolute left-0 size-[16px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14af6540} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading35() {
  return (
    <div className="absolute h-[27px] left-[24px] top-0 w-[102.359px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Condolences</p>
    </div>
  );
}

function Container111() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Icon37 />
      <Heading35 />
    </div>
  );
}

function Icon38() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3f86cd40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container112() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[116px] rounded-[3.35544e+07px] size-[56px] top-0" data-name="Container">
      <Icon38 />
    </div>
  );
}

function Heading36() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[288px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[144.67px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Ahmed Al Mansouri</p>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[288px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[144.34px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Loss of his father</p>
    </div>
  );
}

function Container113() {
  return (
    <div className="h-[124.594px] relative shrink-0 w-full" data-name="Container">
      <Container112 />
      <Heading36 />
      <Paragraph24 />
    </div>
  );
}

function HomePage20() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[8px] h-[207.594px] items-start left-[3660px] pb-0 pl-[16px] pr-[12px] pt-[12px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border-[#99a1af] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container111 />
      <Container113 />
    </div>
  );
}

function Icon39() {
  return (
    <div className="absolute left-0 size-[16px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14af6540} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading37() {
  return (
    <div className="absolute h-[27px] left-[24px] top-0 w-[102.359px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Condolences</p>
    </div>
  );
}

function Container114() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Icon39 />
      <Heading37 />
    </div>
  );
}

function Icon40() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3f86cd40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container115() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[116px] rounded-[3.35544e+07px] size-[56px] top-0" data-name="Container">
      <Icon40 />
    </div>
  );
}

function Heading38() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[288px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[144.14px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Fatima Al Shamsi</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[288px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[143.72px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Loss of her mother</p>
    </div>
  );
}

function Container116() {
  return (
    <div className="h-[124.594px] relative shrink-0 w-full" data-name="Container">
      <Container115 />
      <Heading38 />
      <Paragraph25 />
    </div>
  );
}

function HomePage21() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[8px] h-[207.594px] items-start left-[3992px] pb-0 pl-[16px] pr-[12px] pt-[12px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border-[#99a1af] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container114 />
      <Container116 />
    </div>
  );
}

function Icon41() {
  return (
    <div className="absolute left-0 size-[16px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14af6540} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading39() {
  return (
    <div className="absolute h-[27px] left-[24px] top-0 w-[102.359px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Condolences</p>
    </div>
  );
}

function Container117() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Icon41 />
      <Heading39 />
    </div>
  );
}

function Icon42() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3f86cd40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container118() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[116px] rounded-[3.35544e+07px] size-[56px] top-0" data-name="Container">
      <Icon42 />
    </div>
  );
}

function Heading40() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[288px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[143.56px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Khalid Ibrahim</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[288px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[143.55px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Loss of his grandmother</p>
    </div>
  );
}

function Container119() {
  return (
    <div className="h-[124.594px] relative shrink-0 w-full" data-name="Container">
      <Container118 />
      <Heading40 />
      <Paragraph26 />
    </div>
  );
}

function HomePage22() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[8px] h-[207.594px] items-start left-[4324px] pb-0 pl-[16px] pr-[12px] pt-[12px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border-[#99a1af] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container117 />
      <Container119 />
    </div>
  );
}

function Icon43() {
  return (
    <div className="absolute left-0 size-[16px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1a3b8040} id="Vector" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading41() {
  return (
    <div className="absolute h-[27px] left-[24px] top-0 w-[187.5px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Employee of the Month</p>
    </div>
  );
}

function Container120() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Icon43 />
      <Heading41 />
    </div>
  );
}

function Heading42() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[290px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[145.09px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Fatima Al Zaabi</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.36px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Lead Auditor - Financial Sector</p>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="absolute h-[51.188px] left-0 overflow-clip top-[140.59px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.36px] not-italic text-[#364153] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[284px]">Outstanding performance in conducting comprehensive audits and mentoring junior staff members.</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="basis-0 bg-[#7b282d] grow h-[48px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[48px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">FAZ</p>
      </div>
    </div>
  );
}

function PrimitiveSpan4() {
  return (
    <div className="absolute left-[117px] rounded-[3.35544e+07px] size-[56px] top-0" data-name="Primitive.span">
      <div className="box-border content-stretch flex items-start overflow-clip p-[4px] relative rounded-[inherit] size-[56px]">
        <Text24 />
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[#ec2227] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
    </div>
  );
}

function Container121() {
  return (
    <div className="h-[191.781px] relative shrink-0 w-full" data-name="Container">
      <Heading42 />
      <Paragraph27 />
      <Paragraph28 />
      <PrimitiveSpan4 />
    </div>
  );
}

function HomePage23() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex flex-col from-[#e4ddc8] gap-[8px] h-[276.781px] items-start left-[4656px] pb-px pt-[13px] px-[13px] rounded-[10px] to-[#ffffff] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container120 />
      <Container121 />
    </div>
  );
}

function Icon44() {
  return (
    <div className="absolute left-0 size-[16px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p35b3faa0} id="Vector_2" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading43() {
  return (
    <div className="absolute h-[27px] left-[24px] top-0 w-[75.891px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">New Face</p>
    </div>
  );
}

function Container122() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Icon44 />
      <Heading43 />
    </div>
  );
}

function Heading44() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[290px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[145.83px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Mohammed Ahmed</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[144.97px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Junior Auditor</p>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[140.59px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.27px] not-italic text-[#6a7282] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[136px]">Joined: 2025-11-15</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="basis-0 bg-[#cceaf2] grow h-[56px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[56px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[16px] text-center text-neutral-950 text-nowrap whitespace-pre">MA</p>
      </div>
    </div>
  );
}

function PrimitiveSpan5() {
  return (
    <div className="absolute content-stretch flex items-start left-[117px] overflow-clip rounded-[3.35544e+07px] size-[56px] top-0" data-name="Primitive.span">
      <Text25 />
    </div>
  );
}

function Container123() {
  return (
    <div className="h-[166.188px] relative shrink-0 w-full" data-name="Container">
      <Heading44 />
      <Paragraph29 />
      <Paragraph30 />
      <PrimitiveSpan5 />
    </div>
  );
}

function HomePage24() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[251.188px] items-start left-[4988px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container122 />
      <Container123 />
    </div>
  );
}

function Icon45() {
  return (
    <div className="absolute left-0 size-[16px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p35b3faa0} id="Vector_2" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading45() {
  return (
    <div className="absolute h-[27px] left-[24px] top-0 w-[75.891px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">New Face</p>
    </div>
  );
}

function Container124() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Icon45 />
      <Heading45 />
    </div>
  );
}

function Heading46() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[290px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[145.44px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Sara Abdullah</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.03px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Risk Analyst</p>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[140.59px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.27px] not-italic text-[#6a7282] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[136px]">Joined: 2025-11-18</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="basis-0 bg-[#cceaf2] grow h-[56px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[56px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[16px] text-center text-neutral-950 text-nowrap whitespace-pre">SA</p>
      </div>
    </div>
  );
}

function PrimitiveSpan6() {
  return (
    <div className="absolute content-stretch flex items-start left-[117px] overflow-clip rounded-[3.35544e+07px] size-[56px] top-0" data-name="Primitive.span">
      <Text26 />
    </div>
  );
}

function Container125() {
  return (
    <div className="h-[166.188px] relative shrink-0 w-full" data-name="Container">
      <Heading46 />
      <Paragraph31 />
      <Paragraph32 />
      <PrimitiveSpan6 />
    </div>
  );
}

function HomePage25() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[251.188px] items-start left-[5320px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container124 />
      <Container125 />
    </div>
  );
}

function Icon46() {
  return (
    <div className="absolute left-0 size-[16px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p35b3faa0} id="Vector_2" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading47() {
  return (
    <div className="absolute h-[27px] left-[24px] top-0 w-[75.891px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">New Face</p>
    </div>
  );
}

function Container126() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
      <Icon46 />
      <Heading47 />
    </div>
  );
}

function Heading48() {
  return (
    <div className="absolute h-[27px] left-0 top-[64px] w-[290px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[145.58px] not-italic text-[18px] text-center text-neutral-950 text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Ali Hassan</p>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[99px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.16px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">IT Specialist</p>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="absolute h-[25.594px] left-0 top-[140.59px] w-[290px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[145.27px] not-italic text-[#6a7282] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[136px]">Joined: 2025-11-20</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="basis-0 bg-[#cceaf2] grow h-[56px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[56px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[25.6px] not-italic relative shrink-0 text-[16px] text-center text-neutral-950 text-nowrap whitespace-pre">AH</p>
      </div>
    </div>
  );
}

function PrimitiveSpan7() {
  return (
    <div className="absolute content-stretch flex items-start left-[117px] overflow-clip rounded-[3.35544e+07px] size-[56px] top-0" data-name="Primitive.span">
      <Text27 />
    </div>
  );
}

function Container127() {
  return (
    <div className="h-[166.188px] relative shrink-0 w-full" data-name="Container">
      <Heading48 />
      <Paragraph33 />
      <Paragraph34 />
      <PrimitiveSpan7 />
    </div>
  );
}

function HomePage26() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[251.188px] items-start left-[5652px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[316px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container126 />
      <Container127 />
    </div>
  );
}

function Container128() {
  return (
    <div className="h-[276.781px] relative shrink-0 w-full" data-name="Container">
      <HomePage9 />
      <HomePage10 />
      <HomePage11 />
      <HomePage12 />
      <HomePage13 />
      <HomePage14 />
      <HomePage15 />
      <HomePage16 />
      <HomePage17 />
      <HomePage18 />
      <HomePage19 />
      <HomePage20 />
      <HomePage21 />
      <HomePage22 />
      <HomePage23 />
      <HomePage24 />
      <HomePage25 />
      <HomePage26 />
    </div>
  );
}

function Container129() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[276.781px] items-start left-0 overflow-clip py-0 top-0 w-[1325px]" data-name="Container">
      <Container128 />
    </div>
  );
}

function Icon47() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PeoplePrevArrow() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[-12px] p-px rounded-[3.35544e+07px] size-[32px] top-[122.39px]" data-name="PeoplePrevArrow">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
      <Icon47 />
    </div>
  );
}

function Icon48() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PeopleNextArrow() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[1305px] p-px rounded-[3.35544e+07px] size-[32px] top-[122.39px]" data-name="PeopleNextArrow">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
      <Icon48 />
    </div>
  );
}

function N() {
  return (
    <div className="absolute h-[276.781px] left-[49px] top-[81px] w-[1325px]" data-name="n16">
      <Container129 />
      <PeoplePrevArrow />
      <PeopleNextArrow />
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white h-[382.781px] relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <HomePage8 />
      <N />
    </div>
  );
}

function Icon49() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1c647980} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p13d22180} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container130() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#7b282d] items-center justify-center left-0 rounded-[10px] size-[36px] to-[#971b1e] top-[4px]" data-name="Container">
      <Icon49 />
    </div>
  );
}

function Heading49() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start left-[48px] top-0 w-[295.781px]" data-name="Heading 4">
      <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1d293d] text-[20px] text-nowrap whitespace-pre">{`Internal Job Postings & Transfers`}</p>
    </div>
  );
}

function Container131() {
  return (
    <div className="h-[44px] relative shrink-0 w-[343.781px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-[343.781px]">
        <Container130 />
        <Heading49 />
      </div>
    </div>
  );
}

function Button35() {
  return (
    <div className="h-[36px] relative rounded-[6.8px] shrink-0 w-[55.797px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center relative w-[55.797px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#7b282d] text-[12px] text-center text-nowrap whitespace-pre">View All →</p>
      </div>
    </div>
  );
}

function HomePage27() {
  return (
    <div className="content-stretch flex h-[44px] items-center justify-between relative shrink-0 w-full" data-name="HomePage">
      <Container131 />
      <Button35 />
    </div>
  );
}

function Heading50() {
  return (
    <div className="h-[27px] overflow-clip relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Senior Financial Auditor</p>
    </div>
  );
}

function Badge6() {
  return (
    <div className="absolute bg-[#7b282d] h-[18px] left-0 rounded-[6.8px] top-0 w-[47.563px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[47.563px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Senior</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Badge7() {
  return (
    <div className="absolute bg-gray-50 h-[18px] left-[51.56px] rounded-[6.8px] top-0 w-[60.859px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[60.859px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Full-time</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container132() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <Badge6 />
      <Badge7 />
    </div>
  );
}

function Container133() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[62px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Heading50 />
      <Container132 />
    </div>
  );
}

function Icon50() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p693a100} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 11V9H7.5V11" id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 3H4.005" id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 3H8.005" id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3H6.005" id="Vector_5" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 5H6.005" id="Vector_6" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 7H6.005" id="Vector_7" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 5H8.005" id="Vector_8" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 7H8.005" id="Vector_9" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 5H4.005" id="Vector_10" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 7H4.005" id="Vector_11" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[16px] relative shrink-0 w-[77.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[77.781px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap whitespace-pre">Financial Audit</p>
      </div>
    </div>
  );
}

function Container134() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon50 />
      <Text28 />
    </div>
  );
}

function Icon51() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[16px] relative shrink-0 w-[56.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[56.156px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap whitespace-pre">Abu Dhabi</p>
      </div>
    </div>
  );
}

function Container135() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon51 />
      <Text29 />
    </div>
  );
}

function Icon52() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6976)" id="Icon">
          <path d="M6 3V6L8 7" id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3e7757b0} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_6976">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[16px] relative shrink-0 w-[114px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[114px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] top-[-1px] w-[114px]">Deadline: 2025-12-15</p>
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon52 />
      <Text30 />
    </div>
  );
}

function Container137() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Container134 />
      <Container135 />
      <Container136 />
    </div>
  );
}

function Container138() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[152px] items-start left-0 pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[436.656px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container133 />
      <Container137 />
    </div>
  );
}

function Heading51() {
  return (
    <div className="h-[27px] overflow-clip relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Risk Assessment Specialist</p>
    </div>
  );
}

function Badge8() {
  return (
    <div className="absolute bg-[#7b282d] h-[18px] left-0 rounded-[6.8px] top-0 w-[63.672px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[63.672px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Mid-level</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Badge9() {
  return (
    <div className="absolute bg-gray-50 h-[18px] left-[67.67px] rounded-[6.8px] top-0 w-[60.859px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[60.859px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Full-time</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container139() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <Badge8 />
      <Badge9 />
    </div>
  );
}

function Container140() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[62px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Heading51 />
      <Container139 />
    </div>
  );
}

function Icon53() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p693a100} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 11V9H7.5V11" id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 3H4.005" id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 3H8.005" id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3H6.005" id="Vector_5" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 5H6.005" id="Vector_6" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 7H6.005" id="Vector_7" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 5H8.005" id="Vector_8" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 7H8.005" id="Vector_9" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 5H4.005" id="Vector_10" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 7H4.005" id="Vector_11" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[16px] relative shrink-0 w-[95.016px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[95.016px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap whitespace-pre">Risk Management</p>
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon53 />
      <Text31 />
    </div>
  );
}

function Icon54() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[16px] relative shrink-0 w-[31.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[31.281px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap whitespace-pre">Dubai</p>
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon54 />
      <Text32 />
    </div>
  );
}

function Icon55() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6976)" id="Icon">
          <path d="M6 3V6L8 7" id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3e7757b0} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_6976">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[16px] relative shrink-0 w-[114px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[114px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] top-[-1px] w-[114px]">Deadline: 2025-12-20</p>
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon55 />
      <Text33 />
    </div>
  );
}

function Container144() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Container141 />
      <Container142 />
      <Container143 />
    </div>
  );
}

function Container145() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[152px] items-start left-[448.66px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[436.672px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container140 />
      <Container144 />
    </div>
  );
}

function Heading52() {
  return (
    <div className="h-[27px] overflow-clip relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">IT Audit Manager</p>
    </div>
  );
}

function Badge10() {
  return (
    <div className="absolute bg-[#7b282d] h-[18px] left-0 rounded-[6.8px] top-0 w-[61.297px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[61.297px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Manager</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Badge11() {
  return (
    <div className="absolute bg-gray-50 h-[18px] left-[65.3px] rounded-[6.8px] top-0 w-[60.859px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[60.859px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Full-time</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container146() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <Badge10 />
      <Badge11 />
    </div>
  );
}

function Container147() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[62px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Heading52 />
      <Container146 />
    </div>
  );
}

function Icon56() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p693a100} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 11V9H7.5V11" id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 3H4.005" id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 3H8.005" id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3H6.005" id="Vector_5" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 5H6.005" id="Vector_6" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 7H6.005" id="Vector_7" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 5H8.005" id="Vector_8" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 7H8.005" id="Vector_9" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 5H4.005" id="Vector_10" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 7H4.005" id="Vector_11" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[16px] relative shrink-0 w-[41.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[41.344px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap whitespace-pre">IT Audit</p>
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon56 />
      <Text34 />
    </div>
  );
}

function Icon57() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[16px] relative shrink-0 w-[56.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[56.156px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap whitespace-pre">Abu Dhabi</p>
      </div>
    </div>
  );
}

function Container149() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon57 />
      <Text35 />
    </div>
  );
}

function Icon58() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6976)" id="Icon">
          <path d="M6 3V6L8 7" id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3e7757b0} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_6976">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[16px] relative shrink-0 w-[114px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[114px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] top-[-1px] w-[114px]">Deadline: 2025-12-25</p>
      </div>
    </div>
  );
}

function Container150() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon58 />
      <Text36 />
    </div>
  );
}

function Container151() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Container148 />
      <Container149 />
      <Container150 />
    </div>
  );
}

function Container152() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[152px] items-start left-0 pb-px pt-[13px] px-[13px] rounded-[10px] top-[164px] w-[436.656px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container147 />
      <Container151 />
    </div>
  );
}

function Heading53() {
  return (
    <div className="h-[27px] overflow-clip relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Junior Internal Auditor</p>
    </div>
  );
}

function Badge12() {
  return (
    <div className="absolute bg-[#7b282d] h-[18px] left-0 rounded-[6.8px] top-0 w-[45.984px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[45.984px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Junior</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Badge13() {
  return (
    <div className="absolute bg-gray-50 h-[18px] left-[49.98px] rounded-[6.8px] top-0 w-[60.859px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[60.859px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Full-time</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container153() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <Badge12 />
      <Badge13 />
    </div>
  );
}

function Container154() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[62px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Heading53 />
      <Container153 />
    </div>
  );
}

function Icon59() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p693a100} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 11V9H7.5V11" id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 3H4.005" id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 3H8.005" id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3H6.005" id="Vector_5" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 5H6.005" id="Vector_6" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 7H6.005" id="Vector_7" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 5H8.005" id="Vector_8" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 7H8.005" id="Vector_9" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 5H4.005" id="Vector_10" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 7H4.005" id="Vector_11" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[16px] relative shrink-0 w-[72.172px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[72.172px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap whitespace-pre">Internal Audit</p>
      </div>
    </div>
  );
}

function Container155() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon59 />
      <Text37 />
    </div>
  );
}

function Icon60() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[16px] relative shrink-0 w-[56.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[56.156px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap whitespace-pre">Abu Dhabi</p>
      </div>
    </div>
  );
}

function Container156() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon60 />
      <Text38 />
    </div>
  );
}

function Icon61() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6976)" id="Icon">
          <path d="M6 3V6L8 7" id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3e7757b0} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_6976">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text39() {
  return (
    <div className="h-[16px] relative shrink-0 w-[114px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[114px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] top-[-1px] w-[114px]">Deadline: 2025-12-18</p>
      </div>
    </div>
  );
}

function Container157() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon61 />
      <Text39 />
    </div>
  );
}

function Container158() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Container155 />
      <Container156 />
      <Container157 />
    </div>
  );
}

function Container159() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[152px] items-start left-[448.66px] pb-px pt-[13px] px-[13px] rounded-[10px] top-[164px] w-[436.672px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container154 />
      <Container158 />
    </div>
  );
}

function Heading54() {
  return (
    <div className="h-[27px] overflow-clip relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Compliance Officer</p>
    </div>
  );
}

function Badge14() {
  return (
    <div className="absolute bg-[#7b282d] h-[18px] left-0 rounded-[6.8px] top-0 w-[63.672px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[63.672px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Mid-level</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Badge15() {
  return (
    <div className="absolute bg-gray-50 h-[18px] left-[67.67px] rounded-[6.8px] top-0 w-[60.859px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[60.859px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Full-time</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container160() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <Badge14 />
      <Badge15 />
    </div>
  );
}

function Container161() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[62px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Heading54 />
      <Container160 />
    </div>
  );
}

function Icon62() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p693a100} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 11V9H7.5V11" id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 3H4.005" id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 3H8.005" id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3H6.005" id="Vector_5" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 5H6.005" id="Vector_6" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 7H6.005" id="Vector_7" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 5H8.005" id="Vector_8" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 7H8.005" id="Vector_9" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 5H4.005" id="Vector_10" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 7H4.005" id="Vector_11" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[16px] relative shrink-0 w-[62.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[62.391px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap whitespace-pre">Compliance</p>
      </div>
    </div>
  );
}

function Container162() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon62 />
      <Text40 />
    </div>
  );
}

function Icon63() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text41() {
  return (
    <div className="h-[16px] relative shrink-0 w-[31.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[31.281px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap whitespace-pre">Dubai</p>
      </div>
    </div>
  );
}

function Container163() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon63 />
      <Text41 />
    </div>
  );
}

function Icon64() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6976)" id="Icon">
          <path d="M6 3V6L8 7" id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3e7757b0} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_6976">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[16px] relative shrink-0 w-[114px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[114px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] top-[-1px] w-[114px]">Deadline: 2025-12-22</p>
      </div>
    </div>
  );
}

function Container164() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon64 />
      <Text42 />
    </div>
  );
}

function Container165() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Container162 />
      <Container163 />
      <Container164 />
    </div>
  );
}

function Container166() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[152px] items-start left-0 pb-px pt-[13px] px-[13px] rounded-[10px] top-[328px] w-[436.656px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container161 />
      <Container165 />
    </div>
  );
}

function Heading55() {
  return (
    <div className="h-[27px] overflow-clip relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Data Analytics Specialist</p>
    </div>
  );
}

function Badge16() {
  return (
    <div className="absolute bg-[#7b282d] h-[18px] left-0 rounded-[6.8px] top-0 w-[63.672px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[63.672px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Mid-level</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Badge17() {
  return (
    <div className="absolute bg-gray-50 h-[18px] left-[67.67px] rounded-[6.8px] top-0 w-[60.859px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[60.859px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Full-time</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container167() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <Badge16 />
      <Badge17 />
    </div>
  );
}

function Container168() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[62px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Heading55 />
      <Container167 />
    </div>
  );
}

function Icon65() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p693a100} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 11V9H7.5V11" id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 3H4.005" id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 3H8.005" id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3H6.005" id="Vector_5" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 5H6.005" id="Vector_6" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 7H6.005" id="Vector_7" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 5H8.005" id="Vector_8" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 7H8.005" id="Vector_9" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 5H4.005" id="Vector_10" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 7H4.005" id="Vector_11" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text43() {
  return (
    <div className="h-[16px] relative shrink-0 w-[41.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[41.344px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap whitespace-pre">IT Audit</p>
      </div>
    </div>
  );
}

function Container169() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon65 />
      <Text43 />
    </div>
  );
}

function Icon66() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text44() {
  return (
    <div className="h-[16px] relative shrink-0 w-[56.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start overflow-clip relative rounded-[inherit] w-[56.156px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap whitespace-pre">Abu Dhabi</p>
      </div>
    </div>
  );
}

function Container170() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon66 />
      <Text44 />
    </div>
  );
}

function Icon67() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6976)" id="Icon">
          <path d="M6 3V6L8 7" id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3e7757b0} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_6976">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text45() {
  return (
    <div className="h-[16px] relative shrink-0 w-[114px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[114px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#364153] text-[12px] top-[-1px] w-[114px]">Deadline: 2025-12-30</p>
      </div>
    </div>
  );
}

function Container171() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon67 />
      <Text45 />
    </div>
  );
}

function Container172() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Container169 />
      <Container170 />
      <Container171 />
    </div>
  );
}

function Container173() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[152px] items-start left-[448.66px] pb-px pt-[13px] px-[13px] rounded-[10px] top-[328px] w-[436.672px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container168 />
      <Container172 />
    </div>
  );
}

function HomePage28() {
  return (
    <div className="h-[320px] overflow-clip relative shrink-0 w-full" data-name="HomePage">
      <Container138 />
      <Container145 />
      <Container152 />
      <Container159 />
      <Container166 />
      <Container173 />
    </div>
  );
}

function Card5() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[12px] h-[426px] items-start left-0 pb-px pt-[25px] px-[25px] rounded-[10px] top-0 w-[943.328px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <HomePage27 />
      <HomePage28 />
    </div>
  );
}

function Icon68() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p223a4880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 5.33333V14" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1beeb960} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17fa7280} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container174() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#7b282d] items-center justify-center left-0 rounded-[10px] size-[36px] to-[#971b1e] top-[4px]" data-name="Container">
      <Icon68 />
    </div>
  );
}

function Heading56() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start left-[44px] top-0 w-[149.75px]" data-name="Heading 4">
      <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1d293d] text-[20px] text-nowrap whitespace-pre">Employee Offers</p>
    </div>
  );
}

function HomePage29() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="HomePage">
      <Container174 />
      <Heading56 />
    </div>
  );
}

function Icon69() {
  return (
    <div className="absolute left-[13px] size-[28px] top-[13px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p1e4bec00} id="Vector" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M14 9.33333V24.5" id="Vector_2" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p281fe780} id="Vector_3" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.pfde8840} id="Vector_4" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading57() {
  return (
    <div className="absolute h-[27px] left-[13px] top-[49px] w-[387.656px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Essad Program</p>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="absolute h-[25.594px] left-[13px] top-[84px] w-[387.656px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-1px] whitespace-pre">Exclusive member benefits and discounts</p>
    </div>
  );
}

function Container175() {
  return (
    <div className="bg-white h-[138.594px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon69 />
      <Heading57 />
      <Paragraph35 />
    </div>
  );
}

function Icon70() {
  return (
    <div className="absolute left-[13px] size-[28px] top-[13px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p151d7c00} id="Vector" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading58() {
  return (
    <div className="absolute h-[27px] left-[13px] top-[49px] w-[387.656px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Fazza Benefits</p>
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="absolute h-[25.594px] left-[13px] top-[84px] w-[387.656px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-1px] whitespace-pre">{`Healthcare & wellness programs`}</p>
    </div>
  );
}

function Container176() {
  return (
    <div className="bg-white h-[138.594px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon70 />
      <Heading58 />
      <Paragraph36 />
    </div>
  );
}

function Icon71() {
  return (
    <div className="absolute left-[13px] size-[28px] top-[13px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p2e0b3f80} id="Vector" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading59() {
  return (
    <div className="absolute h-[27px] left-[13px] top-[49px] w-[387.656px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Partner Discounts</p>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="absolute h-[25.594px] left-[13px] top-[84px] w-[387.656px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-1px] whitespace-pre">15+ retail and service partners</p>
    </div>
  );
}

function Container177() {
  return (
    <div className="bg-white h-[138.594px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon71 />
      <Heading59 />
      <Paragraph37 />
    </div>
  );
}

function HomePage30() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[439.781px] items-start relative shrink-0 w-full" data-name="HomePage">
      <Container175 />
      <Container176 />
      <Container177 />
    </div>
  );
}

function Card6() {
  return (
    <div className="absolute bg-white h-[426px] left-[959px] rounded-[10px] top-[0.36px] w-[464px]" data-name="Card">
      <div className="box-border content-stretch flex flex-col gap-[12px] h-[426px] items-start overflow-clip pb-px pt-[25px] px-[25px] relative rounded-[inherit] w-[464px]">
        <HomePage29 />
        <HomePage30 />
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container178() {
  return (
    <div className="h-[426px] relative shrink-0 w-full" data-name="Container">
      <Card5 />
      <Card6 />
    </div>
  );
}

function Icon72() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p13832a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container179() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#7b282d] items-center justify-center left-0 rounded-[10px] size-[36px] to-[#971b1e] top-[4px]" data-name="Container">
      <Icon72 />
    </div>
  );
}

function Heading60() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start left-[48px] top-0 w-[210.125px]" data-name="Heading 4">
      <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1d293d] text-[20px] text-nowrap whitespace-pre">Recommended For You</p>
    </div>
  );
}

function HomePage31() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="HomePage">
      <Container179 />
      <Heading60 />
    </div>
  );
}

function ImageWithFallback6() {
  return (
    <div className="h-[160.875px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback6} />
    </div>
  );
}

function Container180() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#cceaf2] h-[160.875px] items-start overflow-clip relative shrink-0 to-[#8cd4e4] w-full" data-name="Container">
      <ImageWithFallback6 />
    </div>
  );
}

function Icon73() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container181() {
  return (
    <div className="bg-[rgba(140,212,228,0.13)] relative rounded-[3.35544e+07px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon73 />
      </div>
    </div>
  );
}

function Badge18() {
  return (
    <div className="bg-[#8cd4e4] h-[18px] relative rounded-[6.8px] shrink-0 w-[86.75px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[86.75px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Places to Visit</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container182() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Container181 />
      <Badge18 />
    </div>
  );
}

function Heading61() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Museum of the Future</p>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="h-[51.188px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] top-[-1px] w-[210px]">Explore innovation and future technology</p>
    </div>
  );
}

function Icon74() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text46() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap whitespace-pre">Dubai</p>
      </div>
    </div>
  );
}

function Container183() {
  return (
    <div className="h-[16px] relative shrink-0 w-[47.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[47.281px]">
        <Icon74 />
        <Text46 />
      </div>
    </div>
  );
}

function Icon75() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6856)" id="Icon">
          <path d={svgPaths.p1eeee000} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_6856">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text47() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">4.8</p>
      </div>
    </div>
  );
}

function Container184() {
  return (
    <div className="h-[16px] relative shrink-0 w-[31.547px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[31.547px]">
        <Icon75 />
        <Text47 />
      </div>
    </div>
  );
}

function Container185() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container183 />
      <Container184 />
    </div>
  );
}

function Container186() {
  return (
    <div className="h-[174.188px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[174.188px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Container182 />
          <Heading61 />
          <Paragraph38 />
          <Container185 />
        </div>
      </div>
    </div>
  );
}

function Container187() {
  return (
    <div className="bg-white h-[337.063px] relative rounded-[10px] shrink-0 w-[288px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[337.063px] items-start overflow-clip p-px relative rounded-[inherit] w-[288px]">
        <Container180 />
        <Container186 />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback7() {
  return (
    <div className="h-[160.875px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback7} />
    </div>
  );
}

function Container188() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#cceaf2] h-[160.875px] items-start overflow-clip relative shrink-0 to-[#8cd4e4] w-full" data-name="Container">
      <ImageWithFallback7 />
    </div>
  );
}

function Icon76() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container189() {
  return (
    <div className="bg-[rgba(140,212,228,0.13)] relative rounded-[3.35544e+07px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon76 />
      </div>
    </div>
  );
}

function Badge19() {
  return (
    <div className="bg-[#8cd4e4] h-[18px] relative rounded-[6.8px] shrink-0 w-[86.75px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[86.75px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Places to Visit</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container190() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Container189 />
      <Badge19 />
    </div>
  );
}

function Heading62() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Al Seef Heritage District</p>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="h-[51.188px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] top-[-1px] w-[250px]">Traditional Dubai experience by the creek</p>
    </div>
  );
}

function Icon77() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text48() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap whitespace-pre">Dubai</p>
      </div>
    </div>
  );
}

function Container191() {
  return (
    <div className="h-[16px] relative shrink-0 w-[47.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[47.281px]">
        <Icon77 />
        <Text48 />
      </div>
    </div>
  );
}

function Icon78() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6847)" id="Icon">
          <path d={svgPaths.p9e4ad80} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_6847">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text49() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">4.6</p>
      </div>
    </div>
  );
}

function Container192() {
  return (
    <div className="h-[16px] relative shrink-0 w-[31.547px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[31.547px]">
        <Icon78 />
        <Text49 />
      </div>
    </div>
  );
}

function Container193() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container191 />
      <Container192 />
    </div>
  );
}

function Container194() {
  return (
    <div className="h-[174.188px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[174.188px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Container190 />
          <Heading62 />
          <Paragraph39 />
          <Container193 />
        </div>
      </div>
    </div>
  );
}

function Container195() {
  return (
    <div className="bg-white h-[337.063px] relative rounded-[10px] shrink-0 w-[288px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[337.063px] items-start overflow-clip p-px relative rounded-[inherit] w-[288px]">
        <Container188 />
        <Container194 />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback8() {
  return (
    <div className="h-[160.875px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback8} />
    </div>
  );
}

function Container196() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#cceaf2] h-[160.875px] items-start overflow-clip relative shrink-0 to-[#8cd4e4] w-full" data-name="Container">
      <ImageWithFallback8 />
    </div>
  );
}

function Icon79() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b0a6970} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4V10.5" id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p37996300} id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p18dce280} id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container197() {
  return (
    <div className="bg-[rgba(123,40,45,0.13)] relative rounded-[3.35544e+07px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon79 />
      </div>
    </div>
  );
}

function Badge20() {
  return (
    <div className="bg-[#7b282d] h-[18px] relative rounded-[6.8px] shrink-0 w-[75.391px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[75.391px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Restaurants</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container198() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Container197 />
      <Badge20 />
    </div>
  );
}

function Heading63() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Armani/Ristorante</p>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-1px] whitespace-pre">Fine Italian dining at Burj Khalifa</p>
    </div>
  );
}

function Icon80() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text50() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap whitespace-pre">Downtown Dubai</p>
      </div>
    </div>
  );
}

function Container199() {
  return (
    <div className="h-[16px] relative shrink-0 w-[108.031px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[108.031px]">
        <Icon80 />
        <Text50 />
      </div>
    </div>
  );
}

function Icon81() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6847)" id="Icon">
          <path d={svgPaths.p9e4ad80} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_6847">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text51() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">4.7</p>
      </div>
    </div>
  );
}

function Container200() {
  return (
    <div className="h-[16px] relative shrink-0 w-[31.547px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[31.547px]">
        <Icon81 />
        <Text51 />
      </div>
    </div>
  );
}

function Container201() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container199 />
      <Container200 />
    </div>
  );
}

function Container202() {
  return (
    <div className="h-[148.594px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[148.594px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Container198 />
          <Heading63 />
          <Paragraph40 />
          <Container201 />
        </div>
      </div>
    </div>
  );
}

function Container203() {
  return (
    <div className="bg-white h-[337.063px] relative rounded-[10px] shrink-0 w-[288px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[337.063px] items-start overflow-clip p-px relative rounded-[inherit] w-[288px]">
        <Container196 />
        <Container202 />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback9() {
  return (
    <div className="h-[160.875px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback9} />
    </div>
  );
}

function Container204() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#cceaf2] h-[160.875px] items-start overflow-clip relative shrink-0 to-[#8cd4e4] w-full" data-name="Container">
      <ImageWithFallback9 />
    </div>
  );
}

function Icon82() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p309f1c00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container205() {
  return (
    <div className="relative rounded-[3.35544e+07px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon82 />
      </div>
    </div>
  );
}

function Badge21() {
  return (
    <div className="bg-[#ec2227] h-[18px] relative rounded-[6.8px] shrink-0 w-[61.25px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[61.25px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Activities</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container206() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Container205 />
      <Badge21 />
    </div>
  );
}

function Heading64() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">{`Yoga & Wellness Retreat`}</p>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-1px] whitespace-pre">Weekend wellness program at JBR</p>
    </div>
  );
}

function Icon83() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text52() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap whitespace-pre">Jumeirah Beach</p>
      </div>
    </div>
  );
}

function Container207() {
  return (
    <div className="h-[16px] relative shrink-0 w-[98.547px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[98.547px]">
        <Icon83 />
        <Text52 />
      </div>
    </div>
  );
}

function Icon84() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6884)" id="Icon">
          <path d={svgPaths.p1d82f780} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_6884">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text53() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">4.9</p>
      </div>
    </div>
  );
}

function Container208() {
  return (
    <div className="h-[16px] relative shrink-0 w-[31.547px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[31.547px]">
        <Icon84 />
        <Text53 />
      </div>
    </div>
  );
}

function Container209() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container207 />
      <Container208 />
    </div>
  );
}

function Container210() {
  return (
    <div className="h-[148.594px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[148.594px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Container206 />
          <Heading64 />
          <Paragraph41 />
          <Container209 />
        </div>
      </div>
    </div>
  );
}

function Container211() {
  return (
    <div className="bg-white h-[337.063px] relative rounded-[10px] shrink-0 w-[288px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[337.063px] items-start overflow-clip p-px relative rounded-[inherit] w-[288px]">
        <Container204 />
        <Container210 />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback10() {
  return (
    <div className="h-[160.875px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback10} />
    </div>
  );
}

function Container212() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#cceaf2] h-[160.875px] items-start overflow-clip relative shrink-0 to-[#8cd4e4] w-full" data-name="Container">
      <ImageWithFallback10 />
    </div>
  );
}

function Icon85() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b0a6970} id="Vector" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4V10.5" id="Vector_2" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p37996300} id="Vector_3" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p18dce280} id="Vector_4" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container213() {
  return (
    <div className="bg-[rgba(236,34,39,0.13)] relative rounded-[3.35544e+07px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon85 />
      </div>
    </div>
  );
}

function Badge22() {
  return (
    <div className="bg-[#ec2227] h-[18px] relative rounded-[6.8px] shrink-0 w-[65.078px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[65.078px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Shopping</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container214() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Container213 />
      <Badge22 />
    </div>
  );
}

function Heading65() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">The Dubai Mall</p>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-1px] whitespace-pre">{`World's largest shopping destination`}</p>
    </div>
  );
}

function Icon86() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text54() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap whitespace-pre">Downtown Dubai</p>
      </div>
    </div>
  );
}

function Container215() {
  return (
    <div className="h-[16px] relative shrink-0 w-[108.031px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[108.031px]">
        <Icon86 />
        <Text54 />
      </div>
    </div>
  );
}

function Icon87() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6884)" id="Icon">
          <path d={svgPaths.p1d82f780} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_6884">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text55() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">4.8</p>
      </div>
    </div>
  );
}

function Container216() {
  return (
    <div className="h-[16px] relative shrink-0 w-[31.547px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[31.547px]">
        <Icon87 />
        <Text55 />
      </div>
    </div>
  );
}

function Container217() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container215 />
      <Container216 />
    </div>
  );
}

function Container218() {
  return (
    <div className="h-[148.594px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[148.594px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Container214 />
          <Heading65 />
          <Paragraph42 />
          <Container217 />
        </div>
      </div>
    </div>
  );
}

function Container219() {
  return (
    <div className="bg-white h-[337.063px] relative rounded-[10px] shrink-0 w-[288px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[337.063px] items-start overflow-clip p-px relative rounded-[inherit] w-[288px]">
        <Container212 />
        <Container218 />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback11() {
  return (
    <div className="h-[160.875px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback11} />
    </div>
  );
}

function Container220() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#cceaf2] h-[160.875px] items-start overflow-clip relative shrink-0 to-[#8cd4e4] w-full" data-name="Container">
      <ImageWithFallback11 />
    </div>
  );
}

function Icon88() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_7003)" id="Icon">
          <path d={svgPaths.p1d82f780} id="Vector" stroke="var(--stroke-0, #413F30)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_7003">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container221() {
  return (
    <div className="bg-[rgba(65,63,48,0.13)] relative rounded-[3.35544e+07px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon88 />
      </div>
    </div>
  );
}

function Badge23() {
  return (
    <div className="bg-[#413f30] h-[18px] relative rounded-[6.8px] shrink-0 w-[61.25px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[61.25px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-50 text-nowrap whitespace-pre">Activities</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container222() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Container221 />
      <Badge23 />
    </div>
  );
}

function Heading66() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-[-2px] whitespace-pre">Desert Safari Adventure</p>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="h-[51.188px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] top-[-1px] w-[224px]">Thrilling dune bashing and BBQ dinner</p>
    </div>
  );
}

function Icon89() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text56() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap whitespace-pre">Dubai Desert</p>
      </div>
    </div>
  );
}

function Container223() {
  return (
    <div className="h-[16px] relative shrink-0 w-[84.859px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[84.859px]">
        <Icon89 />
        <Text56 />
      </div>
    </div>
  );
}

function Icon90() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_17_6884)" id="Icon">
          <path d={svgPaths.p1d82f780} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_17_6884">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text57() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">4.7</p>
      </div>
    </div>
  );
}

function Container224() {
  return (
    <div className="h-[16px] relative shrink-0 w-[31.547px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[31.547px]">
        <Icon90 />
        <Text57 />
      </div>
    </div>
  );
}

function Container225() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container223 />
      <Container224 />
    </div>
  );
}

function Container226() {
  return (
    <div className="h-[174.188px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[174.188px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Container222 />
          <Heading66 />
          <Paragraph43 />
          <Container225 />
        </div>
      </div>
    </div>
  );
}

function Container227() {
  return (
    <div className="basis-0 bg-white grow h-[337.063px] min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[337.063px] items-start p-px relative w-full">
          <Container220 />
          <Container226 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container228() {
  return (
    <div className="content-stretch flex gap-[12px] h-[337.063px] items-start relative shrink-0 w-full" data-name="Container">
      <Container187 />
      <Container195 />
      <Container203 />
      <Container211 />
      <Container219 />
      <Container227 />
    </div>
  );
}

function HomePage32() {
  return (
    <div className="box-border content-stretch flex flex-col h-[353.063px] items-start overflow-clip pl-0 py-0 relative shrink-0 w-full" data-name="HomePage">
      <Container228 />
    </div>
  );
}

function Card7() {
  return (
    <div className="bg-white h-[459.063px] relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] h-[459.063px] items-start pb-px pt-[25px] px-[25px] relative w-full">
          <HomePage31 />
          <HomePage32 />
        </div>
      </div>
    </div>
  );
}

function HomePage33() {
  return (
    <div className="absolute bg-gray-50 content-stretch flex flex-col gap-[16px] h-[2664.48px] items-start left-[24px] top-[160px] w-[1423px]" data-name="HomePage">
      <Container3 />
      <Container22 />
      <Container80 />
      <Card4 />
      <Container178 />
      <Card7 />
    </div>
  );
}

function Icon91() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.pb56cd00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pdd08040} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container229() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center left-[16px] rounded-[10px] size-[36px] top-[12px]" data-name="Container">
      <Icon91 />
    </div>
  );
}

function Text58() {
  return (
    <div className="absolute h-[22.391px] left-[64px] top-[18.8px] w-[37.531px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[19px] not-italic text-[14px] text-center text-nowrap text-white top-[-2px] translate-x-[-50%] whitespace-pre">Home</p>
    </div>
  );
}

function Icon92() {
  return (
    <div className="relative size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container230() {
  return <div className="absolute bg-white h-[32px] left-0 rounded-br-[3.35544e+07px] rounded-tr-[3.35544e+07px] top-[14px] w-[4px]" data-name="Container" />;
}

function Button36() {
  return (
    <div className="bg-gradient-to-b from-[#7b282d] h-[60px] relative rounded-[16.4px] shadow-[0px_10px_15px_-3px_rgba(123,40,45,0.2),0px_4px_6px_-4px_rgba(123,40,45,0.2)] shrink-0 to-[#971b1e] w-full" data-name="Button">
      <Container229 />
      <Text58 />
      <div className="absolute flex items-center justify-center left-[223px] size-[16px] top-[6px]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <Icon92 />
        </div>
      </div>
      <Container230 />
    </div>
  );
}

function Icon93() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_17_6831)" id="Icon">
          <path d={svgPaths.p3cb50b00} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3f23a000} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p1f67c900} id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M7.5 4.5H10.5" id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M7.5 7.5H10.5" id="Vector_5" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M7.5 10.5H10.5" id="Vector_6" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M7.5 13.5H10.5" id="Vector_7" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_17_6831">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container231() {
  return (
    <div className="bg-gray-100 relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon93 />
      </div>
    </div>
  );
}

function Text59() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[66.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.391px] relative w-[66.047px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[33.5px] not-italic text-[#364153] text-[14px] text-center text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">About FAA</p>
      </div>
    </div>
  );
}

function Button37() {
  return (
    <div className="h-[60px] relative rounded-[16.4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[60px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Container231 />
          <Text59 />
        </div>
      </div>
    </div>
  );
}

function Icon94() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.pd2eb480} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p4ac1c00} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p226d9800} id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p19685c00} id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container232() {
  return (
    <div className="bg-gray-100 relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon94 />
      </div>
    </div>
  );
}

function Text60() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[79.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.391px] relative w-[79.828px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[40px] not-italic text-[#364153] text-[14px] text-center text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Organization</p>
      </div>
    </div>
  );
}

function Button38() {
  return (
    <div className="h-[60px] relative rounded-[16.4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[60px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Container232 />
          <Text60 />
        </div>
      </div>
    </div>
  );
}

function Icon95() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M9 5.25V15.75" id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2044ea00} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container233() {
  return (
    <div className="bg-gray-100 relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon95 />
      </div>
    </div>
  );
}

function Text61() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[98.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.391px] relative w-[98.828px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[49.5px] not-italic text-[#364153] text-[14px] text-center text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Knowledge Hub</p>
      </div>
    </div>
  );
}

function Button39() {
  return (
    <div className="h-[60px] relative rounded-[16.4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[60px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Container233 />
          <Text61 />
        </div>
      </div>
    </div>
  );
}

function Icon96() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3a382d00} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p678c080} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M7.5 6.75H6" id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 9.75H6" id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 12.75H6" id="Vector_5" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container234() {
  return (
    <div className="bg-gray-100 relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon96 />
      </div>
    </div>
  );
}

function Text62() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[70.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.391px] relative w-[70.406px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[35.5px] not-italic text-[#364153] text-[14px] text-center text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Documents</p>
      </div>
    </div>
  );
}

function Button40() {
  return (
    <div className="h-[60px] relative rounded-[16.4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[60px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Container234 />
          <Text62 />
        </div>
      </div>
    </div>
  );
}

function Icon97() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p329b1880} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container235() {
  return (
    <div className="bg-gray-100 relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon97 />
      </div>
    </div>
  );
}

function Text63() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[58.516px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.391px] relative w-[58.516px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[29px] not-italic text-[#364153] text-[14px] text-center text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Feedback</p>
      </div>
    </div>
  );
}

function Button41() {
  return (
    <div className="h-[60px] relative rounded-[16.4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[60px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Container235 />
          <Text63 />
        </div>
      </div>
    </div>
  );
}

function Icon98() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2210e800} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3bfcd100} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p34f2c000} id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p96d600} id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container236() {
  return (
    <div className="bg-gray-100 relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon98 />
      </div>
    </div>
  );
}

function Text64() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[102.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.391px] relative w-[102.922px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[51.5px] not-italic text-[#364153] text-[14px] text-center text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Digital Signature</p>
      </div>
    </div>
  );
}

function Button42() {
  return (
    <div className="h-[60px] relative rounded-[16.4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[60px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Container236 />
          <Text64 />
        </div>
      </div>
    </div>
  );
}

function Icon99() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3c193bc0} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M13.5 12.75V6.75" id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9.75 12.75V3.75" id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M6 12.75V10.5" id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container237() {
  return (
    <div className="bg-gray-100 relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon99 />
      </div>
    </div>
  );
}

function Text65() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[54.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.391px] relative w-[54.797px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[27.5px] not-italic text-[#364153] text-[14px] text-center text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Analytics</p>
      </div>
    </div>
  );
}

function Button43() {
  return (
    <div className="h-[60px] relative rounded-[16.4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[60px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Container237 />
          <Text65 />
        </div>
      </div>
    </div>
  );
}

function Icon100() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p1d69e00} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p1150d400} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M5.25 15.75H12.75" id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 2.25V15.75" id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pc9a7e80} id="Vector_5" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container238() {
  return (
    <div className="bg-gray-100 relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon100 />
      </div>
    </div>
  );
}

function Text66() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[66.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.391px] relative w-[66.266px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[33px] not-italic text-[#364153] text-[14px] text-center text-nowrap top-[-2px] translate-x-[-50%] whitespace-pre">Legislation</p>
      </div>
    </div>
  );
}

function Button44() {
  return (
    <div className="h-[60px] relative rounded-[16.4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[60px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Container238 />
          <Text66 />
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="h-[825px] relative shrink-0 w-full" data-name="Navigation">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[6px] h-[825px] items-start pb-0 pt-[24px] px-[16px] relative w-full">
          <Button36 />
          <Button37 />
          <Button38 />
          <Button39 />
          <Button40 />
          <Button41 />
          <Button42 />
          <Button43 />
          <Button44 />
        </div>
      </div>
    </div>
  );
}

function Layout() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex flex-col from-[#fafafa] h-[825px] items-start left-[-288px] pl-0 pr-px py-0 to-[#ffffff] top-[127px] w-[288px]" data-name="Layout">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
      <Navigation />
    </div>
  );
}

function ImageWithFallback12() {
  return (
    <div className="h-[48px] relative shrink-0 w-[208.516px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageWithFallback12} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] w-[208.516px]" />
    </div>
  );
}

function Icon101() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p399eca00} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pc93b400} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container239() {
  return (
    <div className="bg-[#efefef] relative rounded-[3.35544e+07px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon101 />
      </div>
    </div>
  );
}

function Text67() {
  return (
    <div className="basis-0 grow h-[20.797px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20.797px] relative w-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20.8px] left-0 not-italic text-[#7b282d] text-[13px] text-nowrap top-[-2px] whitespace-pre">User</p>
      </div>
    </div>
  );
}

function Icon102() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container240() {
  return (
    <div className="absolute box-border content-stretch flex gap-[8px] h-[40px] items-center left-[48px] px-[12px] py-0 rounded-[4px] top-0 w-[101.766px]" data-name="Container">
      <Container239 />
      <Text67 />
      <Icon102 />
    </div>
  );
}

function Icon103() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p388cb800} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p5baad20} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Layout1() {
  return <div className="absolute bg-[#fb2c36] left-[22px] rounded-[3.35544e+07px] size-[8px] top-[6px]" data-name="Layout" />;
}

function Button45() {
  return (
    <div className="absolute left-0 rounded-[6.8px] size-[36px] top-[2px]" data-name="Button">
      <Icon103 />
      <Layout1 />
    </div>
  );
}

function Container241() {
  return (
    <div className="h-[40px] relative shrink-0 w-[149.766px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[40px] relative w-[149.766px]">
        <Container240 />
        <Button45 />
      </div>
    </div>
  );
}

function Container242() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[80px] items-center justify-between px-[24px] py-0 relative w-full">
          <ImageWithFallback12 />
          <Container241 />
        </div>
      </div>
    </div>
  );
}

function Icon104() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2.66667 8H13.3333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 12H13.3333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 4H13.3333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button46() {
  return (
    <div className="relative rounded-[6.8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon104 />
      </div>
    </div>
  );
}

function Text68() {
  return (
    <div className="basis-0 grow h-[22.391px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.391px] relative w-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[19px] not-italic text-[14px] text-center text-nowrap text-white top-[-2px] translate-x-[-50%] whitespace-pre">Home</p>
      </div>
    </div>
  );
}

function Icon105() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon" opacity="0">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button47() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[57.531px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[22.391px] items-center relative w-[57.531px]">
        <Text68 />
        <Icon105 />
      </div>
    </div>
  );
}

function Text69() {
  return (
    <div className="basis-0 grow h-[22.391px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.391px] relative w-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[70.5px] not-italic text-[14px] text-center text-nowrap text-white top-[-2px] translate-x-[-50%] whitespace-pre">Organization Structure</p>
      </div>
    </div>
  );
}

function Icon106() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon" opacity="0">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button48() {
  return (
    <div className="basis-0 grow h-[22.391px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[22.391px] items-center relative w-full">
        <Text69 />
        <Icon106 />
      </div>
    </div>
  );
}

function Text70() {
  return (
    <div className="basis-0 grow h-[22.391px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.391px] relative w-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[37.5px] not-italic text-[14px] text-center text-nowrap text-white top-[-2px] translate-x-[-50%] whitespace-pre">Automation</p>
      </div>
    </div>
  );
}

function Icon107() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon" opacity="0">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button49() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[93.344px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[22.391px] items-center relative w-[93.344px]">
        <Text70 />
        <Icon107 />
      </div>
    </div>
  );
}

function Text71() {
  return (
    <div className="basis-0 grow h-[22.391px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.391px] relative w-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[63px] not-italic text-[14px] text-center text-nowrap text-white top-[-2px] translate-x-[-50%] whitespace-pre">Approved Templates</p>
      </div>
    </div>
  );
}

function Icon108() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon" opacity="0">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button50() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[146.766px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[22.391px] items-center relative w-[146.766px]">
        <Text71 />
        <Icon108 />
      </div>
    </div>
  );
}

function Navigation1() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[529.141px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[24px] h-[22.391px] items-center relative w-[529.141px]">
        <Button47 />
        <Button48 />
        <Button49 />
        <Button50 />
      </div>
    </div>
  );
}

function Container243() {
  return (
    <div className="bg-[#7b282d] h-[56px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[24px] h-[56px] items-center pl-[24px] pr-0 py-0 relative w-full">
          <Button46 />
          <Navigation1 />
        </div>
      </div>
    </div>
  );
}

function Layout2() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[136px] items-start left-0 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[1471px]" data-name="Layout">
      <Container242 />
      <Container243 />
    </div>
  );
}

export default function FaaIntranet() {
  return (
    <div className="bg-neutral-100 relative size-full" data-name="FAA - Intranet">
      <HomePage33 />
      <Layout />
      <Layout2 />
    </div>
  );
}