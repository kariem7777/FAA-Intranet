import svgPaths from "./svg-vm247pgmp9";
import clsx from "clsx";
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("h-[55.594px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full">
      <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[20px] text-black text-center text-nowrap">{children}</p>
    </div>
  );
}

function IconBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type IconBackgroundImageProps = {
  additionalClassNames?: string;
};

function IconBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImageProps>) {
  return (
    <div className={clsx("size-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
};

function HeadingBackgroundImageAndText({ text }: HeadingBackgroundImageAndTextProps) {
  return <BackgroundImage>{text}</BackgroundImage>;
}

export default function Card() {
  return (
    <div className="bg-white relative rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-full" data-name="Card">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start pb-0 pt-[24px] px-[24px] relative size-full">
          <div className="content-stretch flex h-[67.188px] items-center justify-between relative shrink-0 w-full" data-name="HomePage">
            <div className="h-[33.594px] relative shrink-0 w-[128.5px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
                <div className="bg-[rgba(123,40,45,0.1)] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <IconBackgroundImage additionalClassNames="relative shrink-0">
                      <path d={svgPaths.p19d57600} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M2 6H14" id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M2 10H14" id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M6 2V14" id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M10 2V14" id="Vector_5" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </IconBackgroundImage>
                  </div>
                </div>
                <div className="basis-0 grow h-[33.594px] min-h-px min-w-px relative shrink-0" data-name="Heading 3">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                    <p className="font-['Arial:Regular',sans-serif] leading-[33.6px] not-italic relative shrink-0 text-[24px] text-black text-nowrap">Services</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[36px] relative rounded-[6.8px] shrink-0 w-[148.469px]" data-name="Button">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[63.5px] not-italic text-[#7b282d] text-[14px] text-center text-nowrap top-[6px] translate-x-[-50%]">View All Services</p>
                <IconBackgroundImage additionalClassNames="absolute left-[120.47px] top-[10px]">
                  <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </IconBackgroundImage>
              </div>
            </div>
          </div>
          <div className="h-[173.594px] relative shrink-0 w-full" data-name="HomePage">
            <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#ffffff] h-[173.594px] items-start left-0 pb-px pt-[21px] px-[21px] rounded-[16.4px] to-[#fcfcfc] top-0 w-[201.156px]" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
              <div className="content-stretch flex flex-col gap-[12px] h-[131.594px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="basis-0 grow min-h-px min-w-px relative rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-[64px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(151, 27, 30, 0.1) 0%, rgba(151, 27, 30, 0.05) 100%)" }}>
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <IconBackgroundImage1>
                      <path d={svgPaths.p27a3200} id="Vector" stroke="var(--stroke-0, #971B1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d={svgPaths.p2db021c0} id="Vector_2" stroke="var(--stroke-0, #971B1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d={svgPaths.p18f42980} id="Vector_3" stroke="var(--stroke-0, #971B1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d={svgPaths.p2ee517c0} id="Vector_4" stroke="var(--stroke-0, #971B1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                    </IconBackgroundImage1>
                  </div>
                </div>
                <ContainerBackgroundImage additionalClassNames="w-[129.969px]">
                  <HeadingBackgroundImageAndText text="Administration" />
                  <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[65.23px] not-italic text-[#6b7280] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Central portal</p>
                  </div>
                </ContainerBackgroundImage>
              </div>
            </div>
            <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#ffffff] h-[173.594px] items-start left-[217.16px] pb-px pt-[21px] px-[21px] rounded-[16.4px] to-[#fcfcfc] top-0 w-[201.172px]" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
              <div className="content-stretch flex flex-col gap-[12px] h-[131.594px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="basis-0 grow min-h-px min-w-px relative rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-[64px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(6, 67, 104, 0.1) 0%, rgba(6, 67, 104, 0.05) 100%)" }}>
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <IconBackgroundImage1>
                      <path d={svgPaths.p1dee4500} id="Vector" stroke="var(--stroke-0, #064368)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d={svgPaths.p363c980} id="Vector_2" stroke="var(--stroke-0, #064368)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d={svgPaths.p248e5d60} id="Vector_3" stroke="var(--stroke-0, #064368)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                    </IconBackgroundImage1>
                  </div>
                </div>
                <ContainerBackgroundImage additionalClassNames="w-[148.031px]">
                  <HeadingBackgroundImageAndText text="Employee Profile" />
                  <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[74.19px] not-italic text-[#6b7280] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">View information</p>
                  </div>
                </ContainerBackgroundImage>
              </div>
            </div>
            <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#ffffff] h-[173.594px] items-start left-[434.33px] pb-px pt-[21px] px-[21px] rounded-[16.4px] to-[#fcfcfc] top-0 w-[201.172px]" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
              <div className="content-stretch flex flex-col gap-[12px] h-[131.594px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="basis-0 grow min-h-px min-w-px relative rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-[64px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(1, 148, 154, 0.1) 0%, rgba(1, 148, 154, 0.05) 100%)" }}>
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <IconBackgroundImage1>
                      <path d={svgPaths.p304640b0} id="Vector" stroke="var(--stroke-0, #01949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d={svgPaths.p2ed4a000} id="Vector_2" stroke="var(--stroke-0, #01949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d="M16 14.6667H21.3333" id="Vector_3" stroke="var(--stroke-0, #01949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d="M16 21.3333H21.3333" id="Vector_4" stroke="var(--stroke-0, #01949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d="M10.6667 14.6667H10.68" id="Vector_5" stroke="var(--stroke-0, #01949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d="M10.6667 21.3333H10.68" id="Vector_6" stroke="var(--stroke-0, #01949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                    </IconBackgroundImage1>
                  </div>
                </div>
                <ContainerBackgroundImage additionalClassNames="w-[142.953px]">
                  <BackgroundImage>{`Request & Tasks`}</BackgroundImage>
                  <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[71.27px] not-italic text-[#6b7280] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Work tracking</p>
                  </div>
                </ContainerBackgroundImage>
              </div>
            </div>
            <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#ffffff] h-[173.594px] items-start left-[651.5px] pb-px pt-[21px] px-[21px] rounded-[16.4px] to-[#fcfcfc] top-0 w-[201.156px]" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
              <div className="content-stretch flex flex-col gap-[12px] h-[131.594px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="basis-0 grow min-h-px min-w-px relative rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-[64px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(144, 142, 129, 0.1) 0%, rgba(144, 142, 129, 0.05) 100%)" }}>
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <IconBackgroundImage1>
                      <path d={svgPaths.p101a6580} id="Vector" stroke="var(--stroke-0, #908E81)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d={svgPaths.p76546be} id="Vector_2" stroke="var(--stroke-0, #908E81)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d="M13.3333 12H10.6667" id="Vector_3" stroke="var(--stroke-0, #908E81)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d="M21.3333 17.3333H10.6667" id="Vector_4" stroke="var(--stroke-0, #908E81)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d="M21.3333 22.6667H10.6667" id="Vector_5" stroke="var(--stroke-0, #908E81)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                    </IconBackgroundImage1>
                  </div>
                </div>
                <ContainerBackgroundImage additionalClassNames="w-[125.5px]">
                  <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full" data-name="Heading 4">
                    <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[20px] text-black text-center">Documents</p>
                  </div>
                  <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[63.5px] not-italic text-[#6b7280] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">{`Search & manage`}</p>
                  </div>
                </ContainerBackgroundImage>
              </div>
            </div>
            <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#ffffff] h-[173.594px] items-start left-[868.66px] pb-px pt-[21px] px-[21px] rounded-[16.4px] to-[#fcfcfc] top-0 w-[201.172px]" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
              <div className="content-stretch flex flex-col gap-[12px] h-[131.594px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="basis-0 grow min-h-px min-w-px relative rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-[64px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(81, 58, 64, 0.1) 0%, rgba(81, 58, 64, 0.05) 100%)" }}>
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <IconBackgroundImage1>
                      <path d={svgPaths.p2ab60500} id="Vector" stroke="var(--stroke-0, #513A40)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                    </IconBackgroundImage1>
                  </div>
                </div>
                <ContainerBackgroundImage additionalClassNames="w-[147.016px]">
                  <HeadingBackgroundImageAndText text="Digital Signature" />
                  <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[74.23px] not-italic text-[#6b7280] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">UAE Pass</p>
                  </div>
                </ContainerBackgroundImage>
              </div>
            </div>
            <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#ffffff] h-[173.594px] items-start left-[1085.83px] pb-px pt-[21px] px-[21px] rounded-[16.4px] to-[#fcfcfc] top-0 w-[201.172px]" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
              <div className="content-stretch flex flex-col gap-[12px] h-[131.594px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="basis-0 grow min-h-px min-w-px relative rounded-[16.4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-[64px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(140, 212, 228, 0.1) 0%, rgba(140, 212, 228, 0.05) 100%)" }}>
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <IconBackgroundImage1>
                      <path d="M16 9.33333V28" id="Vector" stroke="var(--stroke-0, #01949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                      <path d={svgPaths.p308d0700} id="Vector_2" stroke="var(--stroke-0, #01949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                    </IconBackgroundImage1>
                  </div>
                </div>
                <ContainerBackgroundImage additionalClassNames="w-[141.172px]">
                  <HeadingBackgroundImageAndText text="Knowledge Hub" />
                  <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[70.69px] not-italic text-[#6b7280] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Resources</p>
                  </div>
                </ContainerBackgroundImage>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}