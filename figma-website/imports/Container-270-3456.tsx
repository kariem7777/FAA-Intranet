import imgImage from "figma:asset/33fb6ee80221be4862d153ff6087a71ce90ad51a.png";

export default function Container() {
  return (
    <div className="bg-[#7b282d] relative size-full" data-name="Container">
      <div className="absolute h-[200px] left-0 opacity-10 top-0 w-[1495px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] h-[107.188px] items-start left-[88px] top-[24px] w-[768px]" data-name="Container">
        <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 1">
          <p className="absolute font-['Arial:Regular',sans-serif] leading-[48px] left-0 not-italic text-[40px] text-nowrap text-white top-[-4px]">Legislations</p>
        </div>
        <div className="h-[51.188px] relative shrink-0 w-full" data-name="Paragraph">
          <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.9)] top-[-1px] w-[765px]">Browse through organized collections of legal documents, regulations, and official opinions. Each category is authenticated and regularly updated to ensure accuracy.</p>
        </div>
      </div>
    </div>
  );
}