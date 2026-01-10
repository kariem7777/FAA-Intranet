function HomePage() {
  return (
    <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full" data-name="HomePage">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[#1d293d] text-[20px]">Condolences</p>
    </div>
  );
}

function Container() {
  return <div className="absolute h-[233.781px] left-0 top-0 w-[408.344px]" data-name="Container" />;
}

function Button() {
  return (
    <div className="h-[7px] relative shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[0px] left-[3.5px] not-italic text-[0px] text-[rgba(0,0,0,0)] text-center top-[3.5px] translate-x-[-50%] w-0">1</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[174.67px] size-[7px] top-0" data-name="List Item">
      <Button />
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[7px] relative shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[0px] left-[3.5px] not-italic text-[0px] text-[rgba(0,0,0,0)] text-center top-[3.5px] translate-x-[-50%] w-0">2</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[187.67px] size-[7px] top-0" data-name="List Item">
      <Button1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[7px] relative shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[0px] left-[10px] not-italic text-[0px] text-[rgba(0,0,0,0)] text-center top-[3.5px] translate-x-[-50%] w-0">3</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[7px] items-start left-[200.67px] top-0 w-[20px]" data-name="List Item">
      <Button2 />
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[7px] relative shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[0px] left-[3.5px] not-italic text-[0px] text-[rgba(0,0,0,0)] text-center top-[3.5px] translate-x-[-50%] w-0">4</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[226.67px] size-[7px] top-0" data-name="List Item">
      <Button3 />
    </div>
  );
}

function List() {
  return (
    <div className="absolute h-[7px] left-0 top-[220.78px] w-[408.344px]" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

function Icon() {
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

function PrevArrow() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[-6px] p-px rounded-[3.35544e+07px] size-[28px] top-[117px]" data-name="PrevArrow">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
      <Icon />
    </div>
  );
}

function Icon1() {
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

function NextArrow() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[374.34px] p-px rounded-[3.35544e+07px] size-[28px] top-[117px]" data-name="NextArrow">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
      <Icon1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[25.594px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-1px] whitespace-pre">Ahmed Al Mansouri</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[25.594px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#6a7282] text-[16px] text-nowrap top-[-1px] whitespace-pre">Loss of his father</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative w-full">
        <Paragraph />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[12px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
    </div>
  );
}

function HomePage1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[151px] items-start left-[6px] top-[0.88px] w-[402px]" data-name="HomePage">
      <Container2 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[51.188px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Italic',sans-serif] italic leading-[25.6px] left-[200.83px] text-[#4a5565] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[402px]">Our thoughts and prayers are with our colleagues during this difficult time</p>
    </div>
  );
}

function HomePage2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[35px] items-start left-[6px] pb-0 pt-[13px] px-0 top-[62px] w-[402px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Paragraph2 />
    </div>
  );
}

function N() {
  return (
    <div className="h-[233.781px] relative shrink-0 w-full" data-name="n16">
      <Container />
      <List />
      <PrevArrow />
      <NextArrow />
      <HomePage1 />
      <HomePage2 />
    </div>
  );
}

export default function Card() {
  return (
    <div className="bg-white relative rounded-[10px] size-full" data-name="Card">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start overflow-clip pb-px pt-[25px] px-[25px] relative size-full">
          <HomePage />
          <N />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}