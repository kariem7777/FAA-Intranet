import svgPaths from "./svg-ut2he6x6pe";
import imgImageEntitysLegislationEmblem from "figma:asset/b72751a84f5670c85d2329e369f98785e55073a8.png";
import imgImageFederalLegislationEmblem from "figma:asset/701a7d3c9c576696f780f7772f55ccf9815b3eff.png";
import imgImageLocalLegislationEmblem from "figma:asset/da83a1f9595c96aa1d1df07d9f37929756542560.png";
import imgImageSupremeCommitteesLegalOpinionEmblem from "figma:asset/af3e071a6a8b66cf73e762bb897b0e610d356bc8.png";
import imgImageFaaLegalOpinionsEmblem from "figma:asset/eadd8ca5997068aec53c80e00b8b2662b44b6552.png";
import imgImageFaAsLegislationEmblem from "figma:asset/4812dbedd5625a00002351e6181ae7dad0c3037e.png";
import imgImageWithFallback from "figma:asset/a5ddb65a14d35992c9db64b833b8ead7d6060dbb.png";

function Heading() {
  return (
    <div className="absolute h-[46.797px] left-0 top-0 w-[1216px]" data-name="Heading 2">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[46.8px] left-[607.64px] not-italic text-[#0f172b] text-[36px] text-center text-nowrap top-[-4px] tracking-[-0.54px] translate-x-[-50%] whitespace-pre">Legislative Categories</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[51.188px] left-[224px] top-[62.8px] w-[768px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[384.09px] not-italic text-[#45556c] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[765px]">Browse through organized collections of legal documents, regulations, and official opinions. Each category is authenticated and regularly updated to ensure accuracy.</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[113.984px] left-[32px] top-[80px] w-[1216px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[-12px] size-[24px] top-[-14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, #971B1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 8V12" id="Vector_2" stroke="var(--stroke-0, #971B1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 16H12.01" id="Vector_3" stroke="var(--stroke-0, #971B1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute content-stretch flex h-[33.594px] items-start left-[-23px] top-[-9.59px] w-[761px]" data-name="Heading 3">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[33.6px] min-h-px min-w-px not-italic relative shrink-0 text-[#971b1e] text-[16px]">Important Notice</p>
    </div>
  );
}

function NumberedList() {
  return (
    <div className="absolute content-stretch flex flex-col font-['Arial:Regular',sans-serif] h-[66px] items-start leading-[0] left-[-23px] not-italic pb-[6px] pt-0 px-0 text-[#314158] text-[14px] text-nowrap top-[24px] w-[761px]" data-name="Numbered List">
      <ul className="[white-space-collapse:collapse] block relative shrink-0">
        <li className="ms-[21px]">
          <span className="leading-[25.6px]">It is strictly prohibited to copy any content, transfer or capture any information or data from this platform.</span>
        </li>
      </ul>
      <ul className="[white-space-collapse:collapse] block relative shrink-0">
        <li className="ms-[21px]">
          <span className="leading-[25.6px]">Access is only permitted for authorized users.</span>
        </li>
      </ul>
      <ul className="[white-space-collapse:collapse] block relative shrink-0">
        <li className="ms-[21px]">
          <span className="leading-[25.6px]">We highly appreciate your understanding and adherence to these guidelines.</span>
        </li>
      </ul>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[138.375px] left-[40px] top-[-7px] w-[761px]" data-name="Container">
      <Heading1 />
      <NumberedList />
    </div>
  );
}

function LegislationPage() {
  return (
    <div className="absolute h-[138.375px] left-[36px] top-[33px] w-[1147px]" data-name="LegislationPage">
      <Icon />
      <Container1 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-[rgba(151,27,30,0.05)] h-[137px] left-[32.5px] rounded-[16px] top-[726px] w-[1216px]" data-name="Card">
      <LegislationPage />
    </div>
  );
}

function ImageEntitysLegislationEmblem() {
  return (
    <div className="absolute h-[48px] left-[15.5px] top-[20px] w-[58px]" data-name="Image (Entity\'s Legislation emblem)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageEntitysLegislationEmblem} />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[rgba(25,73,154,0.08)] h-[88px] left-[22.5px] rounded-[14px] top-[31px] w-[89px]" data-name="Container">
      <ImageEntitysLegislationEmblem />
    </div>
  );
}

function Container3() {
  return <div className="absolute h-[24px] left-[23px] top-[93px] w-[252px]" data-name="Container" />;
}

function Paragraph1() {
  return (
    <div className="absolute h-[20px] left-[23px] top-[154.83px] w-[252px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#62748e] text-[16px] text-nowrap top-[13px] whitespace-pre">View all governing laws for your entity</p>
    </div>
  );
}

function Icon1() {
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
    <div className="absolute content-stretch flex items-center justify-center left-[329.5px] p-px rounded-[3.35544e+07px] size-[40px] top-[149px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <Icon1 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white border border-[#d5d5d5] border-solid h-[216px] left-[32px] rounded-[10px] top-[251px] w-[391px]" data-name="Button">
      <Container2 />
      <Container3 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[33.6px] left-[23px] not-italic text-[20px] text-gray-900 text-nowrap top-[130.83px] whitespace-pre">{`Entity's Legislation`}</p>
      <Paragraph1 />
      <Button />
    </div>
  );
}

function ImageFederalLegislationEmblem() {
  return (
    <div className="absolute h-[58px] left-[22px] top-[15px] w-[45px]" data-name="Image (Federal Legislation emblem)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageFederalLegislationEmblem} />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-[rgba(201,176,79,0.1)] h-[88px] left-[22.5px] rounded-[14px] top-[31px] w-[89px]" data-name="Container">
      <ImageFederalLegislationEmblem />
    </div>
  );
}

function Container5() {
  return <div className="absolute h-[24px] left-[23px] top-[93px] w-[252px]" data-name="Container" />;
}

function Paragraph2() {
  return (
    <div className="absolute h-[20px] left-[23px] top-[154.83px] w-[252px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#62748e] text-[16px] text-nowrap top-[13px] whitespace-pre">Access UAE-wide federal laws and regulations</p>
    </div>
  );
}

function Icon2() {
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

function Button2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[329.5px] p-px rounded-[3.35544e+07px] size-[40px] top-[149px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <Icon2 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-white border border-[#d5d5d5] border-solid h-[216px] left-[444.5px] rounded-[10px] top-[251px] w-[391px]" data-name="Button">
      <Container4 />
      <Container5 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[33.6px] left-[23px] not-italic text-[20px] text-gray-900 text-nowrap top-[130.83px] whitespace-pre">Federal Legislation</p>
      <Paragraph2 />
      <Button2 />
    </div>
  );
}

function ImageLocalLegislationEmblem() {
  return (
    <div className="absolute left-[17px] size-[55px] top-[16.5px]" data-name="Image (Local Legislation emblem)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageLocalLegislationEmblem} />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-[rgba(6,103,52,0.1)] h-[88px] left-[22.5px] rounded-[14px] top-[31px] w-[89px]" data-name="Container">
      <ImageLocalLegislationEmblem />
    </div>
  );
}

function Container7() {
  return <div className="absolute h-[24px] left-[23px] top-[93px] w-[252px]" data-name="Container" />;
}

function Paragraph3() {
  return (
    <div className="absolute h-[20px] left-[23px] top-[154.83px] w-[252px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#62748e] text-[16px] text-nowrap top-[13px] whitespace-pre">Browse emirate-level rules and directives</p>
    </div>
  );
}

function Icon3() {
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

function Button4() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[329.5px] p-px rounded-[3.35544e+07px] size-[40px] top-[149px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <Icon3 />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-white border border-[#d5d5d5] border-solid h-[216px] left-[857px] rounded-[10px] top-[251px] w-[391px]" data-name="Button">
      <Container6 />
      <Container7 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[33.6px] left-[23px] not-italic text-[20px] text-gray-900 text-nowrap top-[130.83px] whitespace-pre">Local Legislation</p>
      <Paragraph3 />
      <Button4 />
    </div>
  );
}

function Paragraph4() {
  return <div className="absolute h-[20px] left-[23px] top-[111px] w-[252px]" data-name="Paragraph" />;
}

function ImageSupremeCommitteesLegalOpinionEmblem() {
  return (
    <div className="absolute h-[19px] left-[6px] top-[35px] w-[76px]" data-name="Image (Supreme Committee\'s Legal Opinion emblem)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageSupremeCommitteesLegalOpinionEmblem} />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-[rgba(228,4,46,0.1)] h-[88px] left-[22.5px] rounded-[14px] top-[18.5px] w-[89px]" data-name="Container">
      <ImageSupremeCommitteesLegalOpinionEmblem />
    </div>
  );
}

function Icon4() {
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

function Button6() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[329.5px] p-px rounded-[3.35544e+07px] size-[40px] top-[149px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <Icon4 />
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-white border border-[#d5d5d5] border-solid h-[215px] left-[32px] rounded-[10px] top-[489px] w-[391px]" data-name="Button">
      <Paragraph4 />
      <Container8 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[23px] left-[23.5px] not-italic text-[20px] text-gray-900 top-[111px] w-[331.834px]">{`Supreme Committee's Legal Opinion`}</p>
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-[22.5px] not-italic text-[#62748e] text-[16px] top-[159px] w-[297.087px]">Read official interpretations from the Supreme Committee</p>
      <Button6 />
    </div>
  );
}

function Paragraph5() {
  return <div className="absolute h-[20px] left-[23px] top-[111px] w-[252px]" data-name="Paragraph" />;
}

function ImageFaaLegalOpinionsEmblem() {
  return (
    <div className="absolute h-[57px] left-[15.5px] top-[15.5px] w-[58px]" data-name="Image (FAA Legal Opinions emblem)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageFaaLegalOpinionsEmblem} />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-[rgba(32,38,120,0.1)] h-[88px] left-[22.5px] rounded-[14px] top-[31px] w-[89px]" data-name="Container">
      <ImageFaaLegalOpinionsEmblem />
    </div>
  );
}

function Icon5() {
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

function Button8() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[329.5px] p-px rounded-[3.35544e+07px] size-[40px] top-[149px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <Icon5 />
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute bg-white border border-[#d5d5d5] border-solid h-[215px] left-[444.5px] rounded-[10px] top-[489px] w-[391px]" data-name="Button">
      <Paragraph5 />
      <Container9 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[33.6px] left-[23.5px] not-italic text-[20px] text-gray-900 text-nowrap top-[131px] whitespace-pre">FAA Legal Opinions</p>
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-[23px] not-italic text-[#62748e] text-[16px] text-nowrap top-[165px] whitespace-pre">Explore FAA-issued legal guidance</p>
      <Button8 />
    </div>
  );
}

function Paragraph6() {
  return <div className="absolute h-[20px] left-[23px] top-[111px] w-[252px]" data-name="Paragraph" />;
}

function ImageFaAsLegislationEmblem() {
  return (
    <div className="absolute h-[51px] left-[18px] top-[20px] w-[44px]" data-name="Image (FAA\'s Legislation emblem)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageFaAsLegislationEmblem} />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-[rgba(166,43,45,0.1)] h-[88px] left-[22.5px] rounded-[14px] top-[31px] w-[89px]" data-name="Container">
      <ImageFaAsLegislationEmblem />
    </div>
  );
}

function Icon6() {
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

function Button10() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[329.5px] p-px rounded-[3.35544e+07px] size-[40px] top-[149px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <Icon6 />
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute bg-white border border-[#d5d5d5] border-solid h-[215px] left-[857px] rounded-[10px] top-[489px] w-[391px]" data-name="Button">
      <Paragraph6 />
      <Container10 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[33.6px] left-[23.5px] not-italic text-[20px] text-gray-900 text-nowrap top-[131px] whitespace-pre">{`FAA's Legislation`}</p>
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-[23px] not-italic text-[#62748e] text-[16px] text-nowrap top-[165px] whitespace-pre">Find all laws and mandates governing the FAA</p>
      <Button10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute h-[1302.36px] left-[94.5px] top-0 w-[1280px]" data-name="Container">
      <Container />
      <Card />
      <Button1 />
      <Button3 />
      <Button5 />
      <Button7 />
      <Button9 />
      <Button11 />
    </div>
  );
}

function LegislationPage1() {
  return (
    <div className="absolute h-[1302.36px] left-0 top-[136px] w-[1469px]" data-name="LegislationPage" style={{ backgroundImage: "linear-gradient(138.441deg, rgb(248, 250, 252) 0%, rgb(255, 255, 255) 50%, rgb(248, 250, 252) 100%), linear-gradient(90deg, rgb(249, 250, 251) 0%, rgb(249, 250, 251) 100%)" }}>
      <Container11 />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="h-[48px] relative shrink-0 w-[208.516px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageWithFallback} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[48px] w-[208.516px]" />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_72_773)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p14d10c00} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 8H14.6667" id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_72_773">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[20px] items-start relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center text-nowrap whitespace-pre">English</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-gray-200 h-[16px] relative shrink-0 w-px" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[16px] w-px" />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[14.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[16px] items-start relative w-[14.922px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center text-nowrap whitespace-pre">AR</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[38px] items-center left-0 px-[17px] py-px rounded-[10px] top-px w-[133.828px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon7 />
      <Text />
      <Container12 />
      <Text1 />
    </div>
  );
}

function Icon8() {
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

function Container13() {
  return (
    <div className="bg-[#efefef] relative rounded-[3.35544e+07px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-[24px]">
        <Icon8 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 grow h-[20.797px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[20.797px] relative w-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20.8px] left-0 not-italic text-[#7b282d] text-[13px] text-nowrap top-[-2px] whitespace-pre">User</p>
      </div>
    </div>
  );
}

function Icon9() {
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

function Container14() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[40px] items-center left-[193.83px] px-[12px] py-0 rounded-[4px] top-0 w-[101.766px]" data-name="Container">
      <Container13 />
      <Text2 />
      <Icon9 />
    </div>
  );
}

function Icon10() {
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

function Layout() {
  return <div className="absolute bg-[#fb2c36] left-[22px] rounded-[3.35544e+07px] size-[8px] top-[6px]" data-name="Layout" />;
}

function Button13() {
  return (
    <div className="absolute left-[145.83px] rounded-[6.8px] size-[36px] top-[2px]" data-name="Button">
      <Icon10 />
      <Layout />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[40px] relative shrink-0 w-[295.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[40px] relative w-[295.594px]">
        <Button12 />
        <Container14 />
        <Button13 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[80px] items-center justify-between px-[24px] py-0 relative w-full">
          <ImageWithFallback />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Icon11() {
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

function Button14() {
  return (
    <div className="relative rounded-[6.8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-[32px]">
        <Icon11 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 grow h-[22.391px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[22.391px] relative w-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[19px] not-italic text-[14px] text-center text-nowrap text-white top-[-2px] translate-x-[-50%] whitespace-pre">Home</p>
      </div>
    </div>
  );
}

function Icon12() {
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

function Button15() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[57.531px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] h-[22.391px] items-center relative w-[57.531px]">
        <Text3 />
        <Icon12 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 grow h-[22.391px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[22.391px] relative w-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[70.5px] not-italic text-[14px] text-center text-nowrap text-white top-[-2px] translate-x-[-50%] whitespace-pre">Organization Structure</p>
      </div>
    </div>
  );
}

function Icon13() {
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

function Button16() {
  return (
    <div className="basis-0 grow h-[22.391px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] h-[22.391px] items-center relative w-full">
        <Text4 />
        <Icon13 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 grow h-[22.391px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[22.391px] relative w-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[37.5px] not-italic text-[14px] text-center text-nowrap text-white top-[-2px] translate-x-[-50%] whitespace-pre">Automation</p>
      </div>
    </div>
  );
}

function Icon14() {
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

function Button17() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[93.344px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] h-[22.391px] items-center relative w-[93.344px]">
        <Text5 />
        <Icon14 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="basis-0 grow h-[22.391px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[22.391px] relative w-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[63px] not-italic text-[14px] text-center text-nowrap text-white top-[-2px] translate-x-[-50%] whitespace-pre">Approved Templates</p>
      </div>
    </div>
  );
}

function Icon15() {
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

function Button18() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[146.766px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] h-[22.391px] items-center relative w-[146.766px]">
        <Text6 />
        <Icon15 />
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="h-[22.391px] relative shrink-0 w-[529.141px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] h-[22.391px] items-center relative w-[529.141px]">
        <Button15 />
        <Button16 />
        <Button17 />
        <Button18 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#7b282d] h-[56px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] h-[56px] items-center pl-[24px] pr-0 py-0 relative w-full">
          <Button14 />
          <Navigation />
        </div>
      </div>
    </div>
  );
}

function Layout1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[136px] items-start left-0 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[1469px]" data-name="Layout">
      <Container16 />
      <Container17 />
    </div>
  );
}

export default function FaaIntranet() {
  return (
    <div className="bg-neutral-100 relative size-full" data-name="FAA - Intranet">
      <LegislationPage1 />
      <Layout1 />
    </div>
  );
}