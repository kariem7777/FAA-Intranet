import svgPaths from "./svg-dsdbkct9qj";
import clsx from "clsx";

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex items-center justify-center p-[8.369px] relative shrink-0">
      <p className="font-['Arial:Regular',sans-serif] leading-[25.108px] not-italic relative shrink-0 text-[#5d7285] text-[14px] text-nowrap tracking-[0.14px]">{children}</p>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("size-[18px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        {children}
      </svg>
    </div>
  );
}

function Icon({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper additionalClassNames="relative shrink-0">
      <g id="Icon">{children}</g>
    </Wrapper>
  );
}
type NavLinkTextProps = {
  text: string;
};

function NavLinkText({ text }: NavLinkTextProps) {
  return <Wrapper1>{text}</Wrapper1>;
}

export default function SideNav() {
  return (
    <div className="bg-white relative shadow-[0px_3.574px_40.207px_0px_rgba(0,0,0,0.08)] size-full" data-name="Side Nav">
      <div className="absolute h-[687.538px] left-[25px] top-[33px] w-[243px]" data-name="Brand + Nav List">
        <div className="absolute h-[687.538px] left-0 top-0 w-[289.785px]" data-name="Nav List">
          <div className="absolute content-stretch flex items-center left-0 px-[8.369px] py-0 rounded-[4.185px] top-0 w-[289.785px]" data-name="Nav Item">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon + Nav Link">
              <div className="content-stretch flex items-center justify-center p-[8.369px] relative shrink-0" data-name="Leading Icon">
                <Icon>
                  <path d={svgPaths.pb56cd00} id="Vector" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.pdd08040} id="Vector_2" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </Icon>
              </div>
              <NavLinkText text="Home" />
            </div>
          </div>
          <div className="absolute content-stretch flex items-center left-0 px-[8.369px] py-0 rounded-[4.185px] top-[109px] w-[289.785px]" data-name="Nav Item">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon + Nav Link">
              <div className="content-stretch flex items-center justify-center p-[8.369px] relative shrink-0" data-name="Leading Icon">
                <Icon>
                  <path d={svgPaths.pd2eb480} id="Vector" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p4ac1c00} id="Vector_2" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p226d9800} id="Vector_3" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p19685c00} id="Vector_4" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </Icon>
              </div>
              <NavLinkText text="Organization" />
            </div>
          </div>
          <div className="absolute content-stretch flex items-center left-0 px-[8.369px] py-0 rounded-[4.185px] top-[166.8px] w-[289.785px]" data-name="Nav Item">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon + Nav Link">
              <div className="content-stretch flex items-center justify-center p-[8.369px] relative shrink-0" data-name="Leading Icon">
                <Icon>
                  <path d="M9 5.25V15.75" id="Vector" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p2044ea00} id="Vector_2" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </Icon>
              </div>
              <NavLinkText text="Knowledge Hub" />
            </div>
          </div>
          <div className="absolute content-stretch flex items-center left-0 px-[8.369px] py-0 rounded-[4.185px] top-[224.61px] w-[289.785px]" data-name="Nav Item">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon + Nav Link">
              <div className="content-stretch flex items-center justify-center p-[8.369px] relative shrink-0" data-name="Leading Icon">
                <Icon>
                  <path d={svgPaths.p3a382d00} id="Vector" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p678c080} id="Vector_2" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d="M7.5 6.75H6" id="Vector_3" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d="M12 9.75H6" id="Vector_4" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d="M12 12.75H6" id="Vector_5" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </Icon>
              </div>
              <NavLinkText text="Documents" />
            </div>
          </div>
          <div className="absolute content-stretch flex items-center left-0 px-[8.369px] py-0 rounded-[4.185px] top-[282.41px] w-[289.785px]" data-name="Nav Item">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon + Nav Link">
              <div className="content-stretch flex items-center justify-center p-[8.369px] relative shrink-0" data-name="Leading Icon">
                <Icon>
                  <path d={svgPaths.p329b1880} id="Vector" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </Icon>
              </div>
              <NavLinkText text="Feedback" />
            </div>
          </div>
          <div className="absolute content-stretch flex items-center left-0 px-[8.369px] py-0 rounded-[4.185px] top-[340.22px] w-[289.785px]" data-name="Nav Item">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon + Nav Link">
              <div className="content-stretch flex items-center justify-center p-[8.369px] relative shrink-0" data-name="Leading Icon">
                <Icon>
                  <path d={svgPaths.p2210e800} id="Vector" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p3bfcd100} id="Vector_2" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p34f2c000} id="Vector_3" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p96d600} id="Vector_4" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </Icon>
              </div>
              <NavLinkText text="Digital Signature" />
            </div>
          </div>
          <div className="absolute content-stretch flex items-center left-0 px-[8.369px] py-0 rounded-[4.185px] top-[398.02px] w-[289.785px]" data-name="Nav Item">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon + Nav Link">
              <div className="content-stretch flex items-center justify-center p-[8.369px] relative shrink-0" data-name="Leading Icon">
                <Icon>
                  <path d={svgPaths.p3c193bc0} id="Vector" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d="M13.5 12.75V6.75" id="Vector_2" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d="M9.75 12.75V3.75" id="Vector_3" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d="M6 12.75V10.5" id="Vector_4" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </Icon>
              </div>
              <Wrapper1>{`Analytics `}</Wrapper1>
            </div>
          </div>
          <div className="absolute content-stretch flex items-center left-0 px-[8.369px] py-0 rounded-[4.185px] top-[455.83px] w-[289.785px]" data-name="Nav Item">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon + Nav Link">
              <div className="content-stretch flex items-center justify-center p-[8.369px] relative shrink-0" data-name="Leading Icon">
                <Icon>
                  <path d={svgPaths.p1d69e00} id="Vector" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p1150d400} id="Vector_2" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d="M5.25 15.75H12.75" id="Vector_3" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d="M9 2.25V15.75" id="Vector_4" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.pc9a7e80} id="Vector_5" stroke="var(--stroke-0, #493439)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </Icon>
              </div>
              <NavLinkText text="Legislation" />
            </div>
          </div>
          <div className="absolute contents left-[-12px] top-[53.37px]">
            <div className="absolute bg-[#f0f0f0] h-[45px] left-[-12px] rounded-[4.185px] top-[53.37px] w-[256px]" data-name="Nav Item">
              <div className="absolute content-stretch flex h-[17px] items-center justify-center left-[52px] p-[8.369px] top-[14px]" data-name="Nav Link">
                <p className="font-['Arial:Bold',sans-serif] leading-[25.108px] not-italic relative shrink-0 text-[#80252a] text-[14px] text-nowrap tracking-[0.14px]">About FAA</p>
              </div>
            </div>
            <Wrapper additionalClassNames="absolute left-[18.99px] top-[65.87px]">
              <g clipPath="url(#clip0_209_364)" id="Icon">
                <path d={svgPaths.p3cb50b00} id="Vector" stroke="var(--stroke-0, #80252A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d={svgPaths.p3f23a000} id="Vector_2" stroke="var(--stroke-0, #80252A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d={svgPaths.p1f67c900} id="Vector_3" stroke="var(--stroke-0, #80252A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M7.5 4.5H10.5" id="Vector_4" stroke="var(--stroke-0, #80252A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M7.5 7.5H10.5" id="Vector_5" stroke="var(--stroke-0, #80252A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M7.5 10.5H10.5" id="Vector_6" stroke="var(--stroke-0, #80252A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M7.5 13.5H10.5" id="Vector_7" stroke="var(--stroke-0, #80252A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </g>
              <defs>
                <clipPath id="clip0_209_364">
                  <rect fill="white" height="18" width="18" />
                </clipPath>
              </defs>
            </Wrapper>
          </div>
        </div>
      </div>
    </div>
  );
}