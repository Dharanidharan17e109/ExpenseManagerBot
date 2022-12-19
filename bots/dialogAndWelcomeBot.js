// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { CardFactory, ActionTypes, MessageFactory } = require('botbuilder-core');
const { DialogBot } = require('./dialogBot');
const {sendSuggestActionCard} = require("../resources/sendSuggestedAction");
const {loginCard}=require('../resources/loginCard');

class DialogAndWelcomeBot extends DialogBot {
    constructor() {
        super();
        
        
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity("Welcom to expense manager!");
                    await loginCard(context);
                    //await sendSuggestActionCard(context);
                  //  const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
                   // await context.sendActivity({ attachments: [welcomeCard] });
                   // await dialog.run(context, conversationState.createProperty('DialogState'));
                }
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.DialogAndWelcomeBot = DialogAndWelcomeBot;
