import {    EmailShareButton,WhatsappShareButton,LinkedinShareButton,TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons"; 

import "./socialMediaStyling.css";

const ConfigurationShareButtons = ({ initialContent = "" }) => {
    const articleText = initialContent;
    const url = "https://newstailorreactapplication.fly.dev/";

    return (
        <div>
            <div className="icon-wrapper" title="Share via Email">
                <EmailShareButton
                    url={url}
                    subject="Check out my configuration presets with NewsTailor!"
                    body={`${articleText}\n\nCheck it out here:`}
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
                    summary="I just created a new configuration to generate a newspaper with NewsTailor!"
                    source="NewsTailor"
                >
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </LinkedinShareButton>
            </div>

            <div className="icon-wrapper" title="Share via X">
                <TwitterShareButton
                    url={url}
                    title="I just created a new configuration to generate a newspaper with NewsTailor!"
                    via="NewsTailor"
                    hashtags={["news", "ai", "newspaper"]}
                >
                    <FontAwesomeIcon icon={faXTwitter} size="lg" />
                </TwitterShareButton>
            </div>
        </div>
    );
};

export default ConfigurationShareButtons;
