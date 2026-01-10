function Badge() {
  return (
    <div className="absolute bg-[#ec2227] border border-[rgba(0,0,0,0)] border-solid h-[23.594px] left-0 overflow-clip rounded-[6.8px] top-[3px] w-[69.766px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.6px] left-[8px] not-italic text-[11px] text-neutral-50 text-nowrap top-0 whitespace-pre">Innovation</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[54px] left-0 overflow-clip top-[32.59px] w-[400px]" data-name="Heading 5">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[#101828] text-[18px] top-[-2px] w-[390px]">{`Innovation Workshop: Building Tomorrow's Audit Solutions`}</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[51.188px] left-0 overflow-clip top-[94.59px] w-[400px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4a5565] text-[16px] top-[-1px] w-[400px]">Behind the scenes at our Innovation Workshop! Our teams are working on cutting-edge solutions to enhance audit efficiency and transparency. Collaborative sessions focused on developing next-generation audit tools...</p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[17.594px] relative shrink-0 w-[56.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[17.594px] relative w-[56.25px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.6px] left-0 not-italic text-[#6a7282] text-[11px] text-nowrap top-[-2px] whitespace-pre">2025-11-26</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[24px] relative rounded-[6.8px] shrink-0 w-[77.922px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#7b282d] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[24px] items-center justify-center px-[11px] py-px relative w-[77.922px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[17.6px] not-italic relative shrink-0 text-[#7b282d] text-[11px] text-center text-nowrap whitespace-pre">Know More</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex h-[24px] items-center justify-between left-0 top-[161.78px] w-[400px]" data-name="Container">
      <Text />
      <Button />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative size-full" data-name="HomePage">
      <Badge />
      <Heading />
      <Paragraph />
      <Container />
    </div>
  );
}