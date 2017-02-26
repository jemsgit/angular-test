var fileManager = require('./fileManager'),
	scheduler;

var settingFile = './settings.json',
	publicsFile = './publicsSettings.json',
	contentStealerFile = './contentStealer.json',
	channelsFile = './tchannels.json'
	settings = fileManager.readDataFromJson(settingFile),
	publicsList = fileManager.readDataFromJson(publicsFile),
	stealerSettings = fileManager.readDataFromJson(contentStealerFile),
	channelsList = fileManager.readDataFromJson(channelsFile),
	scheduler;
	
	if(settings && publicsList){
		scheduler = require('./scheduler')(settings);
		scheduler.setPostTimer(publicsList);
	} else {
		console.log('error file reading -> exit')
	}
	
	if(settings && channelsList){
		if(!scheduler){
			scheduler = require('./scheduler')(settings);
		}
		scheduler.setTelegramPostTimer(channelsList)
		
	}
	
	if(stealerSettings){
		for(prop in stealerSettings){
			scheduler.setContentStealerTimer(stealerSettings[prop]);
		}
	}
	
	if(scheduler){
		scheduler.listJobsCount();
	}
	


