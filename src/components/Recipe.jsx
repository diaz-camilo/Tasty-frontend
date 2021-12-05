import "./Recipe.css";
import { useState } from "react";

export default function Recipe(props) {
  const {
    thumbnail_url,
    thumbnail_alt_text,
    credits,
    description,
    name,
    tags,
    instructions,
  } = props.recipe;

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = (ev) => setIsHover(true);
  const handleMouseLeve = (ev) => setIsHover(false);

  return (
    <div
      className="recipe"
      style={{ backgroundImage: `url(${thumbnail_url})` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeve}
    >
      <div>
        <h2>{name}</h2>
        <h4>by: {credits[0].name}</h4>
      </div>

      {isHover && (
        <div className="tags">
          {tags.map((tag) => (
            <span className="tag" key={tag.id}>
              {tag.display_name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
