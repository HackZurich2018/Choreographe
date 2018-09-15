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
    </Dialogs>
    <Resources>
        <File name="index" src="html/index.html" />
        <File name="main" src="html/css/main.css" />
        <File name="jquery.min" src="html/js/jquery.min.js" />
        <File name="main" src="html/js/main.js" />
        <File name="robotutils" src="html/js/robotutils.js" />
        <File name="Enu_Ono_Laugh_Happy_2_pitch_115" src="sounds/Enu_Ono_Laugh_Happy_2_pitch_115.ogg" />
        <File name="jquery.color.plus-names-2.1.2.min" src="html/js/jquery.color.plus-names-2.1.2.min.js" />
        <File name="jquery.easing.1.3" src="html/js/jquery.easing.1.3.js" />
        <File name="golf" src="bh_showhiddentalents/golf.ogg" />
        <File name="golf" src="storyboard/golf.ogg" />
        <File name="rock" src="html/rock.m4a" />
        <File name="rock" src="html/rock.mp3" />
    </Resources>
    <Topics>
        <Topic name="dlg_welcome_enu" src="dlg_welcome/dlg_welcome_enu.top" topicName="dlg_welcome" language="en_US" />
        <Topic name="yes-or-no_enu" src="yes-or-no/yes-or-no_enu.top" topicName="yes-or-no" language="en_US" />
        <Topic name="dlg_get_interests_enu" src="dlg_get_interests/dlg_get_interests_enu.top" topicName="dlg_get_interests" language="en_US" />
    </Topics>
    <IgnoredPaths />
</Package>
