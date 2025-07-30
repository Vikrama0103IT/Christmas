// --- Create and Append the JioGames SDK Script ---
var script = document.createElement('script');
script.src = 'https://jiogames.akamaized.net/gameSDK/jiogames/stable/v2.0/jiogames_sdk.js';
script.async = true;
//script.setAttribute('data-jg-test-environment', 'on');
script.setAttribute('data-jg-packagename', 'COM.7SEAS.CHRISTMASFUN');
// script.setAttribute('data-jioads-banner', 'l9mp2wfq');  // Uncomment when needed
document.head.appendChild(script);
console.log("JioGames SDK script added successfully!");

// --- Polling for SDK Readiness ---
function checkJioGamesSDK() {
    if (window.JioGames) {
        console.log('JioGames SDK is now ready!');
        initializeSDKFunctions();
    } else {
        console.log('Waiting for JioGames SDK to load...');
        setTimeout(checkJioGamesSDK, 100);
    }
}

// --- Initialize SDK ---
function initializeSDKFunctions() {
    console.log("JioGames SDK Initialized.");
    //cacheAds(); // Optional preload
}

// --- Cache Ads ---
function cacheAds() {
    console.log("index : Caching both Interstitial and Rewarded Ads...");
    cacheInterstitialAd();
    setTimeout(function () {
        cacheRewardedAd();
    }, 5000);
}

// --- Banner Event Hook ---
window.onBannerReady = function () {
    console.log('Banner is ready to use! Timestamp: ' + Date.now());
};

// --- Global Ad Functions Accessible from Construct 3 ---

// Post Score
function postScore(score) {
    if (window.JioGames?.postScore) {
        window.JioGames.postScore(score);
        console.log("index : Score posted successfully: " + score);
    } else {
        console.log("index : Failed to post score.");
    }
}

// Cache Interstitial Ad
function cacheInterstitialAd() {
    if (window.JioGames?.cacheAd) {
        window.JioGames.cacheAd(AdType.Interstitial, {
            onAdPrepared: function () {
                console.log("index : Interstitial Ad prepared successfully.");
            },
            onAdFailedToLoad: function (error) {
                console.log("index : Failed to load Interstitial Ad: " + error);
            }
        });
    } else {
        console.log("index : JioGames cacheAd method is not available.");
    }
}

// Show Interstitial Ad
function showInterstitialAd() {
    if (window.JioGames?.showAd) {
        window.JioGames.showAd(AdType.Interstitial, {
            onAdClosed: function () {
                console.log("index : Interstitial Ad closed.");
            },
            onAdFailedToLoad: function (error) {
                console.log("index : Failed to load Interstitial Ad: " + error);
            }
        });
    } else {
        console.log("index : JioGames showAd method is not available.");
    }
}

// Cache Rewarded Ad
function cacheRewardedAd() {
    if (window.JioGames?.cacheAd) {
        window.JioGames.cacheAd(AdType.Rewarded, {
            onAdPrepared: function () {
                console.log("index : Rewarded Ad prepared successfully.");
                c3_callFunction("rvReady");
            },
            onAdFailedToLoad: function (error) {
                console.log("index : Failed to load Rewarded Ad: " + error);
            }
        });
    } else {
        console.log("index : JioGames cacheAd method is not available.");
    }
}


// Show Rewarded Ad
function showRewardedAd() {
    if (window.JioGames?.showAd) {
        window.JioGames.showAd(AdType.Rewarded, {
            // This callback triggers after the ad is closed
            onAdClosed: function (isRewardUser) {
                console.log("index : Rewarded Ad closed.");
                c3_callFunction("rvNotReady"); // Indicate that RV is no longer ready for another show

                if (isRewardUser) {
                    console.log("index : Reward granted to the user.");
                    // Grant the reward here (e.g., add lives, coins, etc.)
                    grantReward();
                }
            },

            // If the ad failed to load, we log the error
            onAdFailedToLoad: function (error) {
                console.log("index : Failed to load Rewarded Ad: " + error);
                // You could also handle a fallback or retry logic here, if necessary.
            }
        });
    } else {
        console.log("index : JioGames showAd method is not available.");
        // Optionally handle case when the ad can't be shown (e.g., notify the user or retry).
    }
}

// Grant Reward Function (called after ad is closed successfully)
function grantReward() {
    // Your logic to reward the player
    // Example: Add lives, coins, points, etc.
    console.log("index : Granting reward to the player.");
    // For example, adding 1 life to the player
    addLife(); // Call your function that grants the reward
}

// Example function to add life (or any other reward)
function addLife() {
    console.log("index : Adding 1 life to the player.");
    // You can increment the player's lives or grant any other reward here
    // E.g., increase the Lives variable by 1:
    runtime.globalVars.Lives += 1;
}


// Load Banner
function loadBanner() {
    if (window.JGBanner?.loadBanner) {
        window.JGBanner.loadBanner()
            .then(function () {
                console.log('Banner loaded successfully.');
                showBanner();
            })
            .catch(function (error) {
                console.log('Failed to load the banner: ' + error);
            });
    } else {
        console.log('JGBanner.loadBanner is not available.');
    }
}

// Show Banner
function showBanner() {
    if (window.JGBanner?.showBanner) {
        window.JGBanner.showBanner();
        console.log("index : Banner displayed.");
    } else {
        console.log("index : Failed to show banner.");
    }
}

// Set Banner Position
function setBannerPosition(position) {
    if (window.JGBanner?.setBannerPosition) {
        if (position === "TOP") {
            window.JGBanner.setBannerPosition(BannerPosition.TOP);
            console.log("index : Banner position set to top.");
        } else if (position === "BOTTOM") {
            window.JGBanner.setBannerPosition(BannerPosition.BOTTOM);
            console.log("index : Banner position set to bottom.");
        }
    } else {
        console.log("index : Failed to set banner position.");
    }
}

// Hide Banner
function hideBanner() {
    if (window.JGBanner?.hideBanner) {
        window.JGBanner.hideBanner();
        console.log("index : Banner hidden.");
    } else {
        console.log("index : Failed to hide banner.");
    }
}

// Get User Profile
function getUserProfile() {
    if (window.JioGames?.playerInfo) {
        const playerInfo = window.JioGames.playerInfo;
        console.log("index : Gamer ID: " + playerInfo.gamer_id);
        console.log("index : Gamer Name: " + playerInfo.gamer_name);
        console.log("index : Gamer Avatar URL: " + playerInfo.gamer_avatar_url);
        console.log("index : Device Type: " + playerInfo.device_type);
        console.log("index : Date of Birth: " + playerInfo.dob);
    } else {
        console.log("index : Failed to retrieve player info.");
    }
}

// --- Start SDK Polling ---
checkJioGamesSDK();


const scriptsInEvents = {

	async Loadingsettings_Event1_Act10(runtime, localVars)
	{

	},

	async Gamesettings_Event65_Act5(runtime, localVars)
	{
		cacheAds()
	},

	async Gamesettings_Event67_Act7(runtime, localVars)
	{
		cacheAds()
	},

	async Gamesettings_Event68_Act3(runtime, localVars)
	{
		showInterstitialAd();
	},

	async Gamesettings_Event99_Act6(runtime, localVars)
	{
		showRewardedAd();
	},

	async Gamesettings_Event100_Act15(runtime, localVars)
	{
		postScore(runtime.globalVars.Score);
		showInterstitialAd();
	},

	async Gamesettings_Event107_Act14(runtime, localVars)
	{
		postScore(runtime.globalVars.Score);
		showInterstitialAd();
	},

	async Gamesettings_Event110_Act14(runtime, localVars)
	{
		postScore(runtime.globalVars.Score);
		showInterstitialAd();
	},

	async Gamesettings_Event115_Act2(runtime, localVars)
	{

	},

	async Gamesettings_Event117_Act2(runtime, localVars)
	{

	},

	async Gamesettings_Event118_Act2(runtime, localVars)
	{

	},

	async Gamesettings_Event120_Act1(runtime, localVars)
	{

	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
