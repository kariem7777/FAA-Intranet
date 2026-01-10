import svgPaths from "./svg-wu2lh6w4gb";
import clsx from "clsx";
import imgImageWithFallback from "figma:asset/acec061ade8f155cbb8db34fe8dfffb8b27e2e58.png";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[12px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        {children}
      </svg>
    </div>
  );
}

function Container({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white h-[116px] relative rounded-[10px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">{children}</div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}

function ImageWithFallbackImage() {
  return (
    <div className="h-[80px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Icon1() {
  return (
    <Wrapper>
      <g id="Icon">
        <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" />
        <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Wrapper>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("bg-clip-padding border-0 border-[transparent] border-solid relative size-full", additionalClassNames)}>
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#4b5563] text-[10px] text-nowrap top-[-0.4px]">{text}</p>
    </div>
  );
}
type TextTextProps = {
  text: string;
};

function TextText({ text }: TextTextProps) {
  return (
    <div className="h-[16px] relative shrink-0 w-[90.613px]">
      <Text text={text} />
    </div>
  );
}

function Icon() {
  return (
    <Wrapper>
      <g clipPath="url(#clip0_191_3252)" id="Icon">
        <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_191_3252">
          <rect fill="white" height="12" width="12" />
        </clipPath>
      </defs>
    </Wrapper>
  );
}
type BadgeTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BadgeText({ text, additionalClassNames = "" }: BadgeTextProps) {
  return (
    <div className={clsx("h-[17.6px] relative rounded-[6.8px] shrink-0", additionalClassNames)}>
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[8.8px] not-italic text-[#fafafa] text-[10px] text-nowrap top-[0.4px]">{text}</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}
type ButtonText1Props = {
  text: string;
  additionalClassNames?: string;
};

function ButtonText1({ text, additionalClassNames = "" }: ButtonText1Props) {
  return (
    <div className={clsx("absolute bg-[rgba(77,55,57,0.1)] content-stretch flex items-center justify-center pb-px pt-0 px-0 rounded-[4px] size-[37.487px] top-[140.46px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#80252a] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[10px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type ButtonTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonText({ text, additionalClassNames = "" }: ButtonTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex items-center justify-center rounded-[4px]", additionalClassNames)}>
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[10px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type ContainerTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ContainerText({ text, additionalClassNames = "" }: ContainerTextProps) {
  return (
    <div className={clsx("absolute h-[20px] top-0 w-[37.487px]", additionalClassNames)}>
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[19.61px] not-italic text-[#6b7280] text-[10px] text-center text-nowrap top-[-0.4px] translate-x-[-50%]">{text}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative size-full" data-name="HomePage">
      <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[12px] h-[322.513px] items-start left-0 pb-[0.8px] pt-[12.8px] px-[12.8px] rounded-[10px] top-0 w-[300px]" data-name="Container">
        <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
          <div className="h-[28px] relative shrink-0 w-[156.925px]" data-name="Heading 4">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
              <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[20px] text-black text-nowrap top-[-2.2px]">NOVEMBER 2025</p>
            </div>
          </div>
          <div className="h-[24px] relative shrink-0 w-[52px]" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start relative size-full">
              <div className="bg-white relative rounded-[4px] shrink-0 size-[24px]" data-name="Button">
                <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.8px] relative size-full">
                  <Icon2>
                    <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </Icon2>
                </div>
              </div>
              <div className="basis-0 bg-white grow h-[24px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
                <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.8px] relative size-full">
                  <Icon2>
                    <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </Icon2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[256.913px] relative shrink-0 w-full" data-name="Container">
          <div className="absolute h-[20px] left-0 top-0 w-[37.475px]" data-name="Container">
            <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[19.58px] not-italic text-[#6b7280] text-[10px] text-center text-nowrap top-[-0.4px] translate-x-[-50%]">S</p>
          </div>
          <div className="absolute h-[20px] left-[39.48px] top-0 w-[37.487px]" data-name="Container">
            <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[18.75px] not-italic text-[#6b7280] text-[10px] text-center text-nowrap top-[-0.4px] translate-x-[-50%]">M</p>
          </div>
          <ContainerText text="T" additionalClassNames="left-[78.96px]" />
          <div className="absolute h-[20px] left-[118.45px] top-0 w-[37.487px]" data-name="Container">
            <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[19.06px] not-italic text-[#6b7280] text-[10px] text-center text-nowrap top-[-0.4px] translate-x-[-50%]">W</p>
          </div>
          <ContainerText text="T" additionalClassNames="left-[157.94px]" />
          <div className="absolute h-[20px] left-[197.43px] top-0 w-[37.487px]" data-name="Container">
            <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[18.8px] not-italic text-[#6b7280] text-[10px] text-center text-nowrap top-[-0.4px] translate-x-[-50%]">F</p>
          </div>
          <div className="absolute h-[20px] left-[236.91px] top-0 w-[37.487px]" data-name="Container">
            <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[19.59px] not-italic text-[#6b7280] text-[10px] text-center text-nowrap top-[-0.4px] translate-x-[-50%]">S</p>
          </div>
          <div className="absolute h-[37.487px] left-0 top-[22px] w-[37.475px]" data-name="Container" />
          <div className="absolute left-[39.48px] size-[37.487px] top-[22px]" data-name="Container" />
          <div className="absolute left-[78.96px] size-[37.487px] top-[22px]" data-name="Container" />
          <div className="absolute left-[118.45px] size-[37.487px] top-[22px]" data-name="Container" />
          <div className="absolute left-[157.94px] size-[37.487px] top-[22px]" data-name="Container" />
          <div className="absolute left-[197.43px] size-[37.487px] top-[22px]" data-name="Container" />
          <ButtonText text="1" additionalClassNames="left-[236.91px] size-[37.487px] top-[22px]" />
          <ButtonText text="2" additionalClassNames="left-0 size-[37.475px] top-[61.49px]" />
          <ButtonText text="3" additionalClassNames="left-[39.48px] size-[37.487px] top-[61.49px]" />
          <ButtonText text="4" additionalClassNames="left-[78.96px] size-[37.487px] top-[61.49px]" />
          <ButtonText text="5" additionalClassNames="left-[118.45px] size-[37.487px] top-[61.49px]" />
          <ButtonText text="6" additionalClassNames="left-[157.94px] size-[37.487px] top-[61.49px]" />
          <ButtonText text="7" additionalClassNames="left-[197.43px] size-[37.487px] top-[61.49px]" />
          <ButtonText text="8" additionalClassNames="left-[236.91px] size-[37.487px] top-[61.49px]" />
          <ButtonText text="9" additionalClassNames="left-0 size-[37.475px] top-[100.98px]" />
          <ButtonText text="10" additionalClassNames="left-[39.48px] size-[37.487px] top-[100.98px]" />
          <ButtonText text="11" additionalClassNames="left-[78.96px] size-[37.487px] top-[100.98px]" />
          <ButtonText text="12" additionalClassNames="left-[118.45px] size-[37.487px] top-[100.98px]" />
          <ButtonText text="13" additionalClassNames="left-[157.94px] size-[37.487px] top-[100.98px]" />
          <ButtonText text="14" additionalClassNames="left-[197.43px] size-[37.487px] top-[100.98px]" />
          <ButtonText text="15" additionalClassNames="left-[236.91px] size-[37.487px] top-[100.98px]" />
          <ButtonText text="16" additionalClassNames="left-0 size-[37.475px] top-[140.46px]" />
          <ButtonText1 text="17" additionalClassNames="left-[39.48px]" />
          <ButtonText1 text="18" additionalClassNames="left-[78.96px]" />
          <ButtonText1 text="19" additionalClassNames="left-[118.45px]" />
          <ButtonText text="20" additionalClassNames="left-[157.94px] size-[37.487px] top-[140.46px]" />
          <ButtonText text="21" additionalClassNames="left-[197.43px] size-[37.487px] top-[140.46px]" />
          <ButtonText text="22" additionalClassNames="left-[236.91px] size-[37.487px] top-[140.46px]" />
          <ButtonText text="23" additionalClassNames="left-0 size-[37.475px] top-[179.95px]" />
          <ButtonText text="24" additionalClassNames="left-[39.48px] size-[37.487px] top-[179.95px]" />
          <ButtonText text="25" additionalClassNames="left-[78.96px] size-[37.487px] top-[179.95px]" />
          <ButtonText text="26" additionalClassNames="left-[118.45px] size-[37.487px] top-[179.95px]" />
          <ButtonText text="27" additionalClassNames="left-[157.94px] size-[37.487px] top-[179.95px]" />
          <ButtonText text="28" additionalClassNames="left-[197.43px] size-[37.487px] top-[179.95px]" />
          <div className="absolute bg-[#ec2227] content-stretch flex items-center justify-center left-[236.91px] rounded-[4px] size-[37.487px] top-[179.95px]" data-name="Button">
            <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[10px] text-center text-nowrap text-white">29</p>
          </div>
          <ButtonText text="30" additionalClassNames="left-0 size-[37.475px] top-[219.44px]" />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] h-[289px] items-start left-[312px] overflow-clip top-0 w-[569px]" data-name="Container">
        <Container>
          <div className="h-[115px] relative shrink-0 w-full" data-name="Container">
            <div className="absolute content-stretch flex flex-col gap-px items-start left-[98px] top-[10px] w-[459px]">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-black text-nowrap">Annual Audit Planning Meeting</p>
                <BadgeText text="Internal" additionalClassNames="bg-[#ec2227] w-[51.188px]" />
              </div>
              <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[14px] text-black w-full">Join us for the annual audit planning meeting to align on objectives.</p>
              <div className="content-stretch flex gap-[4px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
                <Icon />
                <TextText text="10:00 am - 12:00 pm" />
              </div>
              <div className="content-stretch flex gap-[4px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
                <Icon1 />
                <div className="h-[16px] relative shrink-0 w-[103.938px]" data-name="Text">
                  <Text text="Main Conference Room" additionalClassNames="overflow-clip rounded-[inherit]" />
                </div>
              </div>
            </div>
            <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#cceaf2] items-start left-[10px] overflow-clip rounded-[10px] size-[80px] to-[#8cd4e4] top-[13px]" data-name="Container">
              <ImageWithFallbackImage />
            </div>
          </div>
        </Container>
        {[...Array(2).keys()].map((_, i) => (
          <Container>
            <div className="h-[115px] relative shrink-0 w-full" data-name="Container">
              <div className="absolute content-stretch flex flex-col gap-px items-start left-[98px] top-[10px] w-[459px]">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                  <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-black text-nowrap">Risk Management Workshop</p>
                  <BadgeText text="Training" additionalClassNames="bg-[#8cd4e4] w-[52.588px]" />
                </div>
                <p className="font-['Arial:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[14px] text-black w-full">{`Enhance your skills in identifying, assessing, and mitigating risks. `}</p>
                <div className="content-stretch flex gap-[4px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
                  <Icon />
                  <TextText text="2:00 pm - 5:00 pm" />
                </div>
                <div className="content-stretch flex gap-[4px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
                  <Icon1 />
                  <div className="h-[16px] relative shrink-0 w-[111px]" data-name="Text">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#4b5563] text-[10px] top-0 w-[115px]">Training Center, Level 3</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#cceaf2] items-start left-[10px] overflow-clip rounded-[10px] size-[80px] to-[#8cd4e4] top-[13px]" data-name="Container">
                <ImageWithFallbackImage />
              </div>
            </div>
          </Container>
        ))}
      </div>
    </div>
  );
}