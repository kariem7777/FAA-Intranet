import svgPaths from "./svg-2lkygjj5p6";
import clsx from "clsx";
import imgImageWithFallback from "figma:asset/8c68b1421c9d494969f62752cb2db352cf34a27d.png";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

function Icon4Vector({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-1/4">
      <div className="absolute inset-[-8.33%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
          {children}
        </svg>
      </div>
    </div>
  );
}

function Icon({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper>
      <g id="Icon">{children}</g>
    </Wrapper>
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
      <div className="absolute h-[581px] left-[347px] top-0 w-[495px]" data-name="HomePage">
        <div className="absolute bg-white border border-[#d1d5db] border-solid h-[27.594px] left-[48px] rounded-[4px] top-[40px] w-[91.578px]" data-name="Container">
          <div className="absolute left-[10px] size-[14px] top-[5.8px]" data-name="Icon">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g id="Icon">
                <path d={svgPaths.p100e7280} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                <path d={svgPaths.p38a00300} id="Vector_2" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              </g>
            </svg>
          </div>
          <div className="absolute h-[17.594px] left-[30px] top-[4px] w-[49.578px]" data-name="Text">
            <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.6px] left-0 not-italic text-[#4b5563] text-[11px] text-nowrap top-[-2px] tracking-[0.275px]">Men Only</p>
          </div>
        </div>
        <div className="absolute h-[83.188px] left-[48px] top-[87.59px] w-[416px]" data-name="Heading 2">
          <p className="absolute font-['Arial:Regular',sans-serif] leading-[41.6px] left-0 not-italic text-[#111827] text-[32px] top-[-3px] w-[402px]">Shooting Activity at Jebel Ali Shooting Club</p>
        </div>
        <div className="absolute h-[51.188px] left-[48px] top-[186.78px] w-[416px]" data-name="Paragraph">
          <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4b5563] text-[16px] top-[-1px] w-[402px]">{`Join us for a safe and competitive shooting experience at one of Dubai's premier facilities.`}</p>
        </div>
        <div className="absolute content-stretch flex flex-col gap-[12px] h-[96px] items-start left-[48px] top-[269.97px] w-[416px]" data-name="Container">
          <div className="content-stretch flex gap-[12px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
            <Icon>
              <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </Icon>
            <TextText text="Jebel Ali Shooting Club" additionalClassNames="w-[153.063px]" />
          </div>
          <div className="content-stretch flex gap-[12px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
            <Wrapper>
              <g clipPath="url(#clip0_212_1463)" id="Icon">
                <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </g>
              <defs>
                <clipPath id="clip0_212_1463">
                  <rect fill="white" height="16" width="16" />
                </clipPath>
              </defs>
            </Wrapper>
            <TextText text="11:30 AM – 01:45 PM" additionalClassNames="w-[140.156px]" />
          </div>
          <div className="content-stretch flex gap-[12px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
            <Icon>
              <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </Icon>
            <TextText text="Saturday, 20 December 2025" additionalClassNames="w-[190.141px]" />
          </div>
        </div>
        <div className="absolute h-[85.594px] left-[48px] top-[405.97px] w-[416px]" data-name="Container">
          <div className="absolute bg-[#7b282d] content-stretch flex h-[48px] items-center justify-center left-[-340px] rounded-[10px] top-[0.02px] w-[756px]" data-name="Link">
            <p className="font-['Arial:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[15px] text-nowrap text-white">Register Now</p>
          </div>
          <div className="absolute content-stretch flex h-[48px] items-center justify-center left-[-340px] p-px rounded-[10px] top-[62.02px] w-[756px]" data-name="Link">
            <div aria-hidden="true" className="absolute border border-[#7b282d] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <p className="font-['Arial:Regular',sans-serif] leading-[22.4px] not-italic relative shrink-0 text-[#a94442] text-[14px] text-nowrap">Register via Email</p>
          </div>
        </div>
        <div className="absolute h-[26px] left-[-292px] top-[524px] w-[756px]" data-name="Paragraph">
          <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[208.13px] not-italic text-[#6b7280] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Organized by Human Resources Department</p>
        </div>
        <div className="absolute content-stretch flex flex-col items-start left-[454px] pb-0 pt-[4px] px-[4px] size-[28px] top-[20px]" data-name="HomePage">
          <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
            <Icon4Vector>
              <path d={svgPaths.p354ab980} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </Icon4Vector>
            <Icon4Vector>
              <path d={svgPaths.p2a4db200} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </Icon4Vector>
          </div>
        </div>
      </div>
      <div className="absolute h-[326px] left-[36px] rounded-[12px] top-[40px] w-[324px]" data-name="ImageWithFallback">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgImageWithFallback} />
      </div>
    </div>
  );
}