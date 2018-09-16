<?xml version="1.0" encoding="UTF-8" ?>
<Package name="template" format_version="4">
    <Manifest src="manifest.xml" />
    <BehaviorDescriptions>
        <BehaviorDescription name="behavior" src="zzz_bak_start_template" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="animations/little_laugh" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="bh_greeting" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="storyboard" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="bh_getskills" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="bh_ending" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="bh_getinterests" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="bh_showhiddentalents" xar="behavior.xar" />
    </BehaviorDescriptions>
    <Dialogs>
        <Dialog name="dlg_welcome" src="dlg_welcome/dlg_welcome.dlg" />
        <Dialog name="yes-or-no" src="yes-or-no/yes-or-no.dlg" />
        <Dialog name="dlg_get_interests" src="dlg_get_interests/dlg_get_interests.dlg" />
        <Dialog name="dlg_showhiddentalents" src="dlg_showhiddentalents/dlg_showhiddentalents.dlg" />
        <Dialog name="dlg_ending" src="dlg_ending/dlg_ending.dlg" />
    </Dialogs>
    <Resources>
        <File name="index" src="html/index.html" />
        <File name="main" src="html/css/main.css" />
        <File name="jquery.min" src="html/js/jquery.min.js" />
        <File name="main" src="html/js/main.js" />
        <File name="Enu_Ono_Laugh_Happy_2_pitch_115" src="sounds/Enu_Ono_Laugh_Happy_2_pitch_115.ogg" />
        <File name="jquery.color.plus-names-2.1.2.min" src="html/js/jquery.color.plus-names-2.1.2.min.js" />
        <File name="jquery.easing.1.3" src="html/js/jquery.easing.1.3.js" />
        <File name="golf" src="bh_showhiddentalents/golf.ogg" />
        <File name="golf" src="storyboard/golf.ogg" />
        <File name="rock" src="html/rock.m4a" />
        <File name="rock" src="html/rock.mp3" />
        <File name="video" src="html/video.mp4" />
        <File name="quiz" src="html/quiz.gif" />
        <File name="interests" src="html/interests.html" />
        <File name="hammer.min" src="html/js/hammer.min.js" />
        <File name="interests" src="html/js/interests.js" />
        <File name="system-production" src="html/js/system-production.js" />
        <File name="system" src="html/js/system.js" />
        <File name="1" src="html/images/1.jpg" />
        <File name="2" src="html/images/2.jpg" />
        <File name="3" src="html/images/3.jpg" />
        <File name="4" src="html/images/4.jpg" />
        <File name="5" src="html/images/5.jpg" />
        <File name="6" src="html/images/6.jpg" />
        <File name="7" src="html/images/7.jpg" />
        <File name="8" src="html/images/8.jpg" />
    </Resources>
    <Topics>
        <Topic name="dlg_welcome_enu" src="dlg_welcome/dlg_welcome_enu.top" topicName="dlg_welcome" language="en_US" />
        <Topic name="yes-or-no_enu" src="yes-or-no/yes-or-no_enu.top" topicName="yes-or-no" language="en_US" />
        <Topic name="dlg_get_interests_enu" src="dlg_get_interests/dlg_get_interests_enu.top" topicName="dlg_get_interests" language="en_US" />
        <Topic name="dlg_showhiddentalents_enu" src="dlg_showhiddentalents/dlg_showhiddentalents_enu.top" topicName="dlg_showhiddentalents" language="en_US" />
        <Topic name="dlg_ending_enu" src="dlg_ending/dlg_ending_enu.top" topicName="dlg_ending" language="en_US" />
    </Topics>
    <IgnoredPaths />
    <Translations auto-fill="en_US">
        <Translation name="translation_en_US" src="translations/translation_en_US.ts" language="en_US" />
    </Translations>
</Package>
