import {    EmailShareButton,WhatsappShareButton,LinkedinShareButton,TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"; 

import "./socialMediaStyling.css";

const ShareButtons = ({ initialContent = "" }) => {
    const articleText = initialContent;
    const url = "http://google.com";

    return (
        <div>
            <div className="icon-wrapper" title="Share via Email">
                <EmailShareButton
                    url={url}
                    subject="Check out this article from NewsTailor!"
                    body={`Hi, I found this article interesting: ${articleText}\n\nCheck it out here: ${url}`}
                >
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                </EmailShareButton>
            </div>

            <div className="icon-wrapper" title="Share via WhatsApp">
                <WhatsappShareButton url={url} title={articleText}>
                    <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                </WhatsappShareButton>
            </div>

            <div className="icon-wrapper" title="Share via LinkedIn">
                <LinkedinShareButton
                    url={url}
                    title="Check this out!"
                    summary="Great article!"
                    source="NewsTailor"
                    
                >
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </LinkedinShareButton>
            </div>

            <div className="icon-wrapper" title="Share via Twitter">
                <TwitterShareButton
                    url={url}
                    title="Check out this article!"
                    via="NewsTailor"
                    hashtags={["news", "trending"]}
                >
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                </TwitterShareButton>
            </div>
        </div>
    );
};

export default ShareButtons;
