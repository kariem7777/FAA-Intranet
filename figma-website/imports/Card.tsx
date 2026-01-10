import svgPaths from "./svg-jy8qp2vead";

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p35b3faa0} id="Vector_2" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #7B282D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[rgba(123,40,45,0.1)] content-stretch flex items-center justify-center left-0 rounded-[10px] size-[32px] top-[6.8px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex h-[33.594px] items-start left-[40px] top-0 w-[180.563px]" data-name="Heading 3">
      <p className="font-['Arial:Regular',sans-serif] leading-[33.6px] not-italic relative shrink-0 text-[24px] text-black text-nowrap whitespace-pre">People Spotlight</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[45.594px] relative shrink-0 w-[220.563px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[45.594px] relative w-[220.563px]">
        <Container />
        <Heading />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white relative rounded-[3.35544e+07px] shrink-0 size-[28px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-px relative size-[28px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 bg-white grow h-[28px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-center justify-center p-px relative w-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[28px] relative shrink-0 w-[60px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[28px] items-start relative w-[60px]">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="content-stretch flex h-[45.594px] items-center justify-between relative shrink-0 w-full" data-name="HomePage">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p38fdee00} id="Vector" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p24e2e2b0} id="Vector_2" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p71c6d40} id="Vector_3" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p13058e80} id="Vector_4" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Icon3 />
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center text-nowrap whitespace-pre">New Face</p>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 bg-[rgba(140,212,228,0.19)] grow h-[56px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[56px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap whitespace-pre">MA</p>
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="content-stretch flex items-start overflow-clip relative rounded-[3.35544e+07px] shrink-0 size-[56px]" data-name="Primitive.span">
      <Text />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[76.97px] not-italic text-[#4a5565] text-[14px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Junior Auditor</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-center left-[13px] top-[calc(50%-0.36px)] translate-y-[-50%] w-[154px]">
      <Container3 />
      <PrimitiveSpan />
      <p className="font-['Arial:Regular',sans-serif] leading-[28px] min-w-full not-italic relative shrink-0 text-[16px] text-black text-center w-[min-content]">Mohammed Ahmed</p>
      <Paragraph />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white h-[184px] relative rounded-[10px] shrink-0 w-[180px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[184px] relative w-[180px]">
        <Frame />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p38fdee00} id="Vector" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p24e2e2b0} id="Vector_2" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p71c6d40} id="Vector_3" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p13058e80} id="Vector_4" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Icon4 />
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center text-nowrap whitespace-pre">New Face</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 bg-[rgba(140,212,228,0.19)] grow h-[56px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[56px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap whitespace-pre">SA</p>
      </div>
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="content-stretch flex items-start overflow-clip relative rounded-[3.35544e+07px] shrink-0 size-[56px]" data-name="Primitive.span">
      <Text1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[77.53px] not-italic text-[#4a5565] text-[14px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Risk Analyst</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[151.594px] items-center left-[13px] top-[calc(50%-0.36px)] translate-y-[-50%] w-[154px]">
      <Container5 />
      <PrimitiveSpan1 />
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-black text-center w-full">Sara Abdullah</p>
      <Paragraph1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-white h-[184px] relative rounded-[10px] shrink-0 w-[180px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[184px] relative w-[180px]">
        <Frame1 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p38fdee00} id="Vector" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p24e2e2b0} id="Vector_2" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p71c6d40} id="Vector_3" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p13058e80} id="Vector_4" stroke="var(--stroke-0, #8CD4E4)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Icon5 />
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center text-nowrap whitespace-pre">New Face</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 bg-[rgba(140,212,228,0.19)] grow h-[56px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[56px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap whitespace-pre">AH</p>
      </div>
    </div>
  );
}

function PrimitiveSpan2() {
  return (
    <div className="content-stretch flex items-start overflow-clip relative rounded-[3.35544e+07px] shrink-0 size-[56px]" data-name="Primitive.span">
      <Text2 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[77.16px] not-italic text-[#4a5565] text-[14px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">IT Specialist</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[151.594px] items-center justify-center left-[13px] top-[calc(50%-0.36px)] translate-y-[-50%] w-[154px]">
      <Container7 />
      <PrimitiveSpan2 />
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-black text-center w-full">Ali Hassan</p>
      <Paragraph2 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white h-[184px] relative rounded-[10px] shrink-0 w-[180px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[184px] relative w-[180px]">
        <Frame2 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p13ef6900} id="Vector" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[4px] h-[16px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Icon6 />
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center text-nowrap whitespace-pre">Anniversary</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 bg-[rgba(236,34,39,0.19)] grow h-[56px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[56px] items-center justify-center relative w-full">
        <div className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-center text-neutral-950 text-nowrap whitespace-pre">
          <p className="mb-0">15</p>
          <p>Years</p>
        </div>
      </div>
    </div>
  );
}

function PrimitiveSpan3() {
  return (
    <div className="content-stretch flex items-start overflow-clip relative rounded-[3.35544e+07px] shrink-0 size-[56px]" data-name="Primitive.span">
      <Text3 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[25.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[77.05px] not-italic text-[#4a5565] text-[14px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Senior Director</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-center left-[13px] top-[16.84px] w-[154px]">
      <Container9 />
      <PrimitiveSpan3 />
      <p className="font-['Arial:Regular',sans-serif] leading-[28px] min-w-full not-italic relative shrink-0 text-[16px] text-black text-center w-[min-content]">Khalid Al Mansoori</p>
      <Paragraph3 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-white h-[184px] relative rounded-[10px] shrink-0 w-[180px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[184px] relative w-[180px]">
        <Frame3 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p13ef6900} id="Vector" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[51.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[51.344px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[26.5px] not-italic text-[#4a5565] text-[10px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Anniversary</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center justify-center left-[13px] top-[13px] w-[154px]" data-name="Container">
      <Icon7 />
      <Text4 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[56px] left-[13px] top-[101px] w-[154px]" data-name="Heading 4">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-[77.19px] not-italic text-[20px] text-black text-center top-[-3px] translate-x-[-50%] w-[111px]">Aisha Mohammed</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[25.594px] left-[13px] top-[167px] w-[154px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[77.73px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Audit Manager</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[25.594px] left-[13px] top-[208.59px] w-[154px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[77.03px] not-italic text-[#ec2227] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[58px]">10 Years</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 bg-[rgba(236,34,39,0.19)] grow h-[56px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[56px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap whitespace-pre">AM</p>
      </div>
    </div>
  );
}

function PrimitiveSpan4() {
  return (
    <div className="absolute content-stretch flex items-start left-[62px] overflow-clip rounded-[3.35544e+07px] size-[56px] top-[37px]" data-name="Primitive.span">
      <Text5 />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white h-[263.188px] relative rounded-[10px] shrink-0 w-[180px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[263.188px] relative w-[180px]">
        <Container11 />
        <Heading1 />
        <Paragraph4 />
        <Paragraph5 />
        <PrimitiveSpan4 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p13ef6900} id="Vector" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p5086800} id="Vector_2" stroke="var(--stroke-0, #EC2227)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[16px] relative shrink-0 w-[51.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[51.344px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[26.5px] not-italic text-[#4a5565] text-[10px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Anniversary</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center justify-center left-[13px] top-[13px] w-[154px]" data-name="Container">
      <Icon8 />
      <Text6 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start left-[13px] top-[101px] w-[154px]" data-name="Heading 4">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[20px] text-black text-center">Omar Rashid</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[25.594px] left-[13px] top-[139px] w-[154px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[77.42px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Senior Auditor</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[25.594px] left-[13px] top-[180.59px] w-[154px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[77.34px] not-italic text-[#ec2227] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[50px]">5 Years</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="basis-0 bg-[rgba(236,34,39,0.19)] grow h-[56px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[56px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap whitespace-pre">OR</p>
      </div>
    </div>
  );
}

function PrimitiveSpan5() {
  return (
    <div className="absolute content-stretch flex items-start left-[62px] overflow-clip rounded-[3.35544e+07px] size-[56px] top-[37px]" data-name="Primitive.span">
      <Text7 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-white h-[263.188px] relative rounded-[10px] shrink-0 w-[180px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[263.188px] relative w-[180px]">
        <Container13 />
        <Heading2 />
        <Paragraph6 />
        <Paragraph7 />
        <PrimitiveSpan5 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p309f1c00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[16px] relative shrink-0 w-[52.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[52.625px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[26px] not-italic text-[#4a5565] text-[10px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Condolence</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center justify-center left-[13px] top-[13px] w-[154px]" data-name="Container">
      <Icon9 />
      <Text8 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3f86cd40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-[#99a1af] content-stretch flex items-center justify-center left-[62px] rounded-[3.35544e+07px] size-[56px] top-[37px]" data-name="Container">
      <Icon10 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[56px] left-[13px] top-[101px] w-[154px]" data-name="Heading 4">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-[77.19px] not-italic text-[20px] text-black text-center top-[-3px] translate-x-[-50%] w-[90px]">Ahmed Al Mansouri</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[25.594px] left-[13px] top-[167px] w-[154px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[77.34px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Loss of his father</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-gray-50 h-[263.188px] relative rounded-[10px] shrink-0 w-[180px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[263.188px] relative w-[180px]">
        <Container15 />
        <Container16 />
        <Heading3 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p309f1c00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[16px] relative shrink-0 w-[52.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[52.625px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[26px] not-italic text-[#4a5565] text-[10px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Condolence</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center justify-center left-[13px] top-[13px] w-[154px]" data-name="Container">
      <Icon11 />
      <Text9 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3f86cd40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[#99a1af] content-stretch flex items-center justify-center left-[62px] rounded-[3.35544e+07px] size-[56px] top-[37px]" data-name="Container">
      <Icon12 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[56px] left-[13px] top-[101px] w-[154px]" data-name="Heading 4">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-[77.2px] not-italic text-[20px] text-black text-center top-[-3px] translate-x-[-50%] w-[85px]">Fatima Al Shamsi</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[25.594px] left-[13px] top-[167px] w-[154px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-[76.72px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">Loss of her mother</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-gray-50 h-[263.188px] relative rounded-[10px] shrink-0 w-[180px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[263.188px] relative w-[180px]">
        <Container18 />
        <Container19 />
        <Heading4 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function HomePage1() {
  return (
    <div className="content-stretch flex gap-[12px] h-[184px] items-start overflow-clip relative shrink-0 w-full" data-name="HomePage">
      <Container4 />
      <Container6 />
      <Container8 />
      <Container10 />
      <Container12 />
      <Container14 />
      <Container17 />
      <Container20 />
    </div>
  );
}

export default function Card() {
  return (
    <div className="bg-white relative rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-full" data-name="Card">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-0 pt-[24px] px-[24px] relative size-full">
          <HomePage />
          <HomePage1 />
        </div>
      </div>
    </div>
  );
}