import React from "react";
import GSes from "../assets/coc-gses.webp";

const Image = (props) => {
  const styles = {};

  return (
    <div class="image-cont">
      <div class="image-card">
        <img
          // src={GSes}
          src="https://picsum.photos/200"
          class="image"
          height="100%"
          width="100%"
          styles={styles.image}
        />
      </div>
      <div class="image-name">Saif Kazi</div>
    </div>
  );
};
export default Image;
