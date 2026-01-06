import imgImageWithFallback from "figma:asset/cb64f9a87ac606d9926884eed9a827a7172105de.png";
import imgImageWithFallback1 from "figma:asset/95993900bf37692651b8569a31368a3269db15e2.png";
import imgImageWithFallback2 from "figma:asset/7de74e447ed1e5b77f01506bfd62f7dabad9ae03.png";
import imgImageWithFallback3 from "figma:asset/33f312785d773855d5dfb38d16c5cfaeeaf99931.png";

export default function HomePage() {
  return (
    <div className="relative size-full" data-name="HomePage">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pl-0 pr-[12px] py-0 relative size-full">
          <div className="bg-gradient-to-b content-stretch flex flex-col from-[#cceaf2] h-[204px] items-start overflow-clip relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 to-[#8cd4e4] w-full" data-name="Container">
            <div className="h-[225.922px] relative shrink-0 w-full" data-name="ImageWithFallback">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
            </div>
          </div>
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
            <div className="bg-gradient-to-b content-stretch flex flex-col from-[#cceaf2] h-[118px] items-start overflow-clip relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 to-[#8cd4e4] w-[128px]" data-name="Container">
              <div className="h-[225.922px] relative shrink-0 w-full" data-name="ImageWithFallback">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
              </div>
            </div>
            <div className="bg-gradient-to-b content-stretch flex flex-col from-[#cceaf2] h-[118px] items-start overflow-clip relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 to-[#8cd4e4] w-[128px]" data-name="Container">
              <div className="h-[225.922px] relative shrink-0 w-full" data-name="ImageWithFallback">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback2} />
              </div>
            </div>
            <div className="bg-gradient-to-b content-stretch flex flex-col from-[#cceaf2] h-[118px] items-start overflow-clip relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 to-[#8cd4e4] w-[129px]" data-name="Container">
              <div className="h-[225.922px] relative shrink-0 w-full" data-name="ImageWithFallback">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}