import clsx from "clsx";
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("h-[16px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">{children}</div>
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
type TextBackgroundImageAndTextProps = {
  text: string;
};

function TextBackgroundImageAndText({ text }: TextBackgroundImageAndTextProps) {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap">{text}</p>
      </div>
    </div>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText({ text, additionalClassNames = "" }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex items-center justify-center rounded-[6.8px]", additionalClassNames)}>
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type ContainerBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ContainerBackgroundImageAndText({ text, additionalClassNames = "" }: ContainerBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex h-[20px] items-start pb-[4px] pt-0 px-0 top-0", additionalClassNames)}>
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center">{text}</p>
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative rounded-[10px] size-full" data-name="Container" style={{ backgroundImage: "linear-gradient(130.575deg, rgba(204, 234, 242, 0.2) 0%, rgb(255, 255, 255) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start pb-px pt-[13px] px-[13px] relative size-full">
          <div className="h-[35px] relative shrink-0 w-full" data-name="Container">
            <div className="absolute h-[27px] left-0 top-0 w-[136.984px]" data-name="Heading 5">
              <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[#0a0a0a] text-[18px] text-nowrap top-[-2px]">NOVEMBER 2025</p>
            </div>
            <div className="absolute content-stretch flex gap-[4px] h-[28px] items-start left-[264.13px] top-[3.5px] w-[60px]" data-name="Container">
              <div className="bg-white relative rounded-[6.8px] shrink-0 size-[28px]" data-name="Button">
                <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
                  <IconBackgroundImage>
                    <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </IconBackgroundImage>
                </div>
              </div>
              <div className="basis-0 bg-white grow h-[28px] min-h-px min-w-px relative rounded-[6.8px] shrink-0" data-name="Button">
                <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
                  <IconBackgroundImage>
                    <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </IconBackgroundImage>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white h-[307.859px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="size-full">
              <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[9px] px-[9px] relative size-full">
                <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
                  <ContainerBackgroundImageAndText text="S" additionalClassNames="left-0 w-[40.297px]" />
                  <ContainerBackgroundImageAndText text="M" additionalClassNames="left-[44.3px] w-[40.297px]" />
                  <ContainerBackgroundImageAndText text="T" additionalClassNames="left-[88.59px] w-[40.313px]" />
                  <ContainerBackgroundImageAndText text="W" additionalClassNames="left-[132.91px] w-[40.297px]" />
                  <ContainerBackgroundImageAndText text="T" additionalClassNames="left-[177.2px] w-[40.313px]" />
                  <ContainerBackgroundImageAndText text="F" additionalClassNames="left-[221.52px] w-[40.297px]" />
                  <ContainerBackgroundImageAndText text="S" additionalClassNames="left-[265.81px] w-[40.297px]" />
                </div>
                <div className="h-[261.859px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute left-0 size-[40.297px] top-0" data-name="Container" />
                  <div className="absolute left-[44.3px] size-[40.297px] top-0" data-name="Container" />
                  <div className="absolute left-[88.59px] size-[40.313px] top-0" data-name="Container" />
                  <div className="absolute left-[132.91px] size-[40.297px] top-0" data-name="Container" />
                  <div className="absolute left-[177.2px] size-[40.313px] top-0" data-name="Container" />
                  <div className="absolute left-[221.52px] size-[40.297px] top-0" data-name="Container" />
                  <ButtonBackgroundImageAndText text="1" additionalClassNames="left-[265.81px] size-[40.297px] top-0" />
                  <ButtonBackgroundImageAndText text="2" additionalClassNames="left-0 size-[40.297px] top-[44.31px]" />
                  <ButtonBackgroundImageAndText text="3" additionalClassNames="left-[44.3px] size-[40.297px] top-[44.31px]" />
                  <ButtonBackgroundImageAndText text="4" additionalClassNames="left-[88.59px] size-[40.313px] top-[44.31px]" />
                  <ButtonBackgroundImageAndText text="5" additionalClassNames="left-[132.91px] size-[40.297px] top-[44.31px]" />
                  <ButtonBackgroundImageAndText text="6" additionalClassNames="left-[177.2px] size-[40.313px] top-[44.31px]" />
                  <ButtonBackgroundImageAndText text="7" additionalClassNames="left-[221.52px] size-[40.297px] top-[44.31px]" />
                  <ButtonBackgroundImageAndText text="8" additionalClassNames="left-[265.81px] size-[40.297px] top-[44.31px]" />
                  <ButtonBackgroundImageAndText text="9" additionalClassNames="left-0 size-[40.297px] top-[88.63px]" />
                  <ButtonBackgroundImageAndText text="10" additionalClassNames="left-[44.3px] size-[40.297px] top-[88.63px]" />
                  <ButtonBackgroundImageAndText text="11" additionalClassNames="left-[88.59px] size-[40.313px] top-[88.63px]" />
                  <ButtonBackgroundImageAndText text="12" additionalClassNames="left-[132.91px] size-[40.297px] top-[88.63px]" />
                  <ButtonBackgroundImageAndText text="13" additionalClassNames="left-[177.2px] size-[40.313px] top-[88.63px]" />
                  <ButtonBackgroundImageAndText text="14" additionalClassNames="left-[221.52px] size-[40.297px] top-[88.63px]" />
                  <ButtonBackgroundImageAndText text="15" additionalClassNames="left-[265.81px] size-[40.297px] top-[88.63px]" />
                  <ButtonBackgroundImageAndText text="16" additionalClassNames="left-0 size-[40.297px] top-[132.94px]" />
                  <ButtonBackgroundImageAndText text="17" additionalClassNames="left-[44.3px] size-[40.297px] top-[132.94px]" />
                  <ButtonBackgroundImageAndText text="18" additionalClassNames="left-[88.59px] size-[40.313px] top-[132.94px]" />
                  <ButtonBackgroundImageAndText text="19" additionalClassNames="left-[132.91px] size-[40.297px] top-[132.94px]" />
                  <ButtonBackgroundImageAndText text="20" additionalClassNames="left-[177.2px] size-[40.313px] top-[132.94px]" />
                  <ButtonBackgroundImageAndText text="21" additionalClassNames="left-[221.52px] size-[40.297px] top-[132.94px]" />
                  <ButtonBackgroundImageAndText text="22" additionalClassNames="left-[265.81px] size-[40.297px] top-[132.94px]" />
                  <ButtonBackgroundImageAndText text="23" additionalClassNames="left-0 size-[40.297px] top-[177.25px]" />
                  <ButtonBackgroundImageAndText text="24" additionalClassNames="left-[44.3px] size-[40.297px] top-[177.25px]" />
                  <ButtonBackgroundImageAndText text="25" additionalClassNames="left-[88.59px] size-[40.313px] top-[177.25px]" />
                  <ButtonBackgroundImageAndText text="26" additionalClassNames="left-[132.91px] size-[40.297px] top-[177.25px]" />
                  <ButtonBackgroundImageAndText text="27" additionalClassNames="left-[177.2px] size-[40.313px] top-[177.25px]" />
                  <ButtonBackgroundImageAndText text="28" additionalClassNames="left-[221.52px] size-[40.297px] top-[177.25px]" />
                  <div className="absolute bg-[#7b282d] content-stretch flex items-center justify-center left-[264.81px] rounded-[6.8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[42.312px] top-[176.24px]" data-name="Button">
                    <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white">29</p>
                  </div>
                  <div className="absolute bg-[#dbeafe] left-0 rounded-[6.8px] size-[40.297px] top-[221.56px]" data-name="Button">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[19.67px] not-italic text-[#1c398e] text-[12px] text-center text-nowrap top-[11.14px] translate-x-[-50%]">30</p>
                    <div className="absolute bg-[#7b282d] left-[18.14px] rounded-[3.35544e+07px] size-[4px] top-[34.3px]" data-name="Text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[12px] items-center justify-center pl-0 pr-[0.016px] py-0 relative size-full">
                <ContainerBackgroundImage additionalClassNames="w-[47.125px]">
                  <div className="bg-[#8cd4e4] rounded-[4px] shrink-0 size-[12px]" data-name="Container" />
                  <TextBackgroundImageAndText text="Today" />
                </ContainerBackgroundImage>
                <ContainerBackgroundImage additionalClassNames="w-[73.047px]">
                  <div className="bg-[#dbeafe] relative rounded-[4px] shrink-0 size-[12px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                  <TextBackgroundImageAndText text="Has Events" />
                </ContainerBackgroundImage>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}