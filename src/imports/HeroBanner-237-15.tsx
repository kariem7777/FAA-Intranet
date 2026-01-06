import imgImage14 from "figma:asset/14a7bedb16f5751eddf0fc794da9e33a1599152b.png";

export default function HeroBanner() {
  return (
    <div className="overflow-clip relative rounded-[16.4px] size-full" data-name="HeroBanner">
      <div className="absolute content-stretch flex flex-col h-[280px] items-start left-0 overflow-clip pb-0 pt-[-151.969px] px-0 top-0 w-[1335px]" data-name="Container">
        <div className="aspect-[1335/478] relative shrink-0 w-full" data-name="image 14">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[69.53%] left-[0.04%] max-w-none top-[30.49%] w-full" src={imgImage14} />
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex h-[272px] items-start justify-center left-0 pb-0 pt-[40px] px-0 top-[8px] w-[1335px]" data-name="Container">
        <div className="bg-[rgba(81,58,64,0.72)] h-[154.781px] relative rounded-[10px] shrink-0 w-[911px]" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pl-[20px] pr-0 pt-[20px] relative size-full">
            <div className="h-[134.781px] relative shrink-0 w-[871px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[22px] items-start relative size-full">
                <div className="h-[41.594px] relative shrink-0 w-[871px]" data-name="Heading 2">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                    <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[41.6px] left-0 not-italic text-[32px] text-nowrap text-white top-0">Financial Audit Authority Intranet Welcomes You</p>
                  </div>
                </div>
                <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[871px]" data-name="Paragraph">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                    <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.6px] left-0 not-italic text-[16px] text-white top-[-2px] w-[870px]">Welcome to the Financial Audit Authority Intranet, your central hub for resources, updates, and tools to support our mission of ensuring financial integrity and accountability.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}