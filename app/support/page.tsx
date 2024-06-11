import FAQ from "@/components/support/FAQ2";
import Search from "@/components/support/Search";
import TabsSection from "@/components/support/TabsSection";


 
import Script from "next/script";

interface MyComponentProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Support({ searchParams }: MyComponentProps) {
  return (
    //OLD Code
    // <main className="container  max-w-[686px] mx-auto ">
    //   <div className="flex items-center">
    //     <GoBackButton />
    //     <SH1Text text="Help & Support" />
    //   </div>
    //   <div className="space-under-category-titles" />
    //   <FAQ />
    //   <br></br>
    //   {/* to do: also add a live agent chat button here as well!  */}
    // </main>

    //My Code
    <main className="container max-w-[686px] mx-auto">
      <Script
        id="live-agent"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(d, src, c) { var t=d.scripts[d.scripts.length - 1],s=d.createElement('script');s.id='la_x2s6df8d';s.defer=true;s.src=src;s.onload=s.onreadystatechange=function(){var rs=this.readyState;if(rs&&(rs!='complete')&&(rs!='loaded')){return;}c(this);};t.parentElement.insertBefore(s,t.nextSibling);})(document, 'https://behindthechair.ladesk.com/scripts/track.js', function(e){LiveAgent.createButton('0bcihlat', e); });`,
        }}
      />

  
      
      <div className="flex flex-col gap-5">
        <div className="flex items-center">
 
        </div>
        <div className="max-w-[22rem]">
          <Search  />
        </div>
      </div>
      {
        searchParams?.search ? (
          <div className="mt-5">
            <FAQ searchParams={searchParams}  />
          </div>
        ) :
          <div className="grid grid-flow-row grid-cols-12 gap-5 mt-3">
            <div className="my-5 col-span-12 lg:col-span-4">
              <TabsSection searchParams={searchParams} className="col-span-12 lg:col-span-4 lg:sticky top-20 " />
            </div>
            <div className="mb-5 lg:my-5 col-span-12 lg:col-span-8">
              <FAQ searchParams={searchParams}  />
            </div>
          </div>
      }
    </main>
  );
}
