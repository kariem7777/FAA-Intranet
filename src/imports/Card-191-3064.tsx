import svgPaths from "./svg-9e55z752fr";
import clsx from "clsx";

function Container({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-[98.594px] min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">{children}</div>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={additionalClassNames}>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-center text-nowrap">{children}</p>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return <Wrapper1 additionalClassNames={clsx("absolute content-stretch flex h-[29px] items-center justify-center px-[9px] py-[5px] rounded-[16.4px] top-[3.5px]", additionalClassNames)}>{children}</Wrapper1>;
}

function Icon({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type ParagraphTextProps = {
  text: string;
};

function ParagraphText({ text }: ParagraphTextProps) {
  return (
    <div className="h-[25.594px] overflow-clip relative shrink-0 w-full">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-1px]">{text}</p>
    </div>
  );
}
type HeadingTextProps = {
  text: string;
};

function HeadingText({ text }: HeadingTextProps) {
  return (
    <div className="h-[27px] relative shrink-0 w-full">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[#0a0a0a] text-[18px] text-nowrap top-[-2px]">{text}</p>
    </div>
  );
}
type TextTextProps = {
  text: string;
};

function TextText({ text }: TextTextProps) {
  return (
    <div className="h-[16px] relative shrink-0 w-[61.359px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap">{text}</p>
      </div>
    </div>
  );
}
type BadgeTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BadgeText({ text, additionalClassNames = "" }: BadgeTextProps) {
  return (
    <div className={clsx("bg-[#ec2227] h-[18px] relative rounded-[6.8px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#fafafa] text-[12px] text-nowrap">{text}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}
type PrimitiveButtonTextProps = {
  text: string;
  additionalClassNames?: string;
};

function PrimitiveButtonText({ text, additionalClassNames = "" }: PrimitiveButtonTextProps) {
  return <Wrapper1 additionalClassNames={clsx("absolute content-stretch flex h-[29px] items-center justify-center px-[9px] py-[5px] rounded-[16.4px] top-[3.5px] w-[221.828px]", additionalClassNames)}>{text}</Wrapper1>;
}

export default function Card() {
  return (
    <div className="bg-white border border-[#e5e5e5] border-solid relative rounded-[16px] size-full" data-name="Card">
      <div className="absolute h-[44px] left-[24px] top-[24px] w-[893px]" data-name="HomePage">
        <div className="absolute bg-gradient-to-b content-stretch flex from-[#7b282d] items-center justify-center left-0 rounded-[10px] size-[36px] to-[#971b1e] top-[4px]" data-name="Container">
          <Icon>
            <path d={svgPaths.p2ef1ad00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            <path d={svgPaths.p2fc80880} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            <path d="M5.33333 4V9.33333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </Icon>
        </div>
        <div className="absolute content-stretch flex h-[28px] items-start left-[48px] top-[8px] w-[171.797px]" data-name="Heading 4">
          <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#1d293d] text-[20px] text-nowrap">Corporate Updates</p>
        </div>
      </div>
      <div className="absolute h-[336px] left-[24px] top-[80px] w-[893px]" data-name="Primitive.div">
        <div className="absolute bg-[#f5f5f5] h-[36px] left-0 rounded-[16.4px] top-0 w-[893.328px]" data-name="Tab List">
          <PrimitiveButtonText text="Announcements" additionalClassNames="left-[3px]" />
          <Wrapper additionalClassNames="left-[224.83px] w-[221.828px]">{`Media & News`}</Wrapper>
          <PrimitiveButtonText text="Policy Updates" additionalClassNames="left-[446.66px]" />
          <Wrapper additionalClassNames="bg-white left-[668.48px] w-[221.844px]">{`Laws & Legislation`}</Wrapper>
        </div>
        <div className="absolute h-[253px] left-0 overflow-clip top-[83px] w-[893px]" data-name="HomePage">
          <div className="absolute bg-white content-stretch flex flex-col h-[33px] items-start left-0 pb-px pt-[11px] px-[11px] rounded-[10px] top-[-125px] w-[893px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="content-stretch flex h-[98.594px] items-start justify-between relative shrink-0 w-full" data-name="Container">
              <Container>
                <div className="content-stretch flex gap-[8px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
                  <BadgeText text="Policy" additionalClassNames="w-[44.469px]" />
                  <TextText text="2025-11-26" />
                </div>
                <HeadingText text="New Audit Standards Released" />
                <ParagraphText text="Updated international audit standards have been published and are now available in the knowledge hub." />
              </Container>
              <Icon>
                <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </Icon>
            </div>
          </div>
          <div className="absolute bg-white border border-[#e5e7eb] border-solid h-[100px] left-0 rounded-[10px] top-[4px] w-[877px]" data-name="Container">
            <div className="absolute content-stretch flex h-[99px] items-start justify-between left-[10px] top-[10px] w-[804px]" data-name="Container">
              <div className="basis-0 grow h-[98.594px] min-h-px min-w-px relative shrink-0" data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                  <div className="absolute content-stretch flex gap-[8px] h-[18px] items-center left-0 top-0 w-[839px]" data-name="Container">
                    <BadgeText text="HR" additionalClassNames="w-[29.703px]" />
                    <TextText text="2025-11-25" />
                  </div>
                  <div className="absolute h-[27px] left-0 top-[22px] w-[839px]" data-name="Heading 5">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[#0a0a0a] text-[18px] text-nowrap top-[-2px]">Remote Work Policy Update</p>
                  </div>
                  <div className="absolute h-[25.594px] left-0 overflow-clip top-[53px] w-[839px]" data-name="Paragraph">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-1px]">The updated remote work policy is now effective. Please review the new guidelines.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-white content-stretch flex flex-col h-[109px] items-start left-0 pb-px pt-[11px] px-[11px] rounded-[10px] top-[113.59px] w-[877px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="content-stretch flex h-[98.594px] items-start justify-between relative shrink-0 w-full" data-name="Container">
              <Container>
                <div className="content-stretch flex gap-[8px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
                  <BadgeText text="Technology" additionalClassNames="w-[74.359px]" />
                  <TextText text="2025-11-24" />
                </div>
                <HeadingText text="Digital Transformation Initiative Launch" />
                <ParagraphText text="We are excited to announce the launch of our digital transformation program." />
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}