import svgPaths from "./svg-ckrnwm689x";
import clsx from "clsx";
import imgImageWithFallback from "figma:asset/a5ddb65a14d35992c9db64b833b8ead7d6060dbb.png";
import imgImage13 from "figma:asset/4e42cf3310aeed96ab254a52750afe49241e1641.png";
type ButtonProps = {
  additionalClassNames?: string;
};

function Button({ children, additionalClassNames = "" }: React.PropsWithChildren<ButtonProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">{children}</div>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("size-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}
type Icon1Props = {
  additionalClassNames?: string;
};

function Icon1({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon1Props>) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <g id="Icon">{children}</g>
    </Wrapper>
  );
}
type IconProps = {
  additionalClassNames?: string;
};

function Icon({ additionalClassNames = "" }: IconProps) {
  return (
    <div className={clsx("size-[12px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon" opacity="0">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

export default function Layout() {
  return (
    <div className="bg-white relative shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-full" data-name="Layout">
      <div className="absolute bg-white h-[80px] left-0 top-0 w-[1471px]" data-name="Container">
        <div className="absolute h-[48px] left-[1225px] top-[16px] w-[208.516px]" data-name="ImageWithFallback">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageWithFallback} />
        </div>
        <div className="absolute h-[62px] left-[11.64px] top-[9px] w-[154px]" data-name="image 13">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage13} />
        </div>
      </div>
      <div className="absolute bg-[#7b282d] h-[56px] left-0 top-[80px] w-[1471px]" data-name="Container">
        <div className="absolute content-stretch flex items-center justify-center left-[24px] rounded-[6.8px] size-[32px] top-[12px]" data-name="Button">
          <Icon1 additionalClassNames="relative shrink-0">
            <path d="M2.66667 8H13.3333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            <path d="M2.66667 12H13.3333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            <path d="M2.66667 4H13.3333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </Icon1>
        </div>
        <div className="absolute content-stretch flex gap-[24px] h-[22px] items-center left-[80px] top-[17px] w-[498px]" data-name="Navigation">
          <Button additionalClassNames="h-[22px] w-[46px]">
            <Wrapper1 additionalClassNames="h-[22.391px]">
              <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[19px] not-italic text-[14px] text-center text-nowrap text-white top-[-2px] translate-x-[-50%]">Home</p>
            </Wrapper1>
            <Icon additionalClassNames="relative shrink-0" />
          </Button>
          <div className="h-[22px] relative shrink-0 w-[144px]" data-name="Button">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
              <div className="absolute h-[22.391px] left-0 top-0 w-[139.5px]" data-name="Text">
                <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[70.5px] not-italic text-[14px] text-center text-nowrap text-white top-[-2px] translate-x-[-50%]">Organization Structure</p>
              </div>
              <Icon additionalClassNames="absolute left-[147.5px] top-[5.2px]" />
            </div>
          </div>
          <Button additionalClassNames="h-[22px] w-[81px]">
            <Wrapper1 additionalClassNames="h-[22.391px]">
              <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[37.5px] not-italic text-[14px] text-center text-nowrap text-white top-[-2px] translate-x-[-50%]">Automation</p>
            </Wrapper1>
            <Icon additionalClassNames="relative shrink-0" />
          </Button>
          <Button additionalClassNames="h-[22.391px] w-[146.766px]">
            <Wrapper1 additionalClassNames="h-[22.391px]">
              <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.4px] left-[63px] not-italic text-[14px] text-center text-nowrap text-white top-[-2px] translate-x-[-50%]">Approved Templates</p>
            </Wrapper1>
            <Icon additionalClassNames="relative shrink-0" />
          </Button>
        </div>
        <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid h-[30px] left-[1183px] rounded-[8px] top-[13px] w-[107px]" data-name="Button">
          <Wrapper additionalClassNames="absolute left-[9.1px] top-[6.2px]">
            <g clipPath="url(#clip0_189_87)" id="Icon">
              <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d={svgPaths.p14d10c00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d="M1.33333 8H14.6667" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </g>
            <defs>
              <clipPath id="clip0_189_87">
                <rect fill="white" height="16" width="16" />
              </clipPath>
            </defs>
          </Wrapper>
          <div className="absolute h-[20px] left-[25.1px] top-[4.2px] w-[38.588px]" data-name="Text">
            <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[23.84px] not-italic text-[12px] text-center text-nowrap text-white top-0 translate-x-[-50%]" dir="auto">
              العربية
            </p>
          </div>
          <div className="absolute bg-[#e5e7eb] h-[16px] left-[70.2px] top-[6.2px] w-px" data-name="Container" />
          <div className="absolute content-stretch flex h-[15.988px] items-start left-[79.2px] top-[6.2px] w-[14.925px]" data-name="Text">
            <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white">AR</p>
          </div>
        </div>
      </div>
      <div className="absolute h-[40px] left-[1294px] top-[88px] w-[149.766px]" data-name="Container">
        <div className="absolute content-stretch flex gap-[8px] h-[40px] items-center left-[48px] px-[12px] py-0 rounded-[4px] top-0 w-[101.766px]" data-name="Container">
          <div className="bg-[rgba(239,239,239,0.3)] relative rounded-[3.35544e+07px] shrink-0 size-[24px]" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
              <Icon1 additionalClassNames="relative shrink-0">
                <path d={svgPaths.p399eca00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d={svgPaths.pc93b400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </Icon1>
            </div>
          </div>
          <Wrapper1 additionalClassNames="h-[20.797px]">
            <p className="absolute font-['Arial:Regular',sans-serif] leading-[20.8px] left-0 not-italic text-[13px] text-nowrap text-white top-[-2px]">User</p>
          </Wrapper1>
          <div className="relative shrink-0 size-[12px]" data-name="Icon">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <g id="Icon">
                <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
        </div>
        <div className="absolute left-[8px] rounded-[6.8px] size-[36px] top-[4px]" data-name="Button">
          <Icon1 additionalClassNames="absolute left-[10px] top-[10px]">
            <path d={svgPaths.p388cb800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            <path d={svgPaths.p5baad20} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </Icon1>
          <div className="absolute bg-white left-[22px] rounded-[3.35544e+07px] size-[8px] top-[6px]" data-name="Layout" />
        </div>
      </div>
    </div>
  );
}