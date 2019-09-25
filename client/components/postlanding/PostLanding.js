import React from "react";
import styles from "./PostLanding.scss";
import cx from "classnames";

export default class PostLanding extends React.Component {
    render() {
        return (
            <div className={styles.timelineWrapper}>
                <div className={styles.timelineItem}>
                    <div className={styles.animatedBackground}>
                        <div className={cx(styles.backgroundMasker, styles.headerTop)}></div>
                        <div className={cx(styles.backgroundMasker, styles.headerLeft)}></div>
                        <div className={cx(styles.backgroundMasker, styles.headerRight)}></div>
                        <div className={cx(styles.backgroundMasker, styles.headerBottom)}></div>
                        <div className={cx(styles.backgroundMasker, styles.subheaderLeft)}></div>
                        <div className={cx(styles.backgroundMasker, styles.subheaderRight)}></div>
                        <div className={cx(styles.backgroundMasker, styles.subheaderBottom)}></div>
                        <div className={cx(styles.backgroundMasker, styles.contentTop)}></div>
                        <div className={cx(styles.backgroundMasker, styles.contentFirstEnd)}></div>
                        <div className={cx(styles.backgroundMasker, styles.contentSecondLine)}></div>
                        <div className={cx(styles.backgroundMasker, styles.contentSecondEnd)}></div>
                        <div className={cx(styles.backgroundMasker, styles.contentThirdLine)}></div>
                        <div className={cx(styles.backgroundMasker, styles.contentThirdEnd)}></div>
                    </div>
                </div>
            </div>
        );
    }
}
