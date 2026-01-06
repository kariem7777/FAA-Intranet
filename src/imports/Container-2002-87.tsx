import imgImageGovernmentOfDubai from "figma:asset/4e42cf3310aeed96ab254a52750afe49241e1641.png";
import imgImageFinancialAuditAuthority from "figma:asset/a5ddb65a14d35992c9db64b833b8ead7d6060dbb.png";

export default function Container() {
  return (
    <div className="bg-white relative size-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[80px] py-0 relative size-full">
          <div className="h-[62px] relative shrink-0 w-[154px]" data-name="Image (Government of Dubai)">
            <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageGovernmentOfDubai} />
          </div>
          <div className="h-[48px] relative shrink-0 w-[208.516px]" data-name="Image (Financial Audit Authority)">
            <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageFinancialAuditAuthority} />
          </div>
        </div>
      </div>
    </div>
  );
}