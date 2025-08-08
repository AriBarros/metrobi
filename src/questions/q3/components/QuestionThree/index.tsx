import React from "react";
import { styles } from "./styles";

export default function QuestionThree() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.boxHeader}>Header</div>

        <div style={styles.row}>
          <div style={{ ...styles.col, flex: 1 }}>
            <div style={{ ...styles.box, ...styles.hero }}>Hero</div>
            <div style={{ ...styles.box, ...styles.sidebar }}>Sidebar</div>
          </div>

          <div style={{ ...styles.col, flex: 2 }}>
            <div style={{ ...styles.box, ...styles.main }}>Main Content</div>
            <div style={{ ...styles.box, ...styles.extra }}>Extra Content</div>
          </div>
        </div>

        <div style={styles.row}>
          <div style={{ ...styles.box, ...styles.relatedImages, flex: 2 }}>
            Related Images
          </div>
          <div style={{ ...styles.box, ...styles.relatedPosts, flex: 1 }}>
            Related Posts
          </div>
        </div>

        <div style={{ ...styles.box, ...styles.footer }}>Footer</div>
      </div>
    </div>
  );
}
