import svgPaths from "./svg-o2v51p5o8x";
import clsx from "clsx";

function Heading({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full">
      <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[20px] text-black text-center text-nowrap">{children}</p>
    </div>
  );
}
type Container1Props = {
  additionalClassNames?: string;
};

function Container1({ children, additionalClassNames = "" }: React.PropsWithChildren<Container1Props>) {
  return (
    <div className={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">{children}</div>
    </div>
  );
}
type ContainerProps = {
  additionalClassNames?: string;
};

function Container({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerProps>) {
  return (
    <div className={clsx("relative rounded-[10px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}

function Icon1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">{children}</g>
      </svg>
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

export default function Card() {
  return (
    <div className="bg-white relative rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-full" data-name="Card">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start pb-0 pt-[24px] px-[24px] relative size-full">
          <div className="content-stretch flex h-[36px] items-center justify-between relative shrink-0 w-full" data-name="HomePage">
            <div className="h-[33.594px] relative shrink-0 w-[181.031px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
                <Container additionalClassNames="bg-[rgba(123,40,45,0.1)] size-[32px]">
                  <Icon additionalClassNames="relative shrink-0">
                    <path d={svgPaths.p19d57600} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d="M2 6H14" id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d="M2 10H14" id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d="M6 2V14" id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d="M10 2V14" id="Vector_5" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </Icon>
                </Container>
                <div className="basis-0 grow h-[33.594px] min-h-px min-w-px relative shrink-0" data-name="Heading 3">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                    <p className="font-['Arial:Regular',sans-serif] leading-[33.6px] not-italic relative shrink-0 text-[24px] text-black text-nowrap">Services</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[36px] relative rounded-[6.8px] shrink-0 w-[154.641px]" data-name="Button">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[67px] not-italic text-[#7b282d] text-[12px] text-center text-nowrap top-[9px] translate-x-[-50%]">View All Services</p>
                <Icon additionalClassNames="absolute left-[126.64px] top-[10px]">
                  <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </Icon>
              </div>
            </div>
          </div>
          <div className="h-[152px] relative shrink-0 w-[1043px]" data-name="HomePage">
            <div className="absolute bg-white content-stretch flex flex-col h-[152px] items-start left-0 pb-px pt-[17px] px-[17px] rounded-[10px] top-[-0.34px] w-[269px]" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
              <div className="content-stretch flex flex-col gap-[12px] h-[117.594px] items-center relative shrink-0 w-full" data-name="Container">
                <Container additionalClassNames="bg-[rgba(151,27,30,0.1)] size-[48px]">
                  <Icon1>
                    <path d={svgPaths.p1d820380} id="Vector" stroke="var(--stroke-0, #971B1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d={svgPaths.p27451300} id="Vector_2" stroke="var(--stroke-0, #971B1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d={svgPaths.p2981fe00} id="Vector_3" stroke="var(--stroke-0, #971B1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d={svgPaths.p161d4800} id="Vector_4" stroke="var(--stroke-0, #971B1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </Icon1>
                </Container>
                <Container1 additionalClassNames="w-[135.078px]">
                  <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full" data-name="Heading 4">
                    <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[20px] text-black text-center">Administration</p>
                  </div>
                  <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[67.78px] not-italic text-[#4b5563] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Central portal</p>
                  </div>
                </Container1>
              </div>
            </div>
            <div className="absolute bg-white content-stretch flex flex-col h-[152px] items-start left-[279px] pb-px pt-[17px] px-[17px] rounded-[10px] top-[-0.34px] w-[270px]" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
              <div className="content-stretch flex flex-col gap-[12px] h-[117.594px] items-center relative shrink-0 w-full" data-name="Container">
                <Container additionalClassNames="bg-[rgba(140,212,228,0.1)] size-[48px]">
                  <Icon1>
                    <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, #1949A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d={svgPaths.p2d59bff0} id="Vector_2" stroke="var(--stroke-0, #1949A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d={svgPaths.p163b1640} id="Vector_3" stroke="var(--stroke-0, #1949A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </Icon1>
                </Container>
                <Container1 additionalClassNames="w-[152.563px]">
                  <Heading>Employee Profile</Heading>
                  <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[76.45px] not-italic text-[#4b5563] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">View information</p>
                  </div>
                </Container1>
              </div>
            </div>
            <div className="absolute bg-white content-stretch flex flex-col h-[152px] items-start left-[558px] pb-px pt-[17px] px-[17px] rounded-[10px] top-[-0.34px] w-[270px]" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
              <div className="content-stretch flex flex-col gap-[12px] h-[117.594px] items-center relative shrink-0 w-full" data-name="Container">
                <Container additionalClassNames="bg-[rgba(140,212,228,0.1)] size-[48px]">
                  <Icon1>
                    <path d={svgPaths.p2469b00} id="Vector" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d={svgPaths.p3eef23d2} id="Vector_2" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d="M12 11H16" id="Vector_3" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d="M12 16H16" id="Vector_4" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d="M8 11H8.01" id="Vector_5" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d="M8 16H8.01" id="Vector_6" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </Icon1>
                </Container>
                <Container1 additionalClassNames="w-[145.344px]">
                  <Heading>{`Request & Tasks`}</Heading>
                  <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[72.45px] not-italic text-[#4b5563] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Work tracking</p>
                  </div>
                </Container1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}