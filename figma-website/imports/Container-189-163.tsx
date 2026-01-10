import imgImage from "figma:asset/33fb6ee80221be4862d153ff6087a71ce90ad51a.png";

export default function Container() {
  return (
    <div className="overflow-clip relative rounded-[16.4px] size-full" data-name="Container">
      <div className="absolute h-[305px] left-0 top-0 w-[1423px]" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[209.81%] left-0 max-w-none top-[-60.79%] w-full" src={imgImage} />
        </div>
      </div>
      <div className="absolute bg-[rgba(113,70,73,0.2)] h-[305px] left-0 top-0 w-[1423px]" data-name="Container" />
      <div className="absolute bg-[rgba(81,58,64,0.8)] content-stretch flex flex-col h-[187px] items-start left-[212px] pb-0 pt-[20px] px-[20px] rounded-[10px] top-[68px] w-[957px]" data-name="Container">
        <div className="content-stretch flex flex-col gap-[22px] h-[117.188px] items-start relative shrink-0 w-full" data-name="Container">
          <div className="h-[28px] relative shrink-0 w-[787px]" data-name="Heading 4">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
              <p className="basis-0 capitalize font-['Arial:Bold',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[24px] text-white">Financial Audit Authority intranet welcomes you</p>
            </div>
          </div>
          <div className="h-[51.188px] relative shrink-0 w-[784px]" data-name="Paragraph">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
              <p className="absolute capitalize font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[18px] text-white top-[-1px] w-[844.827px]">Welcome to the Financial Audit Authority intranet, your central hub for resources, updates, and tools to support our mission of ensuring financial integrity and accountability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}