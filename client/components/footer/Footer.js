import React from "react";

export default class Footer extends React.Component {
    render() {
        return (
            <footer id="footer" className="haslayout">
                <div className="three-columns">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 box-width">
                                <div className="box">
                                    <h5>LHP Confessions</h5>
                                    <div className="description">
                                        <p>Nơi cảm xúc thực sự sống lại
                                            Lưu ý: LHP Confessions không phải là đại diện chính thức của BGH trường THPT Chuyên Lê Hồng Phong TPHCM.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <div className="container">
                        <p>Admin Team 2017</p>
                    </div>
                </div>
            </footer>
        );
    }
}
