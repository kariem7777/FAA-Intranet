import svgPaths from "./svg-z20qwemupq";
import clsx from "clsx";

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute h-[27px] left-[25px] top-[85px]">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[27px] left-0 not-italic text-[#0a0a0a] text-[18px] text-nowrap top-[-2px]">{children}</p>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type DocumentsPageText2Props = {
  text: string;
};

function DocumentsPageText2({ text }: DocumentsPageText2Props) {
  return (
    <div className="absolute h-[25.594px] left-[25px] top-[116px] w-[384.328px]">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4b5563] text-[16px] top-[-1px] w-[101px]">{text}</p>
    </div>
  );
}

function Icon1() {
  return (
    <Wrapper>
      <path d="M12 7V21" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p38e00000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </Wrapper>
  );
}
type DocumentsPageText1Props = {
  text: string;
  additionalClassNames?: string;
};

function DocumentsPageText1({ text, additionalClassNames = "" }: DocumentsPageText1Props) {
  return (
    <div className={clsx("absolute h-[25.594px] left-[25px] top-[116px]", additionalClassNames)}>
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[25.6px] left-0 not-italic text-[#4b5563] text-[16px] text-nowrap top-[-1px]">{text}</p>
    </div>
  );
}
type DocumentsPageTextProps = {
  text: string;
  additionalClassNames?: string;
};

function DocumentsPageText({ text, additionalClassNames = "" }: DocumentsPageTextProps) {
  return <Wrapper1 additionalClassNames={additionalClassNames}>{text}</Wrapper1>;
}

function Icon() {
  return (
    <Wrapper>
      <path d={svgPaths.pb47f400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p17a13100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M10 9H8" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M16 13H8" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M16 17H8" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </Wrapper>
  );
}

export default function Container() {
  return (
    <div className="relative size-full" data-name="Container">
      <div className="absolute h-[41.594px] left-0 top-0 w-[314.5px]" data-name="Heading 2">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[41.6px] left-0 not-italic text-[#1a1a1a] text-[32px] text-nowrap top-[-3px]">Document Categories</p>
      </div>
      <div className="absolute h-[531.781px] left-0 top-[65.59px] w-[1335px]" data-name="Container">
        <div className="absolute content-start flex flex-wrap gap-[16px] items-start left-0 top-[-0.19px] w-[1335px]">
          <div className="basis-0 bg-white grow h-[166.594px] min-h-px min-w-px relative rounded-[16.4px] shrink-0" data-name="Card">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <div className="absolute bg-[#7b282d] content-stretch flex items-center justify-center left-[25px] rounded-[10px] size-[48px] top-[25px]" data-name="DocumentsPage">
              <Icon />
            </div>
            <DocumentsPageText text="All Documents" additionalClassNames="w-[384.328px]" />
            <DocumentsPageText1 text="1345 documents" additionalClassNames="w-[384.328px]" />
          </div>
          <div className="basis-0 bg-white grow h-[166.594px] min-h-px min-w-px relative rounded-[16.4px] shrink-0" data-name="Card">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <div className="absolute bg-[#971b1e] content-stretch flex items-center justify-center left-[25px] rounded-[10px] size-[48px] top-[25px]" data-name="DocumentsPage">
              <Wrapper>
                <path d={svgPaths.pe2b6600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p59aa3b2} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M7 21H17" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M12 3V21" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p6dc2e80} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </Wrapper>
            </div>
            <Wrapper1 additionalClassNames="w-[384.328px]">{`Laws & Legislation`}</Wrapper1>
            <DocumentsPageText1 text="156 documents" additionalClassNames="w-[384.328px]" />
          </div>
          <div className="basis-0 bg-white grow h-[166.594px] min-h-px min-w-px relative rounded-[16.4px] shrink-0" data-name="Card">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <div className="absolute bg-[#ec2227] content-stretch flex items-center justify-center left-[25px] rounded-[10px] size-[48px] top-[25px]" data-name="DocumentsPage">
              <Icon />
            </div>
            <DocumentsPageText text="Policies" additionalClassNames="w-[384.344px]" />
            <DocumentsPageText1 text="234 documents" additionalClassNames="w-[384.344px]" />
          </div>
          <div className="basis-0 bg-white grow h-[166.594px] min-h-px min-w-px relative rounded-[16.4px] shrink-0" data-name="Card">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <div className="absolute bg-[#513a40] content-stretch flex items-center justify-center left-[25px] rounded-[10px] size-[48px] top-[25px]" data-name="DocumentsPage">
              <Icon1 />
            </div>
            <Wrapper1 additionalClassNames="w-[384.328px]">{`Procedures & Manuals`}</Wrapper1>
            <DocumentsPageText1 text="189 documents" additionalClassNames="w-[384.328px]" />
          </div>
        </div>
        <div className="absolute content-end flex flex-wrap gap-[16px] items-end left-0 top-[181.81px] w-[1335px]">
          <div className="basis-0 bg-white grow h-[166.594px] min-h-px min-w-px relative rounded-[16.4px] shrink-0" data-name="Card">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <div className="absolute bg-[#a94442] content-stretch flex items-center justify-center left-[25px] rounded-[10px] size-[48px] top-[25px]" data-name="DocumentsPage">
              <Wrapper>
                <path d={svgPaths.p3eeeaa80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p2f14bd80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </Wrapper>
            </div>
            <DocumentsPageText text="Audit Standards" additionalClassNames="w-[384.328px]" />
            <DocumentsPageText2 text="98 documents" />
          </div>
          <div className="basis-0 bg-white grow h-[166.594px] min-h-px min-w-px relative rounded-[16.4px] shrink-0" data-name="Card">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <div className="absolute bg-[#413f30] content-stretch flex items-center justify-center left-[25px] rounded-[10px] size-[48px] top-[25px]" data-name="DocumentsPage">
              <Icon />
            </div>
            <Wrapper1 additionalClassNames="w-[384.344px]">{`Templates & Forms`}</Wrapper1>
            <DocumentsPageText1 text="312 documents" additionalClassNames="w-[384.344px]" />
          </div>
          <div className="basis-0 bg-white grow h-[166.594px] min-h-px min-w-px relative rounded-[16.4px] shrink-0" data-name="Card">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <div className="absolute bg-[#064368] content-stretch flex items-center justify-center left-[25px] rounded-[10px] size-[48px] top-[25px]" data-name="DocumentsPage">
              <Wrapper>
                <path d={svgPaths.p3f3d8e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </Wrapper>
            </div>
            <DocumentsPageText text="Information Security Hub" additionalClassNames="w-[384.328px]" />
            <DocumentsPageText2 text="87 documents" />
          </div>
          <div className="basis-0 bg-white grow h-[166.594px] min-h-px min-w-px relative rounded-[16.4px] shrink-0" data-name="Card">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <div className="absolute bg-[#908e81] content-stretch flex items-center justify-center left-[25px] rounded-[10px] size-[48px] top-[25px]" data-name="DocumentsPage">
              <Icon />
            </div>
            <Wrapper1 additionalClassNames="w-[384.328px]">{`Circulars & Decisions`}</Wrapper1>
            <DocumentsPageText1 text="145 documents" additionalClassNames="w-[384.328px]" />
          </div>
          <div className="basis-0 bg-white grow h-[166.594px] min-h-px min-w-px relative rounded-[16.4px] shrink-0" data-name="Card">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            <div className="absolute bg-[#5f4367] content-stretch flex items-center justify-center left-[25px] rounded-[10px] size-[48px] top-[25px]" data-name="DocumentsPage">
              <Icon1 />
            </div>
            <DocumentsPageText text="User Guides" additionalClassNames="w-[384.344px]" />
            <DocumentsPageText1 text="124 documents" additionalClassNames="w-[384.344px]" />
          </div>
        </div>
      </div>
    </div>
  );
}