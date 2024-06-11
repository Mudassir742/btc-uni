import SH1Text from "./text/SH1Text";

const CourseCategorySection = ({ title, cards }: { title: string, cards: JSX.Element[] }) => (
    <div>
      <div className="slider-container">
        <SH1Text
          text={title}
          className="!text-themeColor"
        />
        <div className="space-under-category-titles" />
      </div>
      <div className="flex overflow-x-auto space-x-4 slider-container">
        {cards}
      </div>
      <div className="space-between-categories" />
    </div>
  );

  export default CourseCategorySection;