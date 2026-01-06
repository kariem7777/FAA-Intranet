import svgPaths from "./svg-xmmkfdph7e";
import clsx from "clsx";
import imgImageShootingActivity from "figma:asset/8c68b1421c9d494969f62752cb2db352cf34a27d.png";

function Container1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[76px] relative shrink-0 w-[56px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center relative size-full">{children}</div>
    </div>
  );
}

function Icon({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">{children}</div>
    </div>
  );
}
type TextText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TextText1({ text, additionalClassNames = "" }: TextText1Props) {
  return (
    <div className={clsx("h-[16px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4b5563] text-[12px] text-nowrap">{text}</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[56px]">
      <div aria-hidden="true" className="absolute border border-[rgba(123,40,45,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <div className="h-[32px] relative shrink-0 w-[12.938px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
            <p className="font-['Arial:Regular',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#7b282d] text-[24px] text-nowrap">{"0"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
type TextTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextText({ text, additionalClassNames = "" }: TextTextProps) {
  return (
    <div className={clsx("h-[24px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#374151] text-[15px] text-nowrap top-[-1px]">{text}</p>
      </div>
    </div>
  );
}

export default function PrimitiveDiv() {
  return (
    <div className="bg-white overflow-clip relative rounded-[16.4px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Primitive.div">
      <div className="absolute h-[745.969px] left-0 top-0 w-[860px]" data-name="HomePage">
        <div className="absolute h-[419px] left-[40px] rounded-[12px] top-[40px] w-[332px]" data-name="Image (Shooting Activity)">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgImageShootingActivity} />
        </div>
        <div className="absolute h-[745.969px] left-[396px] top-0 w-[464px]" data-name="Container">
          <div className="absolute bg-white border border-[#d1d5db] border-solid h-[27.594px] left-0 rounded-[4px] top-[40px] w-[93.578px]" data-name="Container">
            <div className="absolute left-[10px] overflow-clip size-[14px] top-[5.8px]" data-name="Icon">
              <div className="absolute inset-[12.5%_20.83%]" data-name="Group">
                <div className="absolute inset-[-5.56%_-7.14%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.3333 11.6667">
                    <g id="Group">
                      <path d={svgPaths.pe59ef00} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                      <path d={svgPaths.p85d8580} id="Vector_2" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute h-[17.594px] left-[32px] top-[4px] w-[49.578px]" data-name="Text">
              <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.6px] left-0 not-italic text-[#4b5563] text-[11px] text-nowrap top-[-2px] tracking-[0.275px]">Men Only</p>
            </div>
          </div>
          <div className="absolute h-[83.188px] left-0 top-[94.59px] w-[402px]" data-name="Heading 2">
            <p className="absolute font-['Arial:Regular',sans-serif] leading-[41.6px] left-0 not-italic text-[#111827] text-[32px] top-[-3px] w-[370px]">Shooting Activity at Jebel Ali Shooting Club</p>
          </div>
          <div className="absolute h-[51.188px] left-0 top-[193.78px] w-[402px]" data-name="Paragraph">
            <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4b5563] text-[16px] top-[-1px] w-[402px]">{`Join us for a safe and competitive shooting experience at one of Dubai's premier facilities.`}</p>
          </div>
          <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-0 top-[269px] w-[416px]">
            <div className="content-stretch flex flex-col gap-[12px] h-[67px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="relative shrink-0 w-full">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[53px] items-start relative w-full">
                  <div className="content-stretch flex gap-[12px] h-[24px] items-center relative shrink-0" data-name="Container">
                    <Icon>
                      <div className="absolute inset-[8.33%_16.67%]" data-name="Group">
                        <div className="absolute inset-[-5%_-6.25%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14.6665">
                            <g id="Group">
                              <path d={svgPaths.pf3d6280} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                              <path d={svgPaths.p50a2400} id="Vector_2" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </Icon>
                    <TextText text="Jebel Ali Shooting Club" additionalClassNames="w-[153.063px]" />
                  </div>
                  <div className="content-stretch flex gap-[12px] h-[24px] items-center relative shrink-0 w-[172px]" data-name="Container">
                    <Icon>
                      <div className="absolute inset-[8.33%]" data-name="Group">
                        <div className="absolute inset-[-5%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                            <g id="Group">
                              <path d={svgPaths.p193b5b80} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                              <path d={svgPaths.p29e83a00} id="Vector_2" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </Icon>
                    <TextText text="11:30 AM – 01:45 PM" additionalClassNames="w-[140.156px]" />
                  </div>
                </div>
              </div>
              <div className="relative shrink-0 w-[416px]" data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
                  <Icon>
                    <div className="absolute inset-[8.33%_12.5%]" data-name="Group">
                      <div className="absolute inset-[-5%_-5.56%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 14.6667">
                          <g id="Group">
                            <path d="M4 0.666665V3.33333" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M9.33337 0.666665V3.33333" id="Vector_2" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p378e1b00} id="Vector_3" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M0.666665 6H12.6667" id="Vector_4" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </Icon>
                  <TextText text="Saturday, 20 December 2025" additionalClassNames="w-[190.141px]" />
                </div>
              </div>
            </div>
            <div className="h-[114px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
              <div className="size-full">
                <div className="content-stretch flex flex-col gap-[8px] items-start pl-0 pr-[17px] py-0 relative size-full">
                  <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
                    <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#7b282d] text-[12px] tracking-[0.3px] uppercase">Event Starts In</p>
                  </div>
                  <div className="content-stretch flex gap-[12px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
                    <Container1>
                      <Container />
                      <TextText1 text="Days" additionalClassNames="w-[25.422px]" />
                    </Container1>
                    <Container1>
                      <Container />
                      <TextText1 text="Hours" additionalClassNames="w-[31.609px]" />
                    </Container1>
                    <Container1>
                      <Container />
                      <TextText1 text="Mins" additionalClassNames="w-[25.578px]" />
                    </Container1>
                    <Container1>
                      <Container />
                      <TextText1 text="Secs" additionalClassNames="w-[23.297px]" />
                    </Container1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col gap-[14px] h-[110px] items-start left-[-351px] top-[490px] w-[767px]" data-name="Container">
            <div className="bg-[#7b282d] h-[48px] relative rounded-[10px] shrink-0 w-[767px]" data-name="Link">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                <p className="font-['Arial:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[15px] text-nowrap text-white">Register Now</p>
              </div>
            </div>
            <div className="basis-0 grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[767px]" data-name="Link">
              <div aria-hidden="true" className="absolute border border-[#7b282d] border-solid inset-0 pointer-events-none rounded-[10px]" />
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
                <p className="font-['Arial:Regular',sans-serif] leading-[22.4px] not-italic relative shrink-0 text-[#a94442] text-[14px] text-nowrap">Register via Email</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[25.594px] left-0 top-[607.41px] w-[860px]" data-name="Paragraph">
          <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[430.13px] not-italic text-[#6b7280] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Organized by Human Resources Department</p>
        </div>
      </div>
      <div className="absolute left-[828px] opacity-70 rounded-[2px] size-[16px] top-[16px]" data-name="Primitive.button">
        <div className="absolute left-0 size-[16px] top-0" data-name="Icon">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <g id="Icon">
              <path d="M12 4L4 12" id="Vector" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d="M4 4L12 12" id="Vector_2" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </g>
          </svg>
        </div>
        <div className="absolute left-[7px] overflow-clip size-px top-[15px]" data-name="DialogContent">
          <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[19.5px] not-italic text-[#1a1a1a] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Close</p>
        </div>
      </div>
    </div>
  );
}