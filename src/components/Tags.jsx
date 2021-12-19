import "./Tags.css";
import { useSelector } from "react-redux";

export default function Tags(props) {
  const { tags, handleTagClick } = props;
  const queryTags = useSelector((state) => state.queryTags);

  if (props.tags === null) return <></>;

  const categories = [];
  const sortedTags = [];
  tags.forEach((tag) => {
    if (!categories.includes(tag.type)) categories.push(tag.type);
  });

  // remove internal busines tags
  const btIndex = categories.findIndex((cat) => cat === "business_tags");
  categories.splice(btIndex, 1);
  const fpIndex = categories.findIndex((cat) => cat === "feature_page");
  categories.splice(fpIndex, 1);

  categories.forEach((cat, catIndex) => {
    const tempCaterogyGroup = [];
    tags.forEach((tag, tagIndex) => {
      if (cat === tag.type) tempCaterogyGroup.push(tag);
    });
    sortedTags.push(tempCaterogyGroup);
  });

  return (
    <div className="tags">
      {sortedTags.map((group) => {
        const assabledTags = group.map((tag) => (
          <>
            <label key={"l" + tag.id}>
              <input
                className="tag-box"
                type="checkbox"
                name={tag.name}
                id={tag.id}
                key={tag.id}
                value={tag.name}
                checked={queryTags.includes(tag.name)}
                onChange={() => props.handleTagClick(tag.name)}
              />
              <span>{tag.display_name}</span>
            </label>
          </>
        ));
        return (
          <>
            <h2>{group[0].type}</h2>
            <div>{assabledTags}</div>
          </>
        );
      })}
    </div>
  );
}
