import { getCategoryPageTips } from "../BTCClassPass/helper";
import TipReel from "./TipReel"

const page = async () => {

    const tipsCategoryDataPromise = getCategoryPageTips("433263");
    const [tipsCategoryData] = await Promise.all([tipsCategoryDataPromise]);
    const tipVideos = tipsCategoryData ? tipsCategoryData?.newTips || [] : [];
    console.log(tipVideos[0].tipmetadata)
    // https://player.vimeo.com/video/891944381

    return (
        <div>
                <TipReel
                    tip={tipVideos}
                // tipTitle={tip.title}
                // tipCourse={tip.tipmetadata.tipCourse.title}
                // tipEduator={tip.tipmetadata.tipEducator}
                />
        </div>
    )
}

export default page