import {    EmailShareButton,WhatsappShareButton,LinkedinShareButton,TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons"; 

import "./socialMediaStyling.css";

const ShareButtons = ({ initialContent = "" }) => {
    const articleText = initialContent;
    // TODO change this to our domain URL as soon as we have one
    const url = "http://localhost:5173";

    return (
        <div>
            <div className="icon-wrapper" title="Share via Email">
                <EmailShareButton
                    url={url}
                    subject="Check out this Newspaper I just generated with NewsTailor!"
                    body={`${articleText}\n\nCheck it out here: ${url}`}
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
                    title="Check out NewsTailor!"
                    summary="I just generated a newspaper with NewsTailor!"
                    source="NewsTailor"
                >
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </LinkedinShareButton>
            </div>

            <div className="icon-wrapper" title="Share via X">
                <TwitterShareButton
                    url={url}
                    title="I just generated a newspaper with NewsTailor!"
                    via="NewsTailor"
                    hashtags={["news", "ai", "newspaper"]}
                >
                    <FontAwesomeIcon icon={faXTwitter} size="lg" />
                </TwitterShareButton>
            </div>
        </div>
    );
};

export default ShareButtons;
