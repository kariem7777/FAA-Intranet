import svgPaths from "./svg-0b75pcu8xe";
import clsx from "clsx";
import imgImageEntitysLegislationEmblem from "figma:asset/b72751a84f5670c85d2329e369f98785e55073a8.png";
import imgImageFederalLegislationEmblem from "figma:asset/701a7d3c9c576696f780f7772f55ccf9815b3eff.png";
import imgImageLocalLegislationEmblem from "figma:asset/da83a1f9595c96aa1d1df07d9f37929756542560.png";
import imgImageSupremeCommitteesLegalOpinionEmblem from "figma:asset/af3e071a6a8b66cf73e762bb897b0e610d356bc8.png";
import imgImageFaaLegalOpinionsEmblem from "figma:asset/eadd8ca5997068aec53c80e00b8b2662b44b6552.png";
import imgImageFaAsLegislationEmblem from "figma:asset/4812dbedd5625a00002351e6181ae7dad0c3037e.png";
import imgImageGovernmentOfDubai from "figma:asset/4e42cf3310aeed96ab254a52750afe49241e1641.png";
import imgImageFinancialAuditAuthority from "figma:asset/a5ddb65a14d35992c9db64b833b8ead7d6060dbb.png";
import imgImage from "figma:asset/33fb6ee80221be4862d153ff6087a71ce90ad51a.png";
import { imgGroup } from "./svg-oedpe";
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return <Wrapper3 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</Wrapper3>;
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return <Wrapper3 additionalClassNames={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>{children}</Wrapper3>;
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}
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
type ContainerProps = {
  additionalClassNames?: string;
};

function Container({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerProps>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[80px] py-0 relative size-full">{children}</div>
      </div>
    </div>
  );
}
type TextText1Props = {
  text: string;
};

function TextText1({ text }: TextText1Props) {
  return (
    <div className="absolute h-[26px] left-[36px] top-0 w-[1167px]">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[26px] left-0 not-italic text-[#314158] text-[16px] text-nowrap top-[-2px]">{text}</p>
    </div>
  );
}
type TextTextProps = {
  text: string;
};

function TextText({ text }: TextTextProps) {
  return (
    <div className="absolute bg-[#f1f5f9] content-stretch flex items-center justify-center left-0 rounded-[3.35544e+07px] size-[24px] top-[2px]">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#45556c] text-[14px] text-nowrap">{text}</p>
    </div>
  );
}

export default function FaaIntranet() {
  return (
    <div className="bg-[#f5f5f5] relative size-full" data-name="FAA - Intranet">
      <div className="absolute bg-[#f9fafb] content-stretch flex flex-col h-[1420.734px] items-start left-0 pb-0 pt-[136px] px-0 top-0 w-[1495px]" data-name="Layout">
        <div className="bg-[#f8f9fa] h-[1226px] relative shrink-0 w-full" data-name="LegislationPage">
          <div className="absolute content-stretch flex flex-col gap-[35px] h-[980.734px] items-start left-0 pb-0 pt-[40px] px-[80px] top-[176px] w-[1495px]" data-name="Container">
            <div className="h-[551.938px] relative shrink-0 w-full" data-name="Container">
              <div className="absolute bg-white h-[242.375px] left-0 overflow-clip rounded-[18px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05),0px_4px_12px_0px_rgba(0,0,0,0.04)] top-0 w-[423.656px]" data-name="Container">
                <div className="absolute h-[242.375px] left-0 top-0 w-[423.656px]" data-name="Container">
                  <div className="absolute h-[58.953px] left-[175.83px] opacity-90 top-[34.52px] w-[72px]" data-name="Image (Entity\'s Legislation emblem)">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageEntitysLegislationEmblem} />
                  </div>
                  <div className="absolute h-[35.188px] left-[24px] top-[124px] w-[375.656px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[35.2px] left-[188.53px] not-italic text-[#1d293d] text-[22px] text-center text-nowrap top-0 tracking-[-0.22px] translate-x-[-50%]">{`Entity's Legislation`}</p>
                  </div>
                  <div className="absolute h-[51.188px] left-[24px] top-[167.19px] w-[375.656px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[187.95px] not-italic text-[#62748e] text-[16px] text-center top-[-2px] translate-x-[-50%] w-[329px]">Internal laws and regulations specific to the entity</p>
                  </div>
                </div>
                <div className="absolute bg-[#2c3e5b] h-[242.375px] left-0 top-0 w-[4px]" data-name="Container" />
              </div>
              <div className="absolute bg-white h-[242.375px] left-[455.66px] overflow-clip rounded-[18px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05),0px_4px_12px_0px_rgba(0,0,0,0.04)] top-0 w-[423.672px]" data-name="Container">
                <div className="absolute h-[242.375px] left-0 top-0 w-[423.672px]" data-name="Container">
                  <div className="absolute h-[72px] left-[183.98px] opacity-90 top-[28px] w-[55.688px]" data-name="Image (Federal Legislation emblem)">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageFederalLegislationEmblem} />
                  </div>
                  <div className="absolute h-[35.188px] left-[24px] top-[124px] w-[375.672px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[35.2px] left-[188.3px] not-italic text-[#1d293d] text-[22px] text-center text-nowrap top-0 tracking-[-0.22px] translate-x-[-50%]">Federal Legislation</p>
                  </div>
                  <div className="absolute h-[51.188px] left-[24px] top-[167.19px] w-[375.672px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[188.3px] not-italic text-[#62748e] text-[16px] text-center top-[-2px] translate-x-[-50%] w-[357px]">Federal laws and decrees issued by the federal government</p>
                  </div>
                </div>
                <div className="absolute bg-[#c9a049] h-[242.375px] left-0 top-0 w-[4px]" data-name="Container" />
              </div>
              <div className="absolute bg-white h-[242.375px] left-[911.33px] overflow-clip rounded-[18px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05),0px_4px_12px_0px_rgba(0,0,0,0.04)] top-0 w-[423.656px]" data-name="Container">
                <div className="absolute h-[242.375px] left-0 top-0 w-[423.656px]" data-name="Container">
                  <div className="absolute left-[175.83px] opacity-90 size-[72px] top-[28px]" data-name="Image (Local Legislation emblem)">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageLocalLegislationEmblem} />
                  </div>
                  <div className="absolute h-[35.188px] left-[24px] top-[124px] w-[375.656px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[35.2px] left-[187.38px] not-italic text-[#1d293d] text-[22px] text-center text-nowrap top-0 tracking-[-0.22px] translate-x-[-50%]">Local Legislation</p>
                  </div>
                  <div className="absolute h-[51.188px] left-[24px] top-[167.19px] w-[375.656px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[187.84px] not-italic text-[#62748e] text-[16px] text-center top-[-2px] translate-x-[-50%] w-[329px]">Local laws and legislation for the Emirate of Dubai</p>
                  </div>
                </div>
                <div className="absolute bg-[#0a7544] h-[242.375px] left-0 top-0 w-[4px]" data-name="Container" />
              </div>
              <div className="absolute bg-white h-[277.563px] left-0 overflow-clip rounded-[18px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05),0px_4px_12px_0px_rgba(0,0,0,0.04)] top-[274.38px] w-[423.656px]" data-name="Container">
                <div className="absolute h-[277.563px] left-0 top-0 w-[423.656px]" data-name="Container">
                  <div className="absolute h-[33.328px] left-[141.83px] opacity-90 top-[47.33px] w-[140px]" data-name="Image (Supreme Committee\'s Legal Opinion emblem)">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageSupremeCommitteesLegalOpinionEmblem} />
                  </div>
                  <div className="absolute h-[70.375px] left-[24px] top-[124px] w-[375.656px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[35.2px] left-[187.98px] not-italic text-[#1d293d] text-[22px] text-center top-0 tracking-[-0.22px] translate-x-[-50%] w-[294px]">{`Supreme Committee's Legal Opinion`}</p>
                  </div>
                  <div className="absolute h-[51.188px] left-[24px] top-[202.38px] w-[375.656px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[188.08px] not-italic text-[#62748e] text-[16px] text-center top-[-2px] translate-x-[-50%] w-[322px]">Legal opinions and guidance issued by the Supreme Committee</p>
                  </div>
                </div>
                <div className="absolute bg-[#c9253b] h-[277.563px] left-0 top-0 w-[4px]" data-name="Container" />
              </div>
              <div className="absolute bg-white h-[277.563px] left-[455.66px] overflow-clip rounded-[18px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05),0px_4px_12px_0px_rgba(0,0,0,0.04)] top-[274.38px] w-[423.672px]" data-name="Container">
                <div className="absolute h-[277.563px] left-0 top-0 w-[423.672px]" data-name="Container">
                  <div className="absolute left-[175.83px] opacity-90 size-[72px] top-[28px]" data-name="Image (FAA Legal Opinions emblem)">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageFaaLegalOpinionsEmblem} />
                  </div>
                  <div className="absolute h-[35.188px] left-[24px] top-[141.59px] w-[375.672px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[35.2px] left-[188.05px] not-italic text-[#1d293d] text-[22px] text-center text-nowrap top-0 tracking-[-0.22px] translate-x-[-50%]">FAA Legal Opinions</p>
                  </div>
                  <div className="absolute h-[51.188px] left-[24px] top-[202.38px] w-[375.672px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[188.27px] not-italic text-[#62748e] text-[16px] text-center top-[-2px] translate-x-[-50%] w-[354px]">Legal opinions and consultations issued by the Authority</p>
                  </div>
                </div>
                <div className="absolute bg-[#1f3a8a] h-[277.563px] left-0 top-0 w-[4px]" data-name="Container" />
              </div>
              <div className="absolute bg-white h-[277.563px] left-[911.33px] overflow-clip rounded-[18px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05),0px_4px_12px_0px_rgba(0,0,0,0.04)] top-[274.38px] w-[423.656px]" data-name="Container">
                <div className="absolute h-[277.563px] left-0 top-0 w-[423.656px]" data-name="Container">
                  <div className="absolute h-[71.984px] left-[180.45px] opacity-90 top-[28px] w-[62.75px]" data-name="Image (FAA\'s Legislation emblem)">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageFaAsLegislationEmblem} />
                  </div>
                  <div className="absolute h-[35.188px] left-[24px] top-[141.59px] w-[375.656px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[35.2px] left-[188.17px] not-italic text-[#1d293d] text-[22px] text-center text-nowrap top-0 tracking-[-0.22px] translate-x-[-50%]">{`FAA's Legislation`}</p>
                  </div>
                  <div className="absolute h-[51.188px] left-[24px] top-[202.38px] w-[375.656px]" data-name="Paragraph">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-[188.08px] not-italic text-[#62748e] text-[16px] text-center top-[-2px] translate-x-[-50%] w-[374px]">Legislation and decisions specific to the Financial Audit Authority</p>
                  </div>
                </div>
                <div className="absolute bg-[#8b2c2e] h-[277.563px] left-0 top-0 w-[4px]" data-name="Container" />
              </div>
            </div>
            <div className="bg-white h-[212.797px] relative rounded-[24px] shrink-0 w-full" data-name="Container">
              <div aria-hidden="true" className="absolute border-[#e7000b] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06),0px_8px_24px_0px_rgba(0,0,0,0.08)]" />
              <div className="size-full">
                <div className="content-stretch flex flex-col items-start pb-0 pl-[36px] pr-[32px] pt-[32px] relative size-full">
                  <div className="content-stretch flex gap-[16px] h-[148.797px] items-start relative shrink-0 w-full" data-name="Container">
                    <Wrapper additionalClassNames="bg-[#fef2f2] rounded-[3.35544e+07px] size-[48px]">
                      <div className="relative shrink-0 size-[24px]" data-name="Icon">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                          <g id="Icon">
                            <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d="M12 8V12" id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d="M12 16H12.01" id="Vector_3" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </g>
                        </svg>
                      </div>
                    </Wrapper>
                    <div className="basis-0 grow h-[148.797px] min-h-px min-w-px relative shrink-0" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
                        <div className="content-stretch flex h-[30.797px] items-start relative shrink-0 w-full" data-name="Heading 3">
                          <p className="basis-0 font-['Arial:Bold',sans-serif] grow leading-[30.8px] min-h-px min-w-px not-italic relative shrink-0 text-[#0f172b] text-[22px]">Important Notice</p>
                        </div>
                        <div className="content-stretch flex flex-col gap-[12px] h-[102px] items-start relative shrink-0 w-full" data-name="List">
                          <div className="h-[26px] relative shrink-0 w-full" data-name="List Item">
                            <TextText text="1" />
                            <TextText1 text="It is strictly prohibited to copy any content, transfer or capture any information or data from this platform." />
                          </div>
                          <div className="h-[26px] relative shrink-0 w-full" data-name="List Item">
                            <TextText text="2" />
                            <TextText1 text="Access is only permitted for authorized users." />
                          </div>
                          <div className="h-[26px] relative shrink-0 w-full" data-name="List Item">
                            <TextText text="3" />
                            <TextText1 text="We highly appreciate your understanding and adherence to these guidelines." />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-white content-stretch flex flex-col h-[136px] items-start left-0 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[1495px]" data-name="FAAHeader">
        <Container additionalClassNames="bg-white h-[80px]">
          <div className="h-[62px] relative shrink-0 w-[154px]" data-name="Image (Government of Dubai)">
            <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageGovernmentOfDubai} />
          </div>
          <div className="h-[48px] relative shrink-0 w-[208.516px]" data-name="Image (Financial Audit Authority)">
            <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageFinancialAuditAuthority} />
          </div>
        </Container>
        <Container additionalClassNames="bg-[#7b282d] h-[56px]">
          <div className="h-[32px] relative shrink-0 w-[503.641px]" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center relative size-full">
              <Wrapper additionalClassNames="rounded-[6.8px] size-[32px]">
                <Icon additionalClassNames="relative shrink-0">
                  <path d="M2.66667 8H13.3333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M2.66667 12H13.3333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M2.66667 4H13.3333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </Icon>
              </Wrapper>
              <div className="basis-0 grow h-[22.391px] min-h-px min-w-px relative shrink-0" data-name="Navigation">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center relative size-full">
                  <div className="h-[22.391px] relative shrink-0 w-[37.359px]" data-name="Button">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                      <Wrapper1 additionalClassNames="h-[22.391px]">
                        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[19px] not-italic text-[14px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Home</p>
                      </Wrapper1>
                    </div>
                  </div>
                  <div className="basis-0 grow h-[22.391px] min-h-px min-w-px relative shrink-0" data-name="Button">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                      <Wrapper1 additionalClassNames="h-[22.391px]">
                        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[70.5px] not-italic text-[14px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Organization Structure</p>
                      </Wrapper1>
                    </div>
                  </div>
                  <div className="h-[22.391px] relative shrink-0 w-[70.828px]" data-name="Button">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                      <Wrapper1 additionalClassNames="h-[22.391px]">
                        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[35.5px] not-italic text-[14px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Automation</p>
                      </Wrapper1>
                    </div>
                  </div>
                  <div className="h-[22.391px] relative shrink-0 w-[127.375px]" data-name="Button">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                      <Wrapper1 additionalClassNames="h-[22.391px]">
                        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[64px] not-italic text-[14px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Approved Templates</p>
                      </Wrapper1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Wrapper2 additionalClassNames="h-[40px] w-[259.047px]">
            <div className="absolute content-stretch flex gap-[6px] h-[30px] items-center left-0 px-[9px] py-px rounded-[8px] top-[5px] w-[95.594px]" data-name="Button">
              <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <div className="relative shrink-0 size-[16px]" data-name="Icon">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute contents inset-0" data-name="Clip path group">
                    <div className="absolute inset-[8.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.333px] mask-size-[16px_16px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
                      <div className="absolute inset-[-5%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                          <g id="Group">
                            <path d={svgPaths.p29e83a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p1cb44d00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M0.666665 7.33333H14" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Wrapper1 additionalClassNames="h-[19.188px]">
                <p className="absolute font-['Arial:Regular',sans-serif] leading-[19.2px] left-[13px] not-italic text-[12px] text-center text-nowrap text-white top-[-1px] translate-x-[-50%]" dir="auto">
                  العربية
                </p>
              </Wrapper1>
              <div className="bg-[#e5e7eb] h-[16px] shrink-0 w-px" data-name="Container" />
              <Wrapper2 additionalClassNames="h-[19.188px] w-[16.672px]">
                <p className="absolute font-['Arial:Regular',sans-serif] leading-[19.2px] left-[8.5px] not-italic text-[12px] text-center text-nowrap text-white top-[-1px] translate-x-[-50%]">AR</p>
              </Wrapper2>
            </div>
            <div className="absolute content-stretch flex gap-[8px] h-[40px] items-center left-[155.59px] px-[12px] py-0 rounded-[4px] top-0 w-[103.453px]" data-name="Container">
              <Wrapper additionalClassNames="bg-[rgba(239,239,239,0.3)] rounded-[3.35544e+07px] size-[24px]">
                <Icon additionalClassNames="relative shrink-0">
                  <path d={svgPaths.p399eca00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d={svgPaths.pc93b400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </Icon>
              </Wrapper>
              <Wrapper1 additionalClassNames="h-[20.797px]">
                <p className="absolute font-['Arial:Regular',sans-serif] leading-[20.8px] left-0 not-italic text-[13px] text-nowrap text-white top-[-1px]">User</p>
              </Wrapper1>
              <div className="relative shrink-0 size-[12px]" data-name="Icon">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                  <g id="Icon">
                    <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </div>
            </div>
            <div className="absolute left-[107.59px] rounded-[6.8px] size-[36px] top-[2px]" data-name="Button">
              <Icon additionalClassNames="absolute left-[10px] top-[10px]">
                <path d={svgPaths.p388cb800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d={svgPaths.p5baad20} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </Icon>
              <div className="absolute bg-white left-[22px] rounded-[3.35544e+07px] size-[8px] top-[6px]" data-name="Container" />
            </div>
          </Wrapper2>
        </Container>
      </div>
      <div className="absolute bg-[#7b282d] h-[176px] left-0 overflow-clip top-[136px] w-[1495px]" data-name="Container">
        <div className="absolute h-[200px] left-0 opacity-10 top-0 w-[1495px]" data-name="Image">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
        </div>
        <div className="absolute content-stretch flex flex-col gap-[8px] h-[107.188px] items-start left-[88px] top-[24px] w-[768px]" data-name="Container">
          <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 1">
            <p className="absolute font-['Arial:Regular',sans-serif] leading-[48px] left-0 not-italic text-[40px] text-nowrap text-white top-[-4px]">Legislations</p>
          </div>
          <div className="h-[51.188px] relative shrink-0 w-full" data-name="Paragraph">
            <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.9)] top-[-1px] w-[765px]">Browse through organized collections of legal documents, regulations, and official opinions. Each category is authenticated and regularly updated to ensure accuracy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}