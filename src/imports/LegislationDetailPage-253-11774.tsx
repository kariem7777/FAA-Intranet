import svgPaths from "./svg-qpw9gue3h1";
import clsx from "clsx";
type IconProps = {
  additionalClassNames?: string;
};

function Icon({ children, additionalClassNames = "" }: React.PropsWithChildren<IconProps>) {
  return (
    <div className={clsx("size-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}

export default function LegislationDetailPage() {
  return (
    <div className="bg-white relative size-full" data-name="LegislationDetailPage">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="content-stretch flex gap-[899px] items-start pb-px pl-[32px] pr-[1204.469px] pt-[20px] relative size-full">
          <div className="content-stretch flex gap-[16px] h-[40px] items-center relative shrink-0" data-name="Container">
            <div className="h-[40px] relative rounded-[6.8px] shrink-0" data-name="Button">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] h-full items-center justify-center relative">
                <Icon additionalClassNames="relative shrink-0">
                  <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </Icon>
                <div className="h-[22px] relative shrink-0 w-[138px]" data-name="LegislationDetailPage">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                    <p className="font-['Arial:Regular',sans-serif] leading-[21.429px] not-italic relative shrink-0 text-[#45556c] text-[15px] text-center text-nowrap">Back to home page</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#d1d5dc] h-[24px] shrink-0 w-px" data-name="Container" />
            <div className="h-[24px] relative shrink-0 w-[196px]" data-name="Heading 6">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#0f172b] text-[16px] text-nowrap top-[-1px]">Organization Structure</p>
              </div>
            </div>
          </div>
          <div className="bg-white h-[32px] relative rounded-[6.8px] shrink-0 w-[126.563px]" data-name="Button">
            <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <Icon additionalClassNames="absolute left-[11px] top-[8px]">
              <path d={svgPaths.p14890d00} id="Vector" stroke="var(--stroke-0, #374151)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #374151)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </Icon>
            <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[75px] not-italic text-[#374151] text-[14px] text-center text-nowrap top-[4px] translate-x-[-50%]">Change View</p>
          </div>
        </div>
      </div>
    </div>
  );
}