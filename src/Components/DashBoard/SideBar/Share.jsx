import React from "react";
import { Share2 } from "lucide-react";
import "../../../assets/Styles/DashBoard/Share.scss";

const Share = () => {
  return (
    <div className="share-card">
      <h3>Share with your Friends</h3>
      <p>
        Reference site about Lorem Ipsum, giving information on its origins,
        as well as a random Lipsum generator.
      </p>

      <div className="share-box">
        <div className="share-input">
          <Share2 size={18} className="share-icon" />
          <input
            type="text"
            value="https://www.wiznovy.com/share/ProfileLink"
            readOnly
          />
        </div>
        <button className="share-btn">Share</button>
      </div>
    </div>
  );
};

export default Share;
