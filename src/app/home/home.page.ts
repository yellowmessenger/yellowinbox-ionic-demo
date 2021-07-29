import { Component } from '@angular/core';
import { filter } from 'minimatch';

declare let cordova: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private YMAgentSdk: any;
  private botId: String;
  private subscriptionId: Number;
  private userId: String;
  private apiKey: String;
  private source: String;
  private isInitialized: Boolean = false;
  private isInitializing: Boolean = false;

  constructor() {
    console.log("Came to constructor");
    this.YMAgentSdk = cordova.plugins.YMAgentSdk;
    this.botId = "x1609740331340";
    this.userId = "purushottam.yadav@yellow.ai";
    this.apiKey = "f2b588eafc8d6e6a4d166ff534413b363ddde496d3068fe07ea67d5ee8ad33d7";
    this.subscriptionId = 1;
    this.initializeYmChat(() => {
      console.log("Initializing completed");
    })

  }

  initializeYmChat(callBackFunction) {
    console.log("Initializing ...")

    if (this.isInitializing) {
      alertSuccess("Please wait while initializing ...");
    }
    else if (!this.isInitialized) {
      this.isInitializing = true;
      alertSuccess("Initializing ... please click ok wait");
      cordova.plugins.YMAgentSdk.initialize(
        () => {
          this.isInitializing = false;
          this.isInitialized = true;
          console.log("Setting listener ...");

          cordova.plugins.YMAgentSdk.setLocalReceiver((event) => {
            this.isInitialized = false;
            this.isInitializing = false;
            success(event);
            cordova.plugins.YMAgentSdk.setUpdatedEvent(success, failure, "Changed " + event.title, event.body, event.model, event.eventType);
          }, (errResult) => {
            this.isInitializing = false;
            failure(errResult);
          });

          console.log("initialized YMAgentSdk");
          callBackFunction();
        },
        failure, this.apiKey, this.userId, this.botId);
    }
    else {
      console.log("Already initialized");
      callBackFunction();
    }
  }

  setFireBaseDeviceToken() {
    console.log("Set firebase token called");
    cordova.plugins.YMAgentSdk.setFirebaseDeviceToken("");
  }

  changeAgentStatus(status) {
    console.log("Change bot status called");
    this.initializeYmChat(
      () => {
        cordova.plugins.YMAgentSdk.changeAgentStatus(
          (status) => {
            alertSuccess("Changed Agent status successfully")
            success(status);
          },
          failure,
          status
        )
      }
    );
  }

  getAgentStatus() {
    console.log("Get bot status called");
    this.initializeYmChat(
      () => {
        cordova.plugins.YMAgentSdk.getAgentStatus(
          (status) => {
            success(status);
            alertSuccess(status);
          }, failure
        )
      }
    )
  }

  logout() {
    console.log("Logout called");
    if (this.isInitialized) {
      cordova.plugins.YMAgentSdk.logout(
        () => {
          this.isInitialized = false;
          success({ success: "Logged out successfully" });
          alertSuccess("Logged out successfully")
        },
        failure
      );
    }
    else {
      alertSuccess("You are already logged out");
    }
  }

  handleBackgroundNotification(extraData) {
    console.log("Set Extra data called");
    cordova.plugins.YMAgentSdk.handleBackgroundNotification(extraData);
  }

  startOverviewActivity() {
    console.log("Came here to start overview")
    cordova.plugins.YMAgentSdk.startOverviewScreen(success, failure);
  }

  startMyChatActivity() {
    console.log("Came here to start chat activity")
    cordova.plugins.YMAgentSdk.startMyChatScreen(success, failure);
  }

  openOverViewActivity() {
    this.initializeYmChat(this.startOverviewActivity)
  }

  openMyChatActivity() {
    this.initializeYmChat(this.startMyChatActivity)
  }

  getAllAgents() {
    cordova.plugins.YMAgentSdk.getAgents(showAllAgentsInAlert, failure);
  }
}

const showAllAgentsInAlert = (agentsList) => {
  console.log(agentsList);
  var finalString = "Status             Name\n";
  agentsList.forEach(agentModel => {
    finalString = finalString + `\n${agentModel.status}        ${agentModel.agentProfile.name}`
  });
  alert(finalString);
}

const success = (result) => {
  console.log(JSON.stringify(result));
};

const alertSuccess = (result) => {
  alert(result);
};

const failure = (result) => {
  console.log(JSON.stringify(result));
};
