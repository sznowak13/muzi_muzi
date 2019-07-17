import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import userphoto from "../../../resources/userphoto.png";

export const AdvBody = props => {
  const rows = props.advertData.map((row, index) => {
    return (
      <Link className="links" to={`advert/${row.advert_id}`}>
        <div className="grid-container" key={index}>
          <div className="item1">
            <p className="advert-title">{row.title}</p>
          </div>
          <div className="item2">
            {row.photo_url == null ? (
              <img src={userphoto} alt="ph" width="180" height="180" />
            ) : (
              <img src={row.photo_url} alt="ph" width="180" height="180" />
            )}
          </div>
          <div className="item3">{row.description}</div>
          <div className="item4">
            <i className="fas fa-map-marker-alt" />
            <span className="advert-label">City:</span>
            <p className="advert-data">{row.city}</p>
          </div>
          <div className="item5">
            <i className="fas fa-music" />
            <span className="advert-label">Genres:</span>
            <p className="advert-data">{row.genre}</p>
          </div>
          <div className="item6">
            <i className="far fa-clock" />
            <span className="advert-label">Posted:</span>
            <p className="advert-data">
              {moment(row.posted_on)
                .startOf("minute")
                .fromNow()}
            </p>
          </div>
        </div>
      </Link>
    );
  });

  return <div>{rows}</div>;
};
