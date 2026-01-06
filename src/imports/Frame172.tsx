import svgPaths from "./svg-29gymdsypi";
import clsx from "clsx";
type ContainerBackgroundImage7Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage7({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage7Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">{children}</div>
    </div>
  );
}

function ContainerBackgroundImage6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[6px] relative shrink-0 w-[383.656px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center justify-center relative size-full">{children}</div>
    </div>
  );
}

function ContainerBackgroundImage5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[53.188px] relative shrink-0 w-[383.656px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">{children}</div>
    </div>
  );
}
type ContainerBackgroundImage4Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage4Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">{children}</div>
    </div>
  );
}
type ContainerBackgroundImage3Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage3Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return <BackgroundImage3 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</BackgroundImage3>;
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return <BackgroundImage3 additionalClassNames={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>{children}</BackgroundImage3>;
}

function IconBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute left-[10px] size-[12px] top-[6px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}

function ContainerBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[28px] relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[21px] py-0 relative size-full">{children}</div>
      </div>
    </div>
  );
}

function IconBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}

function ContainerBackgroundImage1() {
  return (
    <div className="h-[62.188px] relative shrink-0 w-[383.656px]">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11px] px-0 relative size-full">
        <div className="h-[51.188px] relative shrink-0 w-full">
          <p className="absolute font-['Arial:Italic',sans-serif] italic leading-[25.6px] left-[192.31px] text-[#4a5565] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[343px]">{"Our thoughts and prayers are with our colleagues during this difficult time"}</p>
        </div>
      </div>
    </div>
  );
}
type ParagraphBackgroundImageAndText2Props = {
  text: string;
};

function ParagraphBackgroundImageAndText2({ text }: ParagraphBackgroundImageAndText2Props) {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#6a7282] text-[16px] text-nowrap top-[-1px]">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndText1Props = {
  text: string;
};

function ParagraphBackgroundImageAndText1({ text }: ParagraphBackgroundImageAndText1Props) {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-1px]">{text}</p>
    </div>
  );
}
type HeadingBackgroundImageAndText1Props = {
  text: string;
};

function HeadingBackgroundImageAndText1({ text }: HeadingBackgroundImageAndText1Props) {
  return (
    <div className="h-[27px] relative shrink-0 w-full">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-[calc(50%-0.5px)] not-italic text-[18px] text-black text-center text-nowrap top-0 translate-x-[-50%]">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndTextProps = {
  text: string;
};

function ParagraphBackgroundImageAndText({ text }: ParagraphBackgroundImageAndTextProps) {
  return (
    <div className="h-[26px] relative shrink-0 w-full">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[calc(50%+0.5px)] not-italic text-[#6b7280] text-[16px] text-center text-nowrap top-0 translate-x-[-50%]">{text}</p>
    </div>
  );
}

function ContainerBackgroundImage() {
  return (
    <div className="h-[24px] relative shrink-0 w-[54px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-start relative size-full">
        <div className="bg-white opacity-30 relative rounded-[3.35544e+07px] shrink-0 size-[24px]">
          <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
            <BackgroundImage>
              <path d="M8.75 10.5L5.25 7L8.75 3.5" id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </BackgroundImage>
          </div>
        </div>
        <div className="basis-0 bg-white grow h-[24px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0">
          <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
            <BackgroundImage>
              <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </BackgroundImage>
          </div>
        </div>
      </div>
    </div>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
};

function HeadingBackgroundImageAndText({ text }: HeadingBackgroundImageAndTextProps) {
  return (
    <BackgroundImage2 additionalClassNames="h-[28px]">
      <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[20px] text-black text-nowrap">{text}</p>
    </BackgroundImage2>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
      <p className="font-['Arial:Regular',sans-serif] leading-[33.6px] not-italic relative shrink-0 text-[24px] text-black text-nowrap">{text}</p>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[22px] items-end relative size-full">
      <div className="bg-white content-stretch flex flex-col gap-[24px] h-[404px] items-start pb-0 pt-[24px] px-[24px] relative rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-[883px]" data-name="Card">
        <div className="content-stretch flex gap-[8px] h-[33.594px] items-center relative shrink-0 w-full" data-name="HomePage">
          <ContainerBackgroundImage3 additionalClassNames="bg-[rgba(123,40,45,0.1)] rounded-[10px] size-[32px]">
            <IconBackgroundImage>
              <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d={svgPaths.p35b3faa0} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </IconBackgroundImage>
          </ContainerBackgroundImage3>
          <div className="h-[33.594px] relative shrink-0 w-[180.563px]" data-name="Heading 3">
            <BackgroundImageAndText text="People Spotlight" />
          </div>
        </div>
        <div className="h-[367px] relative shrink-0 w-[838px]" data-name="HomePage">
          <div className="absolute bg-[#f8f9fa] content-stretch flex flex-col gap-[16px] h-[295px] items-start left-0 pb-px pt-[21px] px-0 rounded-[10px] top-[-0.19px] w-[273px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <ContainerBackgroundImage2>
              <ContainerBackgroundImage4 additionalClassNames="h-[28px] w-[127.063px]">
                <ContainerBackgroundImage3 additionalClassNames="bg-[rgba(1,148,154,0.1)] rounded-[6.8px] size-[24px]">
                  <BackgroundImage>
                    <path d={svgPaths.p317fdd80} id="Vector" stroke="var(--stroke-0, #01949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                    <path d={svgPaths.pc62e8b0} id="Vector_2" stroke="var(--stroke-0, #01949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                    <path d={svgPaths.pe97dd00} id="Vector_3" stroke="var(--stroke-0, #01949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                    <path d={svgPaths.p31c78b80} id="Vector_4" stroke="var(--stroke-0, #01949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                  </BackgroundImage>
                </ContainerBackgroundImage3>
                <HeadingBackgroundImageAndText text="New Faces" />
              </ContainerBackgroundImage4>
              <ContainerBackgroundImage />
            </ContainerBackgroundImage2>
            <div className="bg-white h-[230px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
              <div className="absolute h-[25px] left-[17px] top-[184px] w-[305px]" data-name="Paragraph">
                <div className="absolute content-stretch flex flex-col gap-[4px] items-center left-0 top-[-173px] w-[257px]">
                  <div className="bg-[rgba(1,148,154,0.1)] h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[47px]" data-name="Container">
                    <div className="absolute content-stretch flex h-[16px] items-start left-[10px] top-[4px] w-[27.156px]" data-name="Text">
                      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#01949a] text-[12px] text-nowrap tracking-[0.3px] uppercase">New</p>
                    </div>
                  </div>
                  <div className="content-stretch flex h-[70px] items-center justify-center pl-0 pr-[0.016px] py-0 relative rounded-[3.35544e+07px] shrink-0 w-[71px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135.406deg, rgba(1, 148, 154, 0.2) 0%, rgba(6, 67, 104, 0.2) 100%)" }}>
                    <BackgroundImage1 additionalClassNames="h-[28px] w-[30.859px]">
                      <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#064368] text-[20px] text-nowrap">MA</p>
                    </BackgroundImage1>
                  </div>
                  <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 5">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-1/2 not-italic text-[18px] text-black text-center text-nowrap top-0 translate-x-[-50%]">Mohammed Ahmed</p>
                  </div>
                  <ParagraphBackgroundImageAndText text="Junior Auditor" />
                  <p className="font-['Arial:Regular',sans-serif] leading-[25.6px] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[16px] text-center w-[min-content]">Financial Audit</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-[#fffbf0] content-stretch flex flex-col gap-[16px] h-[295px] items-start left-[282px] pb-px pt-[21px] px-0 rounded-[10px] top-[-0.19px] w-[274px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <ContainerBackgroundImage2>
              <ContainerBackgroundImage4 additionalClassNames="h-[28px] w-[127.063px]">
                <ContainerBackgroundImage3 additionalClassNames="bg-[rgba(212,175,55,0.15)] rounded-[6.8px] size-[24px]">
                  <BackgroundImage>
                    <path d={svgPaths.p2763a240} fill="var(--fill-0, #D4AF37)" id="Vector" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                  </BackgroundImage>
                </ContainerBackgroundImage3>
                <HeadingBackgroundImageAndText text="Employee of the Month" />
              </ContainerBackgroundImage4>
            </ContainerBackgroundImage2>
            <div className="bg-white h-[230px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
              <div className="absolute h-[25px] left-[17px] top-[184px] w-[305px]" data-name="Paragraph">
                <div className="absolute content-stretch flex flex-col gap-[4px] items-center left-0 top-[-173px] w-[257px]">
                  <div className="bg-gradient-to-r from-[rgba(212,175,55,0.1)] h-[24px] relative rounded-[3.35544e+07px] shrink-0 to-[rgba(245,158,11,0.1)] w-[129px]" data-name="Container">
                    <IconBackgroundImage1>
                      <path d={svgPaths.p13ef6900} id="Vector" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" />
                      <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" />
                    </IconBackgroundImage1>
                    <div className="absolute h-[16px] left-[31px] top-[6px] w-[83.609px]" data-name="Text">
                      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[42px] not-italic text-[#d4af37] text-[10px] text-center text-nowrap top-[-1px] tracking-[0.25px] translate-x-[-50%] uppercase">Star Performer</p>
                    </div>
                  </div>
                  <div className="bg-[#fbedd1] content-stretch flex h-[70px] items-center justify-center pl-0 pr-[0.016px] py-0 relative rounded-[3.35544e+07px] shrink-0 w-[71px]" data-name="Container">
                    <BackgroundImage1 additionalClassNames="h-[28px] w-[30.859px]">
                      <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#d4af37] text-[20px] text-nowrap">FAZ</p>
                    </BackgroundImage1>
                  </div>
                  <HeadingBackgroundImageAndText1 text="Fatima Al Zaabi" />
                  <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[calc(50%+1px)] not-italic text-[#6b7280] text-[16px] text-center text-nowrap top-0 translate-x-[-50%]">Lead Auditor - Financial Sector</p>
                  </div>
                  <p className="font-['Arial:Regular',sans-serif] leading-[25.6px] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[16px] text-center w-[min-content]">{`Outstanding performance `}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-[#f5f3ff] content-stretch flex flex-col gap-[16px] h-[295px] items-start left-[565px] pb-px pt-[21px] px-0 rounded-[10px] top-[-0.19px] w-[273px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <ContainerBackgroundImage2>
              <ContainerBackgroundImage4 additionalClassNames="h-[28px] w-[145.484px]">
                <ContainerBackgroundImage3 additionalClassNames="bg-[rgba(139,92,246,0.1)] rounded-[6.8px] size-[24px]">
                  <BackgroundImage>
                    <path d={svgPaths.p38f58bd0} id="Vector" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                    <path d={svgPaths.p11188400} id="Vector_2" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                  </BackgroundImage>
                </ContainerBackgroundImage3>
                <HeadingBackgroundImageAndText text="Celebrations" />
              </ContainerBackgroundImage4>
              <ContainerBackgroundImage />
            </ContainerBackgroundImage2>
            <div className="bg-white h-[230px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
              <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[10px]" />
              <div className="absolute h-[25px] left-[17px] top-[184px] w-[305px]" data-name="Paragraph">
                <div className="absolute content-stretch flex flex-col gap-[4px] items-center left-0 top-[-173px] w-[257px]">
                  <div className="bg-[rgba(139,92,246,0.08)] h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[116.594px]" data-name="Container">
                    <IconBackgroundImage1>
                      <path d={svgPaths.p13ef6900} id="Vector" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" />
                      <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" />
                    </IconBackgroundImage1>
                    <div className="absolute content-stretch flex h-[16px] items-start left-[26px] top-[4px] w-[80.594px]" data-name="Text">
                      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8b5cf6] text-[12px] text-nowrap tracking-[0.3px] uppercase">Anniversary</p>
                    </div>
                  </div>
                  <div className="bg-[rgba(139,92,246,0.13)] content-stretch flex h-[70px] items-center justify-center pl-0 pr-[0.016px] py-0 relative rounded-[3.35544e+07px] shrink-0 w-[71px]" data-name="Container">
                    <div className="h-[48px] relative shrink-0 w-[27.234px]" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center relative size-full">
                        <BackgroundImage2 additionalClassNames="w-[21.563px]">
                          <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#8b5cf6] text-[20px] text-nowrap">15</p>
                        </BackgroundImage2>
                        <BackgroundImage1 additionalClassNames="h-[16px] w-[27.234px]">
                          <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8b5cf6] text-[12px] text-nowrap">Years</p>
                        </BackgroundImage1>
                      </div>
                    </div>
                  </div>
                  <HeadingBackgroundImageAndText1 text="Khalid Al Mansoori" />
                  <ParagraphBackgroundImageAndText text="15 Years of Service" />
                  <p className="font-['Arial:Regular',sans-serif] leading-[25.6px] min-w-full not-italic relative shrink-0 text-[#9ca3af] text-[16px] text-center w-[min-content]">Finance Department</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[42px] h-[401px] items-start pl-[24px] pr-0 py-[24px] relative rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-[432px]" data-name="Card">
        <div className="h-[33.594px] relative shrink-0 w-[383.656px]" data-name="HomePage">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
            <ContainerBackgroundImage4 additionalClassNames="h-[33.594px] w-[179.453px]">
              <ContainerBackgroundImage3 additionalClassNames="bg-[rgba(123,40,45,0.1)] rounded-[10px] size-[32px]">
                <IconBackgroundImage>
                  <path d={svgPaths.p14af6540} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </IconBackgroundImage>
              </ContainerBackgroundImage3>
              <div className="basis-0 grow h-[33.594px] min-h-px min-w-px relative shrink-0" data-name="Heading 3">
                <BackgroundImageAndText text="Condolences" />
              </div>
            </ContainerBackgroundImage4>
            <div className="h-[28px] relative shrink-0 w-[60px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start relative size-full">
                <div className="bg-white opacity-30 relative rounded-[3.35544e+07px] shrink-0 size-[28px]" data-name="Button">
                  <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
                    <IconBackgroundImage>
                      <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </IconBackgroundImage>
                  </div>
                </div>
                <div className="basis-0 bg-white grow h-[28px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Button">
                  <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
                    <IconBackgroundImage>
                      <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </IconBackgroundImage>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[383.656px]" data-name="HomePage">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
            <ContainerBackgroundImage7 additionalClassNames="h-[164px] w-[384px]">
              <ContainerBackgroundImage5>
                <ParagraphBackgroundImageAndText1 text="Ahmed Al Mansouri" />
                <ParagraphBackgroundImageAndText2 text="Loss of his father" />
              </ContainerBackgroundImage5>
              <ContainerBackgroundImage1 />
              <ContainerBackgroundImage6>
                <div className="bg-[#7b282d] rounded-[3.35544e+07px] shrink-0 size-[6px]" data-name="Button" />
                <div className="bg-[#d1d5db] rounded-[3.35544e+07px] shrink-0 size-[6px]" data-name="Button" />
              </ContainerBackgroundImage6>
            </ContainerBackgroundImage7>
            <ContainerBackgroundImage7 additionalClassNames="h-[202.406px] w-[383.656px]">
              <ContainerBackgroundImage5>
                <ParagraphBackgroundImageAndText1 text="Fatima Al Shamsi" />
                <ParagraphBackgroundImageAndText2 text="Loss of her mother" />
              </ContainerBackgroundImage5>
              <ContainerBackgroundImage1 />
              <ContainerBackgroundImage6>
                <div className="bg-[#7b282d] rounded-[3.35544e+07px] shrink-0 size-[6px]" data-name="Button" />
                <div className="bg-[#d1d5db] rounded-[3.35544e+07px] shrink-0 size-[6px]" data-name="Button" />
              </ContainerBackgroundImage6>
            </ContainerBackgroundImage7>
          </div>
        </div>
      </div>
    </div>
  );
}