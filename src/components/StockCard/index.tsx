import React from "react";
import "./index.scss";
import { Stock } from "../../interfaces";
import placeholderImage from "../../assets/placeholder-image.svg";

const StockCard: React.FC<Stock> = ({
  title,
  url,
  image,
  date,
  body,
  source,
  author,
}) => {
  const formattedDate =
    date &&
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="maiContent">
      <div className="stockDetailWrapper">
        <div className="contentWrapper">
          <div className="imageWrapper">
            <img
              src={
                image
                  ? `https://dummy-rest-api.specbee.site/${image}`
                  : placeholderImage
              }
              alt={image ? "stock image" : "placeholder image"}
            />
          </div>
          <div className="titleWapper">
            <div className="detailsWrapper">
              <span className="dateInfo">{formattedDate}</span>
              <span className="category">{source}</span>
            </div>
            <p>{title}</p>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: body }} />
        <span className="author">{author}</span>
      </div>
    </div>
  );
};

export default StockCard;
